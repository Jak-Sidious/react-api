// Using links to create url parameters
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const ParamsExample = () => (
    <Router>
        <div>
            <h2>Accounts</h2>
            <ul>
                <li>
                    <Link to="/netflix">Netflix</Link>
                </li>
                <li>
                    <Link to="/zillow-group">ZillowGroup</Link>
                </li>
                <li>
                    <Link to="/yahoo">Yahoo</Link>
                </li>
                <li>
                    <Link to="/modus-create">Modux Create</Link>
                </li>
            </ul>

            <Route path="/:id" component={Child} />

            {/*
            It's possible to use regular expressions to control what param values should be matched.
            * "/order/asc"  - matched
            * "/order/desc" - matched
            * "/order/foo"  - not matched
            */}
            <Route 
                path="/order/:direction(asc|desc)"
                component={ComponentWithRegex}
            />
        </div>
    </Router>
);

const Child = ({ match }) => (
    <div>
        <h3>ID: {match.params.id}</h3>
    </div>
);

const ComponentWithRegex = ({ match }) => (
    <div>
        <h3> Only asc/dexc are allowed: {match.params.direction}</h3>
    </div>
);

export default ParamsExample;