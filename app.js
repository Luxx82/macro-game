const gameState = {
  inflation: 2.0,
  unemployment: 5.0,
  interestRate: 1.5,
};

const actionButton = document.getElementById("placeholder-action");

actionButton?.addEventListener("click", () => {
  console.log("Placeholder turn executed", gameState);
});
