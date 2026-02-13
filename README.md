# macro-game

Toy macro policy game prototype with quarterly simulation turns.

## Features

- Quarterly turns (`Run Quarter`) driven by a basic macro simulation engine.
- Policy controls for:
  - Tax rate (% of GDP)
  - Government spending (% of GDP)
  - Money supply growth (%)
  - Base interest rate (%)
  - Exchange rate regime (free float or managed peg)
  - Managed exchange rate slider (pesos/USD), dimmed when free float is selected
- Per-turn outputs include GDP, unemployment, inflation, fiscal deficit/surplus, current account, exchange rate, investment, consumption, government popularity, and HDI.

## Run locally

1. From the project root, start a static server:

   ```bash
   python3 -m http.server 8000
   ```

2. Open `http://localhost:8000` in your browser.
3. Set policy levers and click **Run Quarter**.
