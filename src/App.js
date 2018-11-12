import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home';

class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                </div>
            </Router>
        );
    }
    
}

export default App;
