type Instruction = 'forward' | 'up' | 'down';

interface Position {
  distance: number;
  depth: number;
  aim?: number;
}

export function methodA(inputs: [string, number][]): number {
  const mappedInputs: Position[] = inputs.map(([directionText, count]) => {
    const direction = directionText as Instruction;
    const depthModifier = direction === 'forward' ? 0 : direction === 'up' ? -1 : 1;
    const distanceModifier = direction === 'forward' ? 1 : 0;

    return {
      depth: count * depthModifier,
      distance: count * distanceModifier,
    };
  });

  const position = mappedInputs.reduce(
    (acc, curr) => {
      return {
        depth: acc.depth + curr.depth,
        distance: acc.distance + curr.distance,
      };
    },
    { depth: 0, distance: 0 },
  );
  return position.distance * position.depth;
}

export function methodB(inputs: [string, number][]): number {
  const position = inputs.reduce(
    (acc, [direction, count]) => {
      const depthChange = direction === 'forward' ? acc.aim * count : 0;
      const distanceChange = direction === 'forward' ? count : 0;
      const aimModifier = direction === 'up' ? -1 : direction === 'down' ? 1 : 0;
      const aimChange = count * aimModifier;
      const val = {
        depth: acc.depth + depthChange,
        distance: acc.distance + distanceChange,
        aim: acc.aim + aimChange,
      };
      return val;
    },
    { depth: 0, distance: 0, aim: 0 },
  );
  return position.distance * position.depth;
}
