import React from "react";
import { withRouter, Route, Redirect } from "react-router-dom";


function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => (rest.auth && rest.auth.me) ?
                <Component {...props} /> :
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            }
        />
    );
}

export default withRouter(PrivateRoute);
