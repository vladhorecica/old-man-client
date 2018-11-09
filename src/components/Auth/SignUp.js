import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';

import { createUserAction } from '../../actions/userAction';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CreateIcon from '@material-ui/icons/Create';
import InputField from "../Util/From/InputField";


const styles = () => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: 'url(https://source.unsplash.com/random/1600x900)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    card: {
        minWidth: 300,
        marginTop: '6em',
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {},
    hint: {
        marginTop: '1em',
        display: 'flex',
        justifyContent: 'center',
        color: '#273665',
    },
    form: {
        padding: '0 1em 1em 1em',
    },
    input: {
        marginTop: '1em',
    },
    actions: {
        padding: '0 1em 1em 1em',
    },
});

const mapStateToProps = state => ({
    auth: state.userReducer.auth
});

const mapDispatchToProps = dispatch => ({
    createUser: (data, callbackObj) => { dispatch(createUserAction(data, callbackObj)) }
});

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            success: false,
            data: {username: '',
                firstName: '',
                lastName: '',
                password: '',
                confirmPassword: ''
            },
            error: this.initError(),
        };
    }

    initError = () => {
        return {
            username: false,
            firstName: false,
            lastName: false,
            password: false,
            confirmPassword: false
        };
    };

    onSubmit = (e) => {
        e.preventDefault();

        if (this.validateData()) {
            const { confirmPassword, ...userData} = this.state.data;
            this.props.createUser(userData, {
                onSuccess: () => this.setState({success: true})
            });
        }
    };

    validateData = () => {
        // I know... it's just a quick validation.
        let { data } = this.state;
        let error = this.initError();

        for (let prop in data) {
            if (data.hasOwnProperty(prop) && error.hasOwnProperty(prop)) {
                error[prop] = !data[prop];
            }
        }
        error.password = error.confirmPassword = (data.password !== data.confirmPassword);

        if (JSON.stringify(error) !== JSON.stringify(this.initError())) {
            this.setState({data, error});
            return false;
        }

        return true;
    };

    handleChange = (value, name) => {
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                [name]: value
            }
        });
    };

    render() {
        const { auth, classes } = this.props;
        const { error, success } = this.state;

        if (success) {
            return (
                <Redirect to={{pathname: "/login", state: { from: this.props.location }}} />
            );
        }

        return (
            <div className={classes.main}>
                <Card className={classes.card}>
                    <div className={classes.avatar}>
                        <Avatar className={classes.icon}>
                            <CreateIcon />
                        </Avatar>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <div className={classes.form}>
                            <InputField
                                name="username"
                                label="Username"
                                onChange={this.handleChange}
                                error={error.username}
                                classes={classes.input}
                                fullWidth
                            />
                            <InputField
                                name="firstName"
                                label="First Name"
                                onChange={this.handleChange}
                                error={error.firstName}
                                classes={classes.input}
                                fullWidth
                            />
                            <InputField
                                name="lastName"
                                label="Last Name"
                                onChange={this.handleChange}
                                error={error.lastName}
                                classes={classes.input}
                                fullWidth
                            />
                            <InputField
                                name="password"
                                label="Password"
                                type="password"
                                onChange={this.handleChange}
                                error={error.password}
                                classes={classes.input}
                                fullWidth
                            />
                            <InputField
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                onChange={this.handleChange}
                                error={error.confirmPassword}
                                classes={classes.input}
                                fullWidth
                            />
                        </div>

                        <CardActions className={classes.actions}>
                            <Button
                                variant="raised"
                                type="submit"
                                color="primary"
                                className={classes.button}
                                fullWidth
                            >
                                SignUp
                            </Button>
                        </CardActions>
                    </form>
                </Card>
            </div>
        );
    }
}

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
);

export default withRouter(enhance(SignUp));
