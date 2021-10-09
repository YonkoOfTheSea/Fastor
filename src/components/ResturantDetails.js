import React from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import DetailsCard from './DetailsCard';
import { withStyles, Typography, TextField, Button, FormControl, Select, MenuItem } from '@material-ui/core';
import MsgHeader from './common/MsgHeader';
import { getReviews, getResturantReviews, postReview } from '../actions/zomatoapi';
import NotFound from './NotFound';

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: '1%'
  },
  div: {
    width: '100%',
    display: 'flex',
    height: '100%',
    paddingtop: '3%',
    paddingbottom: '4%',
    paddingleft: '3%'
  },
  custom: {
    maxwidth: '100%'
  },
  text: {
    height: '367px',
    width: '800px'
  }
});

class ResturantDetails extends React.Component {

  constructor(props) {
    super()
    this.state = {
      review: '',
      rating: 0
    }
  }

  componentDidMount() {
    if (!this.props.match && !this.props.match.params.id) {
      return this.props.history.push('/notfound')
    }
    this.getReviews(this.props.match.params.id)
    this.getActualReviews(this.props.match.params.id)
  }

  getReviews = async (id) => {
    let res = await getReviews(id)
    localStorage.setItem('userReviews', JSON.stringify(res))
  }

  postReview = async (id, rating, review) => {
    let res = await postReview(id, rating, review)
    return res
  }

  getActualReviews = async (id) => {
    let res = await getResturantReviews(id)
    localStorage.setItem('restReviews', JSON.stringify(res))
  }

  renderCustomReviews = () => {
    let reviews = JSON.parse(localStorage.userReviews) || []
    let res = []
    let user = localStorage.getItem('user')
    if (user == "" || user == null) {
      user = ""
    }
    reviews.forEach(element => {
      let us = element.username
      if (us == null || us == "") {
        us = " "
      }
      if (us.toLowerCase() == user.toLowerCase()) {
        res.push(element)
      }
    })
    reviews = res
    return <>
      <Typography variant="h4"> Custom Reviews By all user against this resturant. </Typography>
      {
        reviews.map(review => {
          return <MsgHeader key={review.id} title={review.username} subtitle={review.description} score={review.ratings} />
        })
      }
    </>
  }

  renderReviews = () => {
    let reviews = JSON.parse(localStorage.restReviews)
    return <>
      <Typography variant="h4"> Reviews By all user against this resturant. </Typography>
      {
        reviews.map(review => {
          return <MsgHeader key={review.id} title={review.review.user.name} subtitle={review.review.review_text} score={review.review.rating} />
        })
      }
    </>
  }

  submitReview = (e) => {
    if (this.state.rating == 0 || this.state.review == " ") {
      return
    } 
    postReview(this.props.match.params.id, this.state.rating, this.state.review)
    this.props.history.push('/')
  }

  renderReviewBox = () => {
    return (
      <form onSubmit={this.submitReview}>
        <FormControl margin="normal" required fullWidth>
          <TextField
            label="Enter your feedback"
            placeholder="Enter your feedback "
            multiline
            rows={20}
            rowsMax={40}
            value={this.state.review || " "}
            onChange={this.onChange}
            className={this.props.classes.text}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <Select
            value={this.state.rating}
            onChange={this.handleRatingChange}
            inputProps={{
              name: 'city',
              id: 'city-simple',
            }}
          >
            <MenuItem value={0}>
              <em>Rate The Resturant out of 5 stars.</em>
            </MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3 </MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        > Submit Review </Button>
      </form>
    )
  }

  onChange = (e) => {
    let isValid = localStorage.getItem('user')
    if (!isValid) {
      alert('please login to enter your valuable reviews.')
      this.setState({ review: '', rating: 0 })
    } else {
      this.setState({ review: e.target.value })
    }
  }

  handleRatingChange = (e) => {
    let isValid = localStorage.getItem('user')
    if (!isValid) {
      alert('please login to enter your valuable reviews.')
    } else {
      this.setState({ rating: e.target.value })
    }
  }

  render() {
    if (this.props.location.state === undefined) {
      return (
        <NotFound />
      )
    };
    //fetch selected id's resturant details
    let resturant = this.props.location.state.restaurant
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Header />
        <div >
          <DetailsCard resturant={resturant} />
        </div>
        {this.renderReviews()}
        {this.renderCustomReviews()}
        {this.renderReviewBox()}
        <Footer />
      </div>
    )
  }
}


export default withStyles(styles)(ResturantDetails)

