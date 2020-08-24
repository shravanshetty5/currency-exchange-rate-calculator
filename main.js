const currencyOneSelect = document.getElementById('currency-one');
const currencyOneAmount = document.getElementById('amount-one');
const currencyTwoSelect = document.getElementById('currency-two');
const currencyTwoAmount = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

let currencyExchangeRates;
const updateCurrencyTwoAmount = () => {
  rateEl.innerHTML = currencyExchangeRates[currencyTwoSelect.value];
  currencyTwoAmount.value =
    Math.round(+currencyOneAmount.value * +rateEl.textContent * 100) / 100;
};

const updateCurrencyOneAmount = () => {
  currencyOneAmount.value =
    Math.round((+currencyTwoAmount.value / +rateEl.textContent) * 100) / 100;
};

const calculate = (currency) => {
  //reset amount 1
  currencyOneAmount.value = 1;
  const url = `https://api.exchangeratesapi.io/latest?base=${currency}`;
  fetch(url)
    .then((resp) => resp.json())
    .then((resp) => {
      currencyExchangeRates = resp.rates;
      updateCurrencyTwoAmount();
    });
};

calculate(currencyOneSelect.value);

//add event listner to select currency 1
currencyOneSelect.addEventListener('change', (e) => {
  calculate(e.target.value);
});

//add event listner to select currency 2
currencyTwoSelect.addEventListener('change', (e) => {
  updateCurrencyTwoAmount();
});

currencyOneAmount.addEventListener('input', (e) => {
  updateCurrencyTwoAmount();
});
currencyTwoAmount.addEventListener('input', (e) => {
  updateCurrencyOneAmount();
});

//swap element
swap.addEventListener('click', () => {
  //swap values
  let temp = currencyOneSelect.value;
  currencyOneSelect.value = currencyTwoSelect.value;
  currencyTwoSelect.value = temp;
  calculate(currencyOneSelect.value);
});
