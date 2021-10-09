import React from 'react';
import NotFound from './NotFound';
import Header from './common/Header';
import Footer from './common/Footer';
import { Grid, withStyles } from '@material-ui/core';
import ResturantCard from './ResturantCard';

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: '1%'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const Restaurants = props => {
  const restaurants = JSON.parse(localStorage.getItem('resturants'));
  if (!restaurants || restaurants === undefined) {
    return (
      <NotFound />
    )
  };

  return (
    <React.Fragment>
      <Header />
      <div>
        {renderResturantDetails(restaurants, props.classes)}
      </div>
      <Footer />
    </React.Fragment>
  );
};


const renderResturantDetails = (restaurants, classes) => {
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        {
          restaurants.map(item => {
            return (<Grid item xs={3}>
              <ResturantCard resturant={item} />
            </Grid>)
          })
        }
      </Grid>
    </div>
  )
}
export default withStyles(styles)(Restaurants)