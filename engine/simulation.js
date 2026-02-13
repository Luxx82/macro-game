export const INITIAL_STATE = {
  quarter: 1,
  year: 1,
  gdp: 1000,
  inflation: 2.0,
  unemployment: 5.0,
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function runQuarter(previousState, policy) {
  const { fiscalImpulse, policyRate } = policy;

  // Simple toy-model relationships for placeholder gameplay.
  const growthPct = 0.4 + fiscalImpulse * 0.06 - policyRate * 0.08;
  const inflationDelta = fiscalImpulse * 0.12 - policyRate * 0.15;
  const unemploymentDelta = -growthPct * 0.25 + policyRate * 0.05;

  const gdp = Math.max(100, previousState.gdp * (1 + growthPct / 100));
  const inflation = clamp(previousState.inflation + inflationDelta, -2, 15);
  const unemployment = clamp(previousState.unemployment + unemploymentDelta, 2, 25);

  const nextQuarter = previousState.quarter === 4 ? 1 : previousState.quarter + 1;
  const nextYear = nextQuarter === 1 ? previousState.year + 1 : previousState.year;

  return {
    ...previousState,
    quarter: nextQuarter,
    year: nextYear,
    gdp,
    inflation,
    unemployment,
  };
}
