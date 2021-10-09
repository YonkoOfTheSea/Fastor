import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom'

const styles = {
    media: {
        height: 140,
    },
};

function DetailsCard(props) {
    const { classes, resturant, disable } = props;
    const featureImg = resturant.featured_image
    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={featureImg}
                    title={<a href={resturant.url}> {resturant.name} </a>}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {resturant.name}
                    </Typography>
                    <Typography component="p">
                        <b> Cuisine Offered :</b>  {resturant.cuisines}  <br />
                        <b>Avg. User Rating : </b> {resturant.user_rating.aggregate_rating}  out of {resturant.user_rating.votes} votes.<br />
                        <b>Rating Text:</b> {resturant.user_rating.rating_text} <br />
                    </Typography>
                    <Typography component="p">
                        <b> Address :</b>  {resturant.location.address}  <br />
                        <b> Online Delivery :</b>  {resturant.has_online_delivery === 1 ? 'Delivers' : 'Doesn\'t Deliver'}  <br />
                        <b> Table Booking :</b>  {resturant.has_table_booking === 1 ? 'Accepts prior Booking' : 'Check In'}  <br />
                        <a href={resturant.menu_url}> Click Here for Menu </a>
                    </Typography>
                    <h3> Cost For Two : {resturant.average_cost_for_two}</h3>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

DetailsCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(DetailsCard));
