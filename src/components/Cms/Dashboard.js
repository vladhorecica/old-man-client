import React, { Component } from "react";
import {connect} from "react-redux";

import UserTable from "../Users/UserTable";

const mapStateToProps = state => ({
    auth: state.userReducer.auth
});

class Dashboard extends Component{
    render(){
        return(
            <div className="App">
                <h4>Dashboard Page</h4>
                <UserTable/>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(Dashboard);
