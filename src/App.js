
import './App.css';
import { useState } from 'react';

const URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=';
const API_KEY = ''

function App() {

  const [euro,setEuro] = useState(0);
  const [gbp,setGbp] = useState(0);
  const [rate,setRate] = useState(0);

  async function convert(e) {
    e.preventDefault();
    try{
      const address = URL + API_KEY;
      const response = await fetch(address);

      if (response.ok) {
        const json = await response.json();
        console.log(json.rates.GBP);
        setRate(json.rates.GBP);

        setGbp(euro * json.rates.GBP);
      } else {
        alert('Error retrieving exchange rate.')
      }
    }catch(err) {
      alert(err);
    }
  }
  return (
    <div id="container">
      <form onSubmit={convert}>
        <div>
          <p>Euros to pounds</p>
          <input type="number" step="0.01" value={euro}
           onChange={e => setEuro(e.target.value)} />
           <output>Rate = {rate}</output>
        </div>
        <div>
          <output> {gbp.toFixed(2)} £</output>
        </div>
        <div>
          <button>Calculate</button>
        </div>
      </form>
    </div>
  );
}

export default App;
