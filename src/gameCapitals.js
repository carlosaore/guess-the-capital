import React, { Component } from 'react';

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


class gameCapitals extends Component {

  state = {
    gameStatus: 'startGame',
    countries: [],
    fourCapitals: [],
    points: 0,
    incorrect: false
  }

  startGame = () => {

    let arrayCountries = this.props.countries

    let fourCapitals = [arrayCountries[0].capital, arrayCountries[1].capital, arrayCountries[2].capital, arrayCountries[3].capital]

    shuffle(fourCapitals)

    this.setState({
      gameStatus: 'playingGame',
      countries: arrayCountries,
      fourCapitals
    })
  }

  chooseCapital = e => {
    if (this.state.countries[0].capital === e.target.id) {
      console.log('correct')

      let newCountries = [...this.state.countries]
      newCountries.splice(0, 4);

      let newFourCapitals = [newCountries[0].capital, newCountries[1].capital, newCountries[2].capital, newCountries[3].capital]

      shuffle(newFourCapitals)

      this.setState({
        countries: newCountries,
        fourCapitals: newFourCapitals,
        points: this.state.points + 10,
        incorrect: false
      })

    } else {
      console.log('wrong')
      if (this.state.points -2 < 0){
        this.setState({
          points: 0,
          incorrect: true
        })
      } else {
        this.setState({
          points: this.state.points - 2,
          incorrect: true
        })
      }
    }
  }

  render() {
    return (
      <div>
        {
          this.state.gameStatus === 'startGame' &&
          <div>
            <p>Guess the correct capital for each country. You will gain points and extra time for each correct capital you guessed but you can also loose points and time if you guess wrong! Are you ready?
              </p>
            <button onClick={this.startGame}>Ready</button>
          </div>
        }
        {
          this.state.gameStatus === 'playingGame' &&
          <div>
            <h1>{this.state.countries[0].name}</h1>
            <h2>Current points: {this.state.points}</h2>
            <h3>{this.state.incorrect && 'WRONG!!'}</h3>
            {
              this.state.fourCapitals.map((capital, index) => (
                <button key={index} id={capital} onClick={this.chooseCapital}>{capital}</button>
              ))
            }
          </div>
        }
      </div>
    );
  }
}

export default gameCapitals;