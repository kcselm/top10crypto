import React from 'react';
import CoinBox from './CoinBox';
import PropTypes from 'prop-types';

const Coin = ({ coins, isLoaded }) => {
  if (isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <div className='titlebar container-fluid'>
          <div className='row'>
            <div className='col bg-info'> </div>
            <div className='col text-center bg-success'>Price ($)</div>
            <div className='col text-center bg-info'>Dollar Change ($)</div>
            <div className='col text-center bg-danger'>Percent Change (%)</div>
            <div className='col text-center bg-success'>Dollar Volume ($)</div>
            <div className='col text-center bg-danger'>Last Updated (min)</div>
          </div>
        </div>
        {coins.map((coin) => (
          <CoinBox key={coin.name} coin={coin} />
        ))}
      </div>
    );
  }
};

Coin.propTypes = {
  coins: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

export default Coin;
