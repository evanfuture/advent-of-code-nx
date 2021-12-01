export function methodA(input: number[]): number {
  return input.reduce((acc, curr, ind) => {
    if (ind === 0 || curr <= input[ind - 1]) {
      return acc;
    }

    return acc + 1;
  }, 0);
}

export function methodB(input: number[]): number {
  return input.reduce((acc, curr, ind) => {
    if (ind > 2) {
      const currentSet = curr + input[ind - 1] + input[ind - 2];
      const prevSet = input[ind - 1] + input[ind - 2] + input[ind - 3];
      if (currentSet > prevSet) {
        return acc + 1;
      }
    }
    return acc;
  }, 0);
}
