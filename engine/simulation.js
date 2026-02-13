export const INITIAL_STATE = {
  quarter: 1,
  year: 1,
  gdp: 1000,
  inflation: 3.0,
  unemployment: 7.0,
  deficitPctGDP: 2.5,
  currentAccountPctGDP: -1.0,
  exchangeRate: 850,
  investmentPctGDP: 19,
  consumptionPctGDP: 62,
  popularity: 55,
  hdi: 0.72,
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function runQuarter(previousState, policy) {
  const {
    taxRate,
    governmentSpending,
    moneySupplyGrowth,
    baseInterestRate,
    exchangeRegime,
    managedExchangeRate,
  } = policy;

  const fiscalBalance = taxRate - governmentSpending;
  const fiscalImpulse = governmentSpending - taxRate;
  const realRatePressure = baseInterestRate - moneySupplyGrowth * 0.25;

  const externalGap = exchangeRegime === "peg"
    ? (managedExchangeRate - previousState.exchangeRate) / previousState.exchangeRate
    : 0;

  const growthPct =
    0.6 +
    fiscalImpulse * 0.18 +
    moneySupplyGrowth * 0.08 -
    baseInterestRate * 0.1 -
    Math.abs(externalGap) * 1.4;

  const inflationDelta =
    fiscalImpulse * 0.11 + moneySupplyGrowth * 0.09 - baseInterestRate * 0.07;

  const unemploymentDelta = -growthPct * 0.22 + realRatePressure * 0.03;

  const deficitPctGDP = clamp(-fiscalBalance + 1.2, -8, 18);
  const currentAccountPctGDP = clamp(
    previousState.currentAccountPctGDP - fiscalImpulse * 0.12 + realRatePressure * 0.08,
    -12,
    12,
  );

  const exchangeRate =
    exchangeRegime === "free_float"
      ? clamp(
          previousState.exchangeRate *
            (1 + (inflationDelta - baseInterestRate * 0.05 + fiscalImpulse * 0.01) / 100),
          200,
          3000,
        )
      : clamp(managedExchangeRate, 200, 3000);

  const investmentPctGDP = clamp(
    previousState.investmentPctGDP - baseInterestRate * 0.2 + moneySupplyGrowth * 0.16,
    8,
    35,
  );

  const consumptionPctGDP = clamp(
    previousState.consumptionPctGDP + fiscalImpulse * 0.12 + growthPct * 0.15,
    40,
    80,
  );

  const popularity = clamp(
    previousState.popularity + growthPct * 0.9 - inflationDelta * 0.6 - Math.max(deficitPctGDP - 6, 0) * 0.35,
    0,
    100,
  );

  const hdi = clamp(
    previousState.hdi + growthPct * 0.0005 - unemploymentDelta * 0.0007 + investmentPctGDP * 0.00015,
    0.45,
    0.95,
  );

  const gdp = Math.max(100, previousState.gdp * (1 + growthPct / 100));
  const inflation = clamp(previousState.inflation + inflationDelta, -5, 40);
  const unemployment = clamp(previousState.unemployment + unemploymentDelta, 2, 30);

  const nextQuarter = previousState.quarter === 4 ? 1 : previousState.quarter + 1;
  const nextYear = nextQuarter === 1 ? previousState.year + 1 : previousState.year;

  return {
    ...previousState,
    quarter: nextQuarter,
    year: nextYear,
    gdp,
    inflation,
    unemployment,
    deficitPctGDP,
    currentAccountPctGDP,
    exchangeRate,
    investmentPctGDP,
    consumptionPctGDP,
    popularity,
    hdi,
  };
}
