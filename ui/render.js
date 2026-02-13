function fmt(value, digits = 1) {
  return Number(value).toFixed(digits);
}

export function renderState(state, target) {
  target.innerHTML = `
    <p><strong>Time:</strong> Year ${state.year}, Q${state.quarter}</p>
    <p><strong>GDP:</strong> ${fmt(state.gdp, 1)}</p>
    <p><strong>Inflation:</strong> ${fmt(state.inflation, 2)}%</p>
    <p><strong>Unemployment:</strong> ${fmt(state.unemployment, 2)}%</p>
  `;
}

export function readPolicyControls() {
  const fiscalImpulse = Number(document.getElementById("fiscal-impulse").value);
  const policyRate = Number(document.getElementById("policy-rate").value);

  return { fiscalImpulse, policyRate };
}
