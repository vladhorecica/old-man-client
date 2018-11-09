import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';

import { authAction } from '../../actions/userAction';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';


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
    loginUser: (username, password, callbackObj) => { dispatch(authAction(username, password, callbackObj)) }
});

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: false,
        };
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { username, password } = this.state;

        this.props.loginUser(username, password, {
            onSuccess: () => this.setState({ error: false }),
            onFailure: () => this.setState({ error: true })
        });
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { auth, classes } = this.props;
        const { error } = this.state;

        if (auth.me) {
            return (
                <Redirect to={{pathname: "/", state: { from: this.props.location }}} />
            );
        }

        return (
            <div className={classes.main}>
                <Card className={classes.card}>
                    <div className={classes.avatar}>
                        <Avatar className={classes.icon}>
                            <LockIcon />
                        </Avatar>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <div className={classes.hint}>{error ? "Invalid username or password." : ''}</div>
                        <div className={classes.form}>
                            <div className={classes.input}>
                                <TextField
                                    name="username"
                                    error={error}
                                    onChange={this.handleChange}
                                    label="Username"
                                    fullWidth
                                />
                            </div>
                            <div className={classes.input}>
                                <TextField
                                    name="password"
                                    type="password"
                                    error={error}
                                    onChange={this.handleChange}
                                    label="Password"
                                    fullWidth
                                />
                            </div>
                        </div>

                        <CardActions className={classes.actions}>
                            <Button
                                variant="raised"
                                type="submit"
                                color="primary"
                                className={classes.button}
                                fullWidth
                            >
                                Login
                            </Button>
                        </CardActions>
                    </form>
                    <CardActions className={classes.actions}>
                        <Button
                            href="/signup"
                            color="primary"
                            fullWidth
                        >
                            Create an account
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
);

export default withRouter(enhance(Login));
