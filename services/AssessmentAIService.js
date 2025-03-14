const axios = require('axios');
const { get_career_recommendation } = require('../path/to/openai'); // Adjust the path as necessary

/**
 * Service for handling AI-related functionality
 */
const AssessmentAIService = {
  /**
   * Process assessment answers and generate trait scores
   * @param {Object} assessment - The assessment object
   * @param {Array} answers - User's answers
   * @returns {Map} Map of trait scores
   */
  processAssessmentResults: (assessment, answers) => {
    const results = new Map();
    
    switch (assessment.type) {
      case 'personality':
        results.set('analytical', calculateTraitScore(answers, 'analytical'));
        results.set('creative', calculateTraitScore(answers, 'creative'));
        results.set('leadership', calculateTraitScore(answers, 'leadership'));
        results.set('interpersonal', calculateTraitScore(answers, 'interpersonal'));
        break;
        
      case 'skills':
        results.set('technical', calculateTraitScore(answers, 'technical'));
        results.set('communication', calculateTraitScore(answers, 'communication'));
        results.set('problemSolving', calculateTraitScore(answers, 'problemSolving'));
        results.set('organization', calculateTraitScore(answers, 'organization'));
        break;
        
      case 'interests':
        results.set('science', calculateTraitScore(answers, 'science'));
        results.set('art', calculateTraitScore(answers, 'art'));
        results.set('business', calculateTraitScore(answers, 'business'));
        results.set('social', calculateTraitScore(answers, 'social'));
        break;
        
      default:
        results.set('general', 75);
    }
    
    return results;
  },
  
  /**
   * Find careers that match assessment results
   * @param {Map} results - Assessment results
   * @returns {Promise<Array>} Array of matching careers with match percentages
   */
  findMatchingCareers: async (results) => {
    try {
      const Career = require('../../models/CareerModel');
      const allCareers = await Career.find();
      
      const matches = allCareers.map(career => {
        let matchScore = 0;
        let totalFactors = 0;
        
        career.requiredSkills.forEach(skill => {
          const relatedTrait = mapSkillToTrait(skill.name);
          
          if (results.has(relatedTrait)) {
            const traitScore = results.get(relatedTrait);
            const weight = getSkillWeight(skill.level);
            
            matchScore += traitScore * weight;
            totalFactors += weight;
          }
        });
        
        const matchPercentage = totalFactors > 0
          ? Math.min(Math.round((matchScore / totalFactors) * 10) / 10, 99.9)
          : 70;
        
        return {
          career: career._id,
          matchPercentage
        };
      });
      
      matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
      return matches.slice(0, 5);
    } catch (error) {
      console.error('Error finding matching careers:', error);
      throw error;
    }
  },
  
  /**
   * Generate AI response for consultations and enhance chatbot interaction
   * @param {string} userMessage - The user's message
   * @param {Object} consultation - The consultation history
   * @returns {Promise<string>} AI response
   */
  generateConsultationResponse: async (userMessage, consultation) => {
    try {
      console.log('Consultation messages:', consultation.messages); // Log consultation messages
      const context = consultation.messages; // Store consultation messages

      // Call the OpenAI API to get a career recommendation
      const recommendation = await get_career_recommendation(userMessage);
      return recommendation; // Return the response from OpenAI

    } catch (error) {
      console.error('Error generating AI response:', error);
      return "I apologize, but I'm having trouble processing your request right now. Could you please try again?";
    }
  }
};

// Helper functions
function calculateTraitScore(answers, trait) {
  return Math.floor(Math.random() * 35) + 60;
}

function mapSkillToTrait(skillName) {
  const skillMap = {
    'programming': 'technical',
    'data analysis': 'analytical',
    'design': 'creative',
    'writing': 'communication',
    'leadership': 'leadership',
    'teamwork': 'interpersonal',
    'problem solving': 'problemSolving',
    'project management': 'organization'
  };
  
  return skillMap[skillName.toLowerCase()] || 'general';
}

function getSkillWeight(level) {
  switch (level) {
    case 'advanced': return 3;
    case 'intermediate': return 2;
    case 'beginner': return 1;
    default: return 1;
  }
}

module.exports = AssessmentAIService;
