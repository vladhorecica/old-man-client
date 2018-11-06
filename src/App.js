import React, { Component } from "react";
import { connect } from 'react-redux';

import UserTable from './components/Users/UserTable';

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({

});

class App extends Component{
    render(){
        return(
            <div className="App">
                <h4>Welcome</h4>
                <UserTable/>
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
