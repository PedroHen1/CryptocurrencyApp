import React, {useState, useEffect} from 'react'
import './sass/App.scss';
import axios from 'axios'
import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=65&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data)
    }).catch(error => console.log(error))
  }, []);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const fliteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1>Search a Cryptocurrency</h1>
        <form>
          <input type='text' placeholder="Search" className='coin-input' onChange={handleChange} />
        </form>
        <div className="info">
                <h4>NAME</h4>
                <h4>ABREVIATION</h4>
                <h4>PRICE</h4>
                <h4>VOLUME</h4>
                <h4>CHANGE(24H)</h4>
                <h4>CAPITALIZATION</h4>
            </div>
      </div>
      {fliteredCoins.map(coin => {
        return (
          <Coin key={coin.id}
          name={coin.name}
          image={coin.image}
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume}
          />
        )
      })}
    </div>
  );
}

export default App;
