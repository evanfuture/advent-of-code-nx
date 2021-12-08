const DAY_COUNT_A = 80;
const DAY_COUNT_B = 256;

export function methodA(input: number[], DAY_COUNT = DAY_COUNT_A): number {
  const days = Array.from({ length: DAY_COUNT }, (_, i) => i);

  const startCounts = input.reduce((counts, age) => {
    return counts.set(age, (counts.get(age) || 0) + 1);
  }, new Map());

  const result = days.reduce((ageCounts) => {
    return [...ageCounts.keys()].reduce((newCounts, age) => {
      const newAge = age === 0 ? 6 : age - 1;
      const currentCount = ageCounts.get(age);
      newCounts.set(newAge, currentCount + (newCounts.get(newAge) || 0));
      if (age === 0 && newAge === 6) {
        newCounts.set(8, ((newCounts.get(8) || 0) + 1) * currentCount);
      }
      return newCounts;
    }, new Map());
  }, startCounts);

  return [...result.values()].reduce((a, b) => a + b);
}

export function methodB(input: number[]): number {
  return methodA(input, DAY_COUNT_B);
}
