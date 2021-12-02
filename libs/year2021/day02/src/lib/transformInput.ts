export const transformInput = (inputText: string): [string, number][] =>
  inputText
    .trim()
    .split('\n')
    .map((line) => {
      const [direction, countText] = line.split(' ');
      const count = Number(countText);
      return [direction, count];
    });
