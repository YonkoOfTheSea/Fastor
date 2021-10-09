import React, { Component } from 'react';
import Footer from './common/Footer';
import Header from './common/Header';
import Panel from './common/Panel';
import fastor_Logo from './images/fastor_Logo.png'
import { Select, MenuItem } from '@material-ui/core';
import { getResturants } from '../actions/zomatoapi';


const imgStyle = {
    display: 'flex', height: '480px', width: '100%'
};

const selectStyle = {
    display: 'flex',
    flexGrow: 1
}

const divStyle = {
    display: 'flex',
    justifyContent: 'space-around'
}

const buttonStyle = {
    flexGrow: 0.2,
    backgroundColor: 'red',
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '2px'
}

class Home extends Component {
    constructor(props) {
        super()
        this.state = {
            city: 0
        }
    }

    handleChange = event => {
        this.setState({ city: event.target.value });
    };

    getResturants = async (cityId) => {
        let res = await getResturants(cityId)
        return res
    }

    handleSearch = async (event) => {
        // call resturants from the city and set it in localstorage.
        let res = await this.getResturants(event.target.value)
        localStorage.setItem('resturants', JSON.stringify(res))
        this.props.history.push('/resturants')
        return null;
    }

    renderCities = () => {
        return (
            <div style={divStyle}>
                {this.state.city > 0 &&
                    <h1 >You have selected : </h1>
                }
                <Select
                    value={this.state.city}
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'city',
                        id: 'city-simple',
                    }}
                    style={selectStyle}
                >
                    <MenuItem value={0}>
                        <em>Please Select Your City from the Drop Down Below.</em>
                    </MenuItem>
                    <MenuItem value={1}>Delhi</MenuItem>
                    <MenuItem value={2}>Kolkata</MenuItem>
                    <MenuItem value={3}>Mumbai </MenuItem>
                    <MenuItem value={4}>Bangalore</MenuItem>
                    <MenuItem value={5}>Pune</MenuItem>
                    <MenuItem value={6}>Hyderabad</MenuItem>
                </Select>
                {this.state.city > 0 &&
                    <button value={this.state.city} style={buttonStyle} onClick={this.handleSearch}> Clik to Search..</button>
                }
            </div>
        )
    }

    render() {
        return (
            <>
                <Header />
                <Panel>
                    {this.renderCities()}
                    <img style={imgStyle} src={fastor_Logo} alt="Home Page Logo" />
                </Panel>
                <Footer />
            </>
        )
    }
}

export default Home;