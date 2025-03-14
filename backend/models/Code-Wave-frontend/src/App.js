import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route path="/" exact component={Dashboard} />
                    {/* Additional routes can be added here */}
                </Switch>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
