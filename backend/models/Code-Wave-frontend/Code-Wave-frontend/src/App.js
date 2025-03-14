import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
