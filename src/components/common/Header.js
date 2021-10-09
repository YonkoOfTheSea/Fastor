import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'

const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1,
    }
};



const Header = (props) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.grow} onClick={() => props.history.push('/')}>
                        <Button color="inherit" onClick={() => props.history.push('/login')}>  Home </Button>
                    </Typography>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Nearby Restaurants
                    </Typography>
                    {
                        localStorage.getItem('user') === null || localStorage.getItem('user') === "" ?
                            <Button color="inherit" onClick={() => props.history.push('/login')}>Login</Button> :
                            <Button color="inherit" onClick={() => props.history.push('/logout')}>Logout</Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Header));
