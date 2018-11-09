import React from "react";
import {
    Route,
    Switch,
    withRouter
} from 'react-router-dom';
import { connect } from "react-redux";

import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Dashboard from './components/Cms/Dashboard';
import PrivateRoute from './components/Util/PrivateRoute';
import Header from "./components/Cms/Header";


const mapStateToProps = state => ({
    auth: state.userReducer.auth
});

const App = (props) => {
    return (
        <div className="container">
            <Header isVisible={!!props.auth.me} />
            <Switch>
                <Route exact={true} path="/login" component={Login} />
                <Route exact={true} path="/signup" component={SignUp} />
                <PrivateRoute path="/" component={Dashboard} auth={props.auth} />
            </Switch>
        </div>
    );
};

export default withRouter(connect(mapStateToProps, null)(App));
