import { INITIAL_STATE, runQuarter } from "./engine/simulation.js";
import { readPolicyControls, renderState } from "./ui/render.js";

let gameState = { ...INITIAL_STATE };

const output = document.getElementById("macro-output");
const actionButton = document.getElementById("run-quarter");
const resetButton = document.getElementById("reset-game");

function refresh() {
  renderState(gameState, output);
}

actionButton?.addEventListener("click", () => {
  const policy = readPolicyControls();
  gameState = runQuarter(gameState, policy);
  refresh();
});

resetButton?.addEventListener("click", () => {
  gameState = { ...INITIAL_STATE };
  refresh();
});

refresh();
