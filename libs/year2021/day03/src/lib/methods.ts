function common(input: string[]): Record<number, number>[] {
  const columnStart: number[][] = input[0].split('').map(() => []);

  const counts = input.reduce((acc, curr) => {
    const digits = curr.split('');
    return acc.map((place, i) => [...place, Number(digits[i])]);
  }, columnStart);

  return counts.map((count) =>
    count.reduce((acc, curr) => {
      return { ...acc, [curr]: (acc[curr] || 0) + 1 };
    }, {} as Record<number, number>),
  );
}

export function methodA(input: string[]): number {
  const splits = common(input);
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

export function methodB(input: string[]): number {
  const columnStart: number[][] = input[0].split('').map(() => []);

  const { o, c } = columnStart.reduce(
    (acc: { o: string[]; c: string[] }, _curr, i) => {
      let newO = acc.o;
      let newC = acc.c;
      if (newO.length > 1) {
        const oSplits = common(newO);
        const g = oSplits[i][0] > oSplits[i][1] ? '0' : '1';
        newO = newO.filter((item) => item.split('')[i] === g);
      }
      if (newC.length > 1) {
        const cSplits = common(newC);
        const e = cSplits[i][0] > cSplits[i][1] ? '1' : '0';
        newC = newC.filter((item) => item.split('')[i] === e);
      }
      return {
        o: newO,
        c: newC,
      };
    },
    {
      o: input,
      c: input,
    },
  );

  const o2 = parseInt(o[0], 2);
  const co2 = parseInt(c[0], 2);
  const powerConsumption = o2 * co2;
  return powerConsumption;
}
