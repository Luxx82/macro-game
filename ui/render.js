function fmt(value, digits = 1) {
  return Number(value).toFixed(digits);
}

export function renderState(state, target) {
  target.innerHTML = `
    <p><strong>Time:</strong> Year ${state.year}, Q${state.quarter}</p>
    <p><strong>GDP:</strong> ${fmt(state.gdp, 1)}</p>
    <p><strong>Inflation:</strong> ${fmt(state.inflation, 2)}%</p>
    <p><strong>Unemployment:</strong> ${fmt(state.unemployment, 2)}%</p>
    <p><strong>Fiscal balance:</strong> ${fmt(-state.deficitPctGDP, 2)}% of GDP (${state.deficitPctGDP >= 0 ? "deficit" : "surplus"})</p>
    <p><strong>Current account:</strong> ${fmt(state.currentAccountPctGDP, 2)}% of GDP</p>
    <p><strong>Exchange rate:</strong> ${fmt(state.exchangeRate, 2)} pesos / USD</p>
    <p><strong>Investment:</strong> ${fmt(state.investmentPctGDP, 2)}% of GDP</p>
    <p><strong>Consumption:</strong> ${fmt(state.consumptionPctGDP, 2)}% of GDP</p>
    <p><strong>Government popularity:</strong> ${fmt(state.popularity, 1)} / 100</p>
    <p><strong>HDI:</strong> ${fmt(state.hdi, 3)}</p>
  `;
}

export function readPolicyControls() {
  return {
    taxRate: Number(document.getElementById("tax-rate").value),
    governmentSpending: Number(document.getElementById("government-spending").value),
    moneySupplyGrowth: Number(document.getElementById("money-growth").value),
    baseInterestRate: Number(document.getElementById("base-interest-rate").value),
    exchangeRegime: document.getElementById("exchange-regime").value,
    managedExchangeRate: Number(document.getElementById("managed-exchange-rate").value),
  };
}

export function syncControlLabels() {
  const controls = [
    ["tax-rate", "tax-rate-value", "%"],
    ["government-spending", "government-spending-value", "%"],
    ["money-growth", "money-growth-value", "%"],
    ["base-interest-rate", "base-interest-rate-value", "%"],
    ["managed-exchange-rate", "managed-exchange-rate-value", " pesos/USD"],
  ];

  controls.forEach(([inputId, labelId, suffix]) => {
    const input = document.getElementById(inputId);
    const label = document.getElementById(labelId);
    label.textContent = `${input.value}${suffix}`;
  });
}
