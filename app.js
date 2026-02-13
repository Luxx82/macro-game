import { INITIAL_STATE, runQuarter } from "./engine/simulation.js";
import { readPolicyControls, renderState, syncControlLabels } from "./ui/render.js";

let gameState = { ...INITIAL_STATE };

const output = document.getElementById("macro-output");
const actionButton = document.getElementById("run-quarter");
const resetButton = document.getElementById("reset-game");
const exchangeRegimeSelect = document.getElementById("exchange-regime");
const managedRateInput = document.getElementById("managed-exchange-rate");

function syncExchangeRateControl() {
  const isFreeFloat = exchangeRegimeSelect.value === "free_float";
  managedRateInput.disabled = isFreeFloat;
  managedRateInput.classList.toggle("opaque", isFreeFloat);
}

function refresh() {
  renderState(gameState, output);
}

[actionButton, resetButton].forEach((button) => {
  button?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });
});

actionButton?.addEventListener("click", () => {
  const policy = readPolicyControls();
  gameState = runQuarter(gameState, policy);
  refresh();
});

resetButton?.addEventListener("click", () => {
  gameState = { ...INITIAL_STATE };
  refresh();
});

exchangeRegimeSelect?.addEventListener("change", () => {
  syncExchangeRateControl();
  syncControlLabels();
});

document.querySelectorAll("input[type='range']").forEach((input) => {
  input.addEventListener("input", syncControlLabels);
});

syncExchangeRateControl();
syncControlLabels();
refresh();
