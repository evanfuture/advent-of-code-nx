export function methodA(input: string[]): number {
  const columnStart: number[][] = input[0].split('').map(() => []);

  const counts = input.reduce((acc, curr) => {
    const digits = curr.split('');
    return acc.map((place, i) => [...place, Number(digits[i])]);
  }, columnStart);

  const splits = counts.map((count) =>
    count.reduce((acc, curr) => {
      return { ...acc, [curr]: (acc[curr] || 0) + 1 };
    }, {} as Record<number, number>),
  );

  const { g, e } = splits.reduce(
    (acc: { g: string; e: string }, curr) => {
      const g = curr[0] >= curr[1] ? '0' : '1';
      const e = curr[0] >= curr[1] ? '1' : '0';
      return {
        g: acc.g + g,
        e: acc.e + e,
      };
    },
    { g: '', e: '' },
  );

  const gamma = parseInt(g, 2);
  const epsilon = parseInt(e, 2);
  const powerConsumption = gamma * epsilon;
  return powerConsumption;
}

export function methodB(input: any[]): number {
  return 0;
}
