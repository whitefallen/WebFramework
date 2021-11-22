class Currencycalculator {
  constructor(_node) {
    this.node = _node;
    this.currencyData = this.initCurrencies();
    this.initUI();
    this.calculatedAmount = 0;
  }
  initCurrencies = () => {
    return {
      EUR: { EUR: 1.0, USD: 1.2, GBP: 0.9 },
      GBP: { EUR: 1.1, USD: 1.3, GBP: 1.0 },
      USD: { EUR: 0.8, USD: 1.0, GBP: 0.7 },
    };
  };
  currencySymbol = (_currency) => {
    let symbol = "";
    if (_currency === "EUR") {
      symbol = "€";
    }
    if (_currency === "USD") {
      symbol = "$";
    }
    if (_currency === "GBP") {
      symbol = "£";
    }
    return symbol;
  };
  calculate = (_from, _fromAmount, _to) => {
    const fromCurr = this.currencyData[_from];
    const toCurr = fromCurr[_to];
    return _fromAmount * toCurr;
  };
  initUI = () => {
    const calculatorDiv = document.createElement("div");
    calculatorDiv.className = "currencyCalculator";
    calculatorDiv.appendChild(this.createFromUi());
    calculatorDiv.appendChild(this.createCalcUi());
    calculatorDiv.appendChild(this.createToUi());
    this.node.appendChild(calculatorDiv);
  };
  createFromUi = () => {
    const calculatorFrom = document.createElement("div");
    calculatorFrom.className = "currencyCalculator__from";
    const currencySelectLabel = document.createElement("label");
    currencySelectLabel.htmlFor = "currencyCalculator__select__from";
    currencySelectLabel.innerText = "Waehrung";
    const currencySelect = document.createElement("select");
    currencySelect.id = "currencyCalculator__select__from";
    currencySelect.className = "currencyCalculator__select";
    currencySelect.name = "currencyFrom";
    const currencyInputLabel = document.createElement("label");
    currencyInputLabel.htmlFor = "amountFrom";
    currencyInputLabel.innerText = "Wert";
    const currencyInput = document.createElement("input");
    currencyInput.id = "amountFrom";
    currencyInput.className = "currencyCalculator__input";
    currencyInput.type = "number";
    currencyInput.step = "0.01";
    currencyInput.name = "amountFrom";
    this.popoulateSelect(currencySelect);
    calculatorFrom.appendChild(currencySelectLabel);
    calculatorFrom.appendChild(currencySelect);
    calculatorFrom.appendChild(currencyInputLabel);
    calculatorFrom.appendChild(currencyInput);
    return calculatorFrom;
  };
  createToUi = () => {
    const calculatorTo = document.createElement("div");
    calculatorTo.className = "currencyCalculator__to";
    const currencySelectLabel = document.createElement("label");
    currencySelectLabel.htmlFor = "currencyCalculator__select__to";
    currencySelectLabel.innerText = "Waehrung";
    const currencySelect = document.createElement("select");
    currencySelect.id = "currencyCalculator__select__to";
    currencySelect.className = "currencyCalculator__select";
    currencySelect.name = "currencyTo";
    const currencyInputLabel = document.createElement("label");
    currencyInputLabel.htmlFor = "amountTo";
    currencyInputLabel.innerText = "Wert";
    const currencyInput = document.createElement("input");
    currencyInput.id = "amountTo";
    currencyInput.className = "currencyCalculator__input";
    currencyInput.type = "text";
    currencyInput.name = "amountTo";
    currencyInput.disabled = true;
    this.popoulateSelect(currencySelect);
    calculatorTo.appendChild(currencySelectLabel);
    calculatorTo.appendChild(currencySelect);
    calculatorTo.appendChild(currencyInputLabel);
    calculatorTo.appendChild(currencyInput);
    return calculatorTo;
  };
  createCalcUi = () => {
    const calcContainer = document.createElement("div");
    const calcButton = document.createElement("button");
    calcButton.name = "calcBtn";
    calcButton.type = "button";
    calcButton.innerText = "Umrechnen";
    calcButton.className = "currencyCalculator__button";
    calcButton.onclick = function () {
      let calcedAmount = 0;
      const amountTo = document.getElementById("amountTo");
      const amountFrom = document.getElementById("amountFrom").value;
      const amountFromCurr = document.getElementById(
        "currencyCalculator__select__from"
      );
      const fromCurr =
        amountFromCurr.options[amountFromCurr.selectedIndex].value;
      const amountToCurr = document.getElementById(
        "currencyCalculator__select__to"
      );
      const toCurr = amountToCurr.options[amountToCurr.selectedIndex].value;
      if (amountFrom) {
        calcedAmount = (
          amountFrom * this.currencyData[fromCurr][toCurr]
        ).toFixed(2);
        amountTo.value = calcedAmount;
        this.calculatedAmount = calcedAmount;
        window.dispatchEvent(
          new CustomEvent("doneCalc", {
            detail: { value: calcedAmount },
          })
        );
      }
    }.bind(this);
    calcContainer.appendChild(calcButton);
    return calcContainer;
  };
  popoulateSelect = (_select) => {
    Object.keys(this.currencyData).forEach((currency) => {
      let selectOption = document.createElement("option");
      selectOption.value = `${currency}`;
      selectOption.innerText = `${currency}${this.currencySymbol(currency)}`;
      _select.appendChild(selectOption);
    });
  };
}

const WidgetFactory = {
  createWidget: function (_node) {
    return new Currencycalculator(_node);
  },
};

let nodeCalc = document.getElementById("insertHere");
window.addEventListener(
  "doneCalc",
  (e) => {
    console.log(e.detail.value);
  },
  false
);
WidgetFactory.createWidget(nodeCalc);
