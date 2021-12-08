export const transformInput = (inputText: string) =>
  inputText
    .trim()
    .split('\n')
    .map((line) => line.split(','))
    .flat()
    .map(Number);
