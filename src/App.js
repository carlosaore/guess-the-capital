import React, { Component } from 'react';
import axios from 'axios'

import GameCapitals from './gameCapitals'
import { shuffle } from './functions'
import './App.css'


class App extends Component {

  state = {
    data: []
  }

  async componentDidMount() {
    const { data } = await axios('https://restcountries.eu/rest/v2/all');
    let dataFiltered = data.filter(country => country.capital !== '')


    this.setState({
      data: shuffle(dataFiltered)
    })
  }
  render() {
    return (
      <div className='container'>
        <div className='instructions'>
          <h1>Wild Capitals</h1>
          <GameCapitals countries={this.state.data} />
        </div>
      </div>
    );
  }
}

export default App;