export function methodA(input: number[]): number {
  return input.reduce((acc, curr, ind) => {
    if (ind === 0 || curr <= input[ind - 1]) {
      return acc;
    }

    return acc + 1;
  }, 0);
}
