import React, { Component, Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Coin from './components/coins/Coin';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    coins: [],
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    axios
      .get(
        'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD'
      )
      .then((response) =>
        response.data.Data.map((coin) => ({
          name: `${coin.CoinInfo.Name}`,
          image: `http://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`,
          price: `${coin.DISPLAY.USD.PRICE}`,
          dollarChange: `${coin.DISPLAY.USD.CHANGE24HOUR}`,
          percentChange: `${coin.DISPLAY.USD.CHANGEPCTDAY}`,
          dollarVolume: `${coin.DISPLAY.USD.VOLUMEDAYTO}`,
          lastUpdate: `${coin.DISPLAY.USD.LASTUPDATE}`,
        }))
      )

      .then((coins) => {
        this.setState({
          coins,
          isLoaded: false,
        });
        console.log(coins);
      })
      .catch((error) => this.setState({ error, isLoaded: false }));
  }

  // Sort by Largest Percentage Loss first
  sortPercentChangeNeg() {
    const coins = [...this.state.coins].sort((a, b) => {
      if (a.percentChange < b.percentChange) {
        return -1;
      }
      if (a.percentChange > b.percentChange) {
        return 1;
      }
      return 0;
    });
    this.setState({ coins: coins });
  }

  //Sort by Largest Percentage Gain first
  sortPercentChangePos() {
    const coins = [...this.state.coins].sort((a, b) => {
      if (a.percentChange < b.percentChange) {
        return 1;
      }
      if (a.percentChange > b.percentChange) {
        return -1;
      }
      return 0;
    });

    this.setState({ coins: coins });
  }

  //Sort by Largest Dollar Loss first
  sortDollarLoss() {
    const coins = [...this.state.coins].sort((a, b) => {
      if (a.dollarChange < b.dollarChange) {
        return 1;
      }
      if (a.dollarChange > b.dollarChange) {
        return -1;
      }
      return 0;
    });
    this.setState({ coins: coins });
  }

  //Sort by Largest Dollar Gain first
  sortDollarGain() {
    const coins = [...this.state.coins].sort((a, b) => {
      if (a.dollarChange < b.dollarChange) {
        return -1;
      }
      if (a.dollarChange > b.dollarChange) {
        return 1;
      }
      return 0;
    });
    this.setState({ coins: coins });
  }

  render() {
    const { isLoaded, coins } = this.state;

    return (
      <Fragment>
        <Navbar />
        <div className='container-fluid'>
          <button onClick={() => this.sortPercentChangeNeg()}>
            Sort by Percent Loss
          </button>
          <button onClick={() => this.sortPercentChangePos()}>
            Sort by Percent Gain
          </button>
          <button onClick={() => this.sortDollarGain()}>
            Sort by Dollar Loss
          </button>
          <button onClick={() => this.sortDollarLoss()}>
            Sort by Dollar Gain
          </button>
        </div>
        <div className='container-fluid'>
          <Coin isLoaded={isLoaded} coins={coins} />
        </div>
      </Fragment>
    );
  }
}
export default App;
