# main.py

from fastapi import FastAPI, WebSocket, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import openai

import json
import os
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import spacy
from transformers import pipeline

# FastAPI app
app = FastAPI(title="AI Career Guidance Platform")

# Database setup
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./career_guidance.db")
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database models
class CareerPath(Base):
    __tablename__ = "career_paths"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    required_skills = Column(String)  # JSON string of skills
    avg_salary = Column(Float)
    job_growth_rate = Column(Float)
    learning_path = Column(String)  # JSON string of learning resources
    opportunities = relationship("JobOpportunity", back_populates="career_path")

class JobOpportunity(Base):
    __tablename__ = "job_opportunities"
    id = Column(Integer, primary_key=True, index=True)
    career_path_id = Column(Integer, ForeignKey("career_paths.id"))
    company = Column(String)
    title = Column(String)
    description = Column(String)
    salary_range = Column(String)
    location = Column(String)
    remote = Column(Integer)  # 0=no, 1=yes, 2=hybrid
    posted_date = Column(DateTime, default=datetime.utcnow)
    
    career_path = relationship("CareerPath", back_populates="opportunities")

class UserProfile(Base):
    __tablename__ = "user_profiles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    skills = Column(String)  # JSON string of skills
    interests = Column(String)  # JSON string of interests
    experience = Column(String)  # JSON string of experience
    education = Column(String)  # JSON string of education
    preferred_locations = Column(String)  # JSON string of locations

# Create the database tables
Base.metadata.create_all(bind=engine)

# Function to get career recommendations
def get_career_recommendation(user_input):
    prompt = f"You are an AI-powered career guidance chatbot. A user asks: '{user_input}'. Provide a detailed response with career recommendations, learning roadmaps, required skills, and market trends for roles like Software Development, Data Analytics, Data Science, ML, and DevOps."

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful career guidance assistant."},
            {"role": "user", "content": prompt}
        ]
    )

    return response['choices'][0]['message']['content'].strip()

# Endpoint for career recommendations
@app.post("/career_recommendation/")
async def career_recommendation(user_input: str):
    return get_career_recommendation(user_input)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Load NLP models
nlp = spacy.load("en_core_web_lg")
sentiment_analyzer = pipeline("sentiment-analysis")

# Pydantic models for API
class CareerPathCreate(BaseModel):
    name: str
    description: str
    required_skills: List[str]
    avg_salary: float
    job_growth_rate: float
    learning_path: dict

class CareerPathResponse(BaseModel):
    id: int
    name: str
    description: str
    required_skills: List[str]
    avg_salary: float
    job_growth_rate: float
    learning_path: dict

# Career path endpoints
@app.post("/career_paths/", response_model=CareerPathResponse)
def create_career_path(career_path: CareerPathCreate, db: Session = Depends(get_db)):
    db_career_path = CareerPath(
        name=career_path.name,
        description=career_path.description,
        required_skills=json.dumps(career_path.required_skills),
        avg_salary=career_path.avg_salary,
        job_growth_rate=career_path.job_growth_rate,
        learning_path=json.dumps(career_path.learning_path)
    )
    db.add(db_career_path)
    db.commit()
    db.refresh(db_career_path)
    
    return CareerPathResponse(
        id=db_career_path.id,
        name=db_career_path.name,
        description=db_career_path.description,
        required_skills=json.loads(db_career_path.required_skills),
        avg_salary=db_career_path.avg_salary,
        job_growth_rate=db_career_path.job_growth_rate,
        learning_path=json.loads(db_career_path.learning_path)
    )

# React frontend (simplified)
frontend_code = """
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <h1>AI Career Guidance Platform</h1>
        <Routes>
          <Route path="/" element={<h2>Welcome to the Career Guidance Platform</h2>} />
          <Route path="/careers" element={<h2>Explore Careers</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
"""

# WebSocket for real-time video consultation
@app.websocket("/ws/consultation/{user_id}")
async def consultation_websocket(websocket: WebSocket, user_id: int):
    await websocket.accept()
    # WebSocket logic here...

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
