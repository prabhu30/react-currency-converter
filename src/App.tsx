import useCurrencyInfo  from './hooks/useCurrencyInfo';
import { BackgroundImage } from './utils/constants';

import InputBox from './components/InputBox';
import './App.css'
import { useState } from 'react';

function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyConversionRates = useCurrencyInfo(fromCurrency);
  const conversionOptions = Object.keys(currencyConversionRates);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  }

  const convertAmount = () => {
    setConvertedAmount(amount * currencyConversionRates[toCurrency])
  }

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url('${BackgroundImage}')` }}>
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form onSubmit={(e) => {e.preventDefault();}}>
                        <div className="w-full mb-1">
                            <InputBox 
                            label="From" 
                            amount={amount}
                            onAmountChange={(inputAmount: number) => setAmount(inputAmount)}
                            onCurrencyChange={(inputCurrency: string) => setFromCurrency(inputCurrency)}
                            selectedCurrency={fromCurrency} 
                            currencyOptions={conversionOptions} 
                            amountDisabled={false}
                            currencyDisabled={false}
                            className="" />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button type="button" className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-green-600 text-white px-2 py-0.5 font-bold" onClick={swapCurrencies}>↑ ↓</button>
                        </div>
                        <div className="w-full mt-1 mb-3">
                            <InputBox 
                            label="To" 
                            amount={convertedAmount}
                            onAmountChange={(inputAmount: number) => setConvertedAmount(inputAmount)}
                            onCurrencyChange={(inputCurrency: string) => setToCurrency(inputCurrency)}
                            selectedCurrency={toCurrency} 
                            currencyOptions={conversionOptions}
                            amountDisabled={false}
                            currencyDisabled={false}
                            className="" />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-bold" onClick={convertAmount}>
                            Convert <span className='uppercase'>{fromCurrency}</span> to <span className='uppercase'>{toCurrency}</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default App
