import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withRouter,Link } from 'react-router-dom'
import { Button } from '@material-ui/core';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class ResturantCard extends React.Component {

  render() {
    const { classes, resturant, disable } = this.props;
    const featureImg = resturant.featured_image

    return (
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton>
              <MoreVertIcon onClick={() => disable ? '' : this.props.history.push('/resturantDetails/' + resturant.id)} />
            </IconButton>
          }
          title={<a href={resturant.url}> {resturant.name} </a>}
          subheader={"Avg. cost for two :" + resturant.average_cost_for_two}
        />
        <CardMedia
          className={classes.media}
          image={featureImg}
          title="Resturant Image"
          onClick={() => disable ? ' ' : this.props.history.push('/resturantDetails/' + resturant.id)}
        />
        <Button color="secondary" variant="outlined">
          <Link className="link" to={{ pathname: `/resturantDetails/${resturant.id}`, state: { restaurant: resturant } }}>
            Click to view Details
        </Link>
        </Button>
        <CardContent>
          <Typography component="p">
            <b> Cuisine Offered :</b>  {resturant.cuisines}  <br />
            <b>Avg. User Rating : </b> {resturant.user_rating.aggregate_rating}  out of {resturant.user_rating.votes} votes.<br />
            <b>Rating Text:</b> {resturant.user_rating.rating_text} <br />
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

ResturantCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(ResturantCard));
