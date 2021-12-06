function parseCoord(input: string): number[][] {
  const pair = input.split(' -> ');
  return pair.map((one) => one.split(',').map(Number));
}

function mapInBetweens([start, end]: number[][]): number[][] {
  const [x1, y1] = start;
  const [x2, y2] = end;
  const xModifier = x1 < x2 ? 1 : -1;
  const yModifier = y1 < y2 ? 1 : -1;
  const newXs = Math.abs(x2 - x1);
  const newYs = Math.abs(y2 - y1);
  const max = Math.max(newXs, newYs);
  const set = Array.from({ length: max + 1 }).map((_, i) => [
    x1 + ((i * newXs) / max) * xModifier,
    y1 + ((i * newYs) / max) * yModifier,
  ]);
  return set;
}

function getOverlaps(coords: number[][][]): number {
  const allPoints = coords.map(mapInBetweens).flat(1);
  const mapper = allPoints.reduce((mapper, curr) => {
    const point = JSON.stringify(curr);
    mapper.set(point, (mapper.get(point) || 0) + 1);
    return mapper;
  }, new Map());
  const count = [...mapper.values()].filter((v) => v > 1).length;

  return count;
}

export function methodA(input: string[]): number {
  const coords: number[][][] = input
    .map(parseCoord)
    .filter((pair) => pair[0][0] === pair[1][0] || pair[0][1] === pair[1][1]);

  return getOverlaps(coords);
}

export function methodB(input: string[]): number {
  const coords: number[][][] = input.map(parseCoord);
  return getOverlaps(coords);
}
