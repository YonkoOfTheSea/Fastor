import React from 'react';
import PropTypes from 'prop-types';

//Third Party
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlined from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom'
import Header from './common/Header';
import Footer from './common/Footer';

// Temporary Code to style my CSS forLgin Screen
const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});


const BaseAPIUrl = "https://5c72fab9ba65bb0014ebf059.mockapi.io/userdocs/Users"

//  Login Component
class Signup extends React.Component {

    constructor(props) {
        super()
        this.state = {
            email: '',
            password: '',
            error: '',
            users: []
        }
    }

    componentDidMount = () => {
        this.getUsers();
    };

    getUsers = async () => {
        let userDb = await fetch(BaseAPIUrl)
        let users = await userDb.json();
        this.setState({
            users: users
        });
    }

    reduceUser = () => {
        let bool = false
        this.state.users.forEach(user => {
            if (user.name.toLowerCase() === this.state.email.toLowerCase()) {
                bool = true
            }
        }
        )
        return bool
    }

    onSubmit = async (e) => {
        let userExists = await this.reduceUser()
        if (userExists) {
            this.setState({ error: "Username is already taken." })
        } else {
            fetch(BaseAPIUrl, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ name: this.state.email, password: this.state.password })
            })
            localStorage.setItem('user', this.state.email)
            this.props.history.push('/')
        }
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    render() {
        const { classes } = this.props;
        const { email, password } = this.state

        return (
            <>
                <Header />
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlined />
                        </Avatar>
                        {
                            this.state.error &&
                            <h1> <label color="red"> {this.state.error} </label> </h1>
                        }
                        <Typography component="h1" variant="h5">
                            Please Enter Username and Password
          </Typography>
                        <form className={classes.form} onSubmit={this.onSubmit}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email" >Username</InputLabel>
                                <Input id="email" name="email" value={email} onChange={this.handleEmailChange} autoComplete="email" autoFocus />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input name="password" type="password" id="password" value={password} onChange={this.handlePasswordChange} autoComplete="current-password" />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                            >
                                Register
            </Button>

                        </form>
                    </Paper>
                </main>
                <Footer />
            </>
        );
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Signup));