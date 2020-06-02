import React from 'react';

const CoinBox = ({
  coin: {
    name,
    image,
    price,
    dollarChange,
    percentChange,
    dollarVolume,
    lastUpdate,
  },
}) => {
  let newDollar = dollarChange.replace(/[&;\$]/g, '');
  let newDollarStyle = { backgroundColor: '#BCF5C2', fontWeight: 'bold' };

  console.log(newDollar);

  if (newDollar < 1) {
    newDollarStyle.backgroundColor = '#F5CDBC';
  }

  return (
    <div key={name}>
      <div className='container-fluid row border border-dark mb-2 mt-1'>
        <div className='col text-white text-center border border-dark background pt-3'>
          <div className='container'>
            <div className='row align-items-center'>
              <div className='col-sm'>
                <h3>{name}</h3>
              </div>

              <div className='col-sm'>
                <img src={image} alt={name} className='w-50 mb-3 bg-white' />
              </div>
            </div>
          </div>
        </div>

        <div className='col border border-dark rounded-left text-center'>
          {price}
        </div>
        <div
          className='col border border-dark text-center'
          style={newDollarStyle}
        >
          $ {newDollar}
        </div>
        <div className='col border border-dark text-center'>
          %{percentChange}
        </div>
        <div className='col border border-dark text-center'>{dollarVolume}</div>
        <div className='col border border-dark rounded-right text-center'>
          <p>
            {lastUpdate}{' '}
            <a
              href='https://www.cryptocompare.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              More...
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default CoinBox;
