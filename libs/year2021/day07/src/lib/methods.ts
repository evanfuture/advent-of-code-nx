function getMedian(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const half = Math.floor(sorted.length / 2);

  return sorted.length % 2 ? sorted[half] : (sorted[half - 1] + sorted[half]) / 2;
}

export function methodA(input: number[]): number {
  const median = getMedian(input);
  const expenditure = input.reduce((total, item) => total + Math.abs(item - median), 0);
  return expenditure;
}

export function methodB(input: number[]): number {
  const increment = (i: number): number => (i * (i + 1)) / 2;
  const cheapest = Math.min(
    ...Array.from({ length: Math.max(...input) }, (_, pos) =>
      input.reduce((total, item) => total + increment(Math.abs(item - pos)), 0),
    ),
  );

  return cheapest;
}
