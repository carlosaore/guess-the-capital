import React, { Component } from 'react';
import axios from 'axios'

import GameCapitals from './gameCapitals'

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class App extends Component {

  state = {
    data: []
  }

  async componentDidMount() {
    const {data} = await axios('https://restcountries.eu/rest/v2/all');
    let dataFiltered = data.filter(country => country.capital !== '')


    this.setState({
      data: shuffle(dataFiltered)
    })
  }
  render() {
    return (
      <div>
        <h1>Wild Capitals</h1>
        <GameCapitals countries={this.state.data} />
      </div>
    );
  }
}

export default App;