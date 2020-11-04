import React, { Component } from 'react';

import { shuffle } from './functions'


class gameCapitals extends Component {

  state = {
    gameStatus: 'startGame',
    countries: [],
    fourCapitals: [],
    points: 0,
    incorrect: false,
    seconds: 30
  }

  startGame = () => {

    let arrayCountries = this.props.countries

    let fourCapitals = [arrayCountries[0].capital, arrayCountries[1].capital, arrayCountries[2].capital, arrayCountries[3].capital]

    shuffle(fourCapitals)

    const countdown = () => {
      console.log(this.state.seconds)
      if (this.state.seconds <= 0) {
        this.setState({
          gameStatus: 'gameOver'
        })
        clearInterval(timerId)
      }
      this.setState({
        seconds: this.state.seconds - 1
      })
    }

    let timerId = setInterval(countdown, 1000)

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
        seconds: this.state.seconds + 4,
        incorrect: false
      })

    } else {
      console.log('wrong')
      if (this.state.points - 2 < 0) {
        this.setState({
          points: 0,
          seconds: this.state.seconds - 2,
          incorrect: true
        })
      } else {
        this.setState({
          points: this.state.points - 2,
          seconds: this.state.seconds - 2,
          incorrect: true
        })
      }
    }
  }

  playAgain = () => {
    this.setState({
      gameStatus: 'startGame',
      points: 0,
      incorrect: false,
      seconds: 30
    })
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
            <h2>Current points: {this.state.points} || Time Left: {this.state.seconds}</h2>
            <h1>{this.state.countries[0].name}</h1>
            <h3>{this.state.incorrect && 'WRONG!!'}</h3>
            <div className='button-container'>
              {
                this.state.fourCapitals.map((capital, index) => (
                  <button key={index} id={capital} onClick={this.chooseCapital}>{capital}</button>
                ))
              }
            </div>
          </div>
        }
        {
          this.state.gameStatus === 'gameOver' &&
          <div>
            <h1>Time runned out!</h1>
            <p>You did {this.state.points} points!</p>
            <p>Do you want to try it again?</p>
            <button onClick={this.playAgain}>Play again</button>
          </div>
        }
      </div>
    );
  }
}

export default gameCapitals;