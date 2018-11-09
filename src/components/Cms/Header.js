import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { logoutAction } from "../../actions/userAction";

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

const mapStateToProps = state => ({
    auth: state.userReducer.auth
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => { dispatch(logoutAction()) }
});

class Header extends Component {
    handleLogout = () => {
        this.props.logoutUser();
    };

    render() {
        const { isVisible, classes, auth } = this.props;

        if (!isVisible) {
            return null;
        }

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Oldman
                        </Typography>
                        <AccountCircle />
                        <Typography color="inherit">
                            {`${auth.me.firstName} ${auth.me.lastName} (${auth.me.username})`}
                        </Typography>
                        <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    isVisible: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));
