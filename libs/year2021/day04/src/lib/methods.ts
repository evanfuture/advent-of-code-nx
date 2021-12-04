type Board = {
  [row: number]: {
    [column: number]: number;
  };
};
const BOARD_SIZE = 5;
const BOARD_GRID = BOARD_SIZE * BOARD_SIZE;
const BOARD_INDEX = Array.from({ length: BOARD_SIZE }, (_, i) => i);

function parseInput(input: string[]): { order: number[]; boards: Board[] } {
  const order = input[0].split(',').map(Number);
  const numbers = input
    .slice(1)
    .join(' ')
    .split(/\s+/)
    .filter((s) => !!s)
    .map(Number);

  const boards: Board[] = Array.from({ length: numbers.length / BOARD_GRID }, (_, index) => {
    return BOARD_INDEX.reduce((board, row) => {
      return {
        ...board,
        [row]: BOARD_INDEX.reduce((r, column) => {
          return {
            ...r,
            [column]: numbers[index * BOARD_GRID + row * BOARD_SIZE + column],
          };
        }, {}),
      };
    }, {});
  });

  return { order, boards };
}

export function methodA(input: string[]): number {
  parseInput(input);
  return 0;
}

export function methodB(input: any[]): number {
  return 0;
}
