interface Item {
  position: [number, number];
  value: number;
}
interface Board {
  marked: Item[];
  unmarked: Item[];
}
const BOARD_SIZE = 5;
const BOARD_GRID = BOARD_SIZE * BOARD_SIZE;
const BOARD_INDEX = Array.from({ length: BOARD_SIZE }, (_, i) => i);

function parseInput(input: string[]): { order: number[]; originalBoards: Board[] } {
  const order = input[0].split(',').map(Number);
  const numbers = input
    .slice(1)
    .join(' ')
    .split(/\s+/)
    .filter((s) => !!s)
    .map(Number);

  const originalBoards: Board[] = Array.from({ length: numbers.length / BOARD_GRID }, (_, index) => {
    return BOARD_INDEX.reduce(
      (board, row) => {
        return {
          ...board,
          unmarked: [
            ...board.unmarked,
            ...BOARD_INDEX.map((col) => {
              return {
                position: [row, col],
                value: numbers[index * BOARD_GRID + row * BOARD_SIZE + col],
              };
            }),
          ],
        };
      },
      { marked: [], unmarked: [] },
    );
  });

  return { order, originalBoards };
}

function updateBoards(boards: Board[], called: number): Board[] {
  return boards.map((board, i) => {
    const match = board.unmarked.findIndex((item) => item.value === called);
    if (match === -1) {
      return board;
    }

    return {
      marked: [...board.marked, board.unmarked[match]],
      unmarked: board.unmarked.filter((item, index) => index !== match),
    };
  });
}

function isWinner({ marked }: Board): boolean {
  const hasRowBingo = BOARD_INDEX.find((row) => {
    return BOARD_INDEX.every((col) => {
      const mmm = marked.find(({ position: [x, y] }) => x === row && y === col);
      return mmm;
    });
  });

  if (hasRowBingo !== undefined) {
    return true;
  }
  const hasColumnBingo = BOARD_INDEX.find((col) => {
    return BOARD_INDEX.every((row) => {
      const mmm = marked.find(({ position: [x, y] }) => x === row && y === col);

      return mmm;
    });
  });
  if (hasColumnBingo !== undefined) {
    return true;
  }
  return false;
}

export function methodA(input: string[]): number {
  const { order, originalBoards } = parseInput(input);

  const { winner, lastCalled } = order.reduce(
    (acc: { winner: Board; boards: Board[]; lastCalled: number }, called) => {
      if (acc.winner) {
        return acc;
      }

      const updatedBoards = updateBoards(acc.boards, called);
      const newWinner = updatedBoards.find((board) => isWinner(board));

      return { winner: newWinner, boards: updatedBoards, lastCalled: called };
    },
    { winner: null, boards: originalBoards, lastCalled: null },
  );

  const unmarkedSum = winner.unmarked.reduce((sum, { value }) => sum + value, 0);

  const score = unmarkedSum * lastCalled;

  return score;
}

export function methodB(input: string[]): number {
  const { order, originalBoards } = parseInput(input);

  const { winners, lastCalled } = order.reduce(
    (acc: { winners: Board[]; boards: Board[]; lastCalled: number }, called) => {
      if (acc.winners.length === originalBoards.length) {
        return acc;
      }

      const updatedBoards = updateBoards(acc.boards, called);
      const newWinners = updatedBoards.filter((board) => isWinner(board));
      const remainder = updatedBoards.filter((board) => !isWinner(board));

      return {
        winners: [...acc.winners, ...newWinners],
        boards: remainder,
        lastCalled: called,
      };
    },
    { winners: [], boards: originalBoards, lastCalled: null },
  );

  const unmarkedSum = winners[winners.length - 1].unmarked.reduce((sum, { value }) => sum + value, 0);

  const score = unmarkedSum * lastCalled;

  return score;
}
