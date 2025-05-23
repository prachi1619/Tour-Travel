import React, { useState, useEffect } from 'react';
import { getExchangeRate, convertCurrency, ExchangeRate } from '../../utils/currency';

const POPULAR_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'INR'];

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRate = async () => {
      try {
        setLoading(true);
        setError('');
        const rate = await getExchangeRate(fromCurrency, toCurrency);
        setExchangeRate(rate);
      } catch (err) {
        setError('Failed to fetch exchange rate');
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, [fromCurrency, toCurrency]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const convertedAmount = exchangeRate
    ? convertCurrency(amount, exchangeRate.rate)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Currency Converter</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              {POPULAR_CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              {POPULAR_CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSwapCurrencies}
          className="w-full py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
        >
          Swap Currencies
        </button>

        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : exchangeRate ? (
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">
              {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </div>
            <div className="text-sm text-gray-600">
              1 {fromCurrency} = {exchangeRate.rate} {toCurrency}
              <br />
              Last updated: {exchangeRate.lastUpdated}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CurrencyConverter; 