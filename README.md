# macro-game

Toy macro policy game prototype with quarterly simulation turns.

## Features

- Quarterly turns (`Run Quarter`) with a simple macro engine.
- Core outputs each turn: GDP, inflation, unemployment.
- Two policy levers:
  - Fiscal impulse
  - Monetary policy rate

## Run locally

1. From the project root, start a static server:

   ```bash
   python3 -m http.server 8000
   ```

2. Open `http://localhost:8000` in your browser.
3. Adjust the policy levers and click **Run Quarter**.
