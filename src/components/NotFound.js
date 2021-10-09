import React from 'react';
import '../styles/NotFound.scss';
import { Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

class NotFound extends React.Component {

  constructor(props){
    super()
  }

  render(){
    return (
      <div className="FourOhFour">
        <div className="bg" style={{ backgroundImage: 'url("https://c1.staticflickr.com/8/7172/6508022985_b22200ced0_b.jpg")' }}></div>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => this.props.history.push('/') }
        >
          Click Here "Go Back to DASHBOARD"
        </Button>
      </div>
    )
  }
}

export default withRouter(NotFound);