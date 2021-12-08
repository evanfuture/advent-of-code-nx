type Entry = {
  patterns: string[];
  output: string[];
};
type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type Segment = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g';

function parseInput(input: string[]): Entry[] {
  return input.map((line) => {
    const [patternStr, outputStr] = line.split(' | ');
    const patterns = patternStr.split(' ');
    const output = outputStr.split(' ');
    return { patterns, output };
  });
}

function mapDigits(digit: string): Digit {
  switch (digit.length) {
    case 2:
      return '1';
    case 3:
      return '7';
    case 4:
      return '4';
    case 7:
      return '8';
    default:
      return null;
  }
}

function getOutputFromEntry(entry: Entry): number {
  const digits = [...entry.patterns, ...entry.output];

  const ones = digits.filter((d) => d.length === 2).map((s) => s.split('') as Segment[]);
  const sevens = digits.filter((d) => d.length === 3).map((s) => s.split('') as Segment[]);
  const fours = digits.filter((d) => d.length === 4).map((s) => s.split('') as Segment[]);

  const top = sevens[0].find((d) => !ones[0].includes(d));

  const zeroOrSixOrNine = digits.filter((d) => d.length === 6).map((d) => d.split('') as Segment[]);
  const sixes = zeroOrSixOrNine.filter((d) => !d.includes(ones[0][0]) || !d.includes(ones[0][1]));
  const right1 = ones[0].find((d) => !sixes[0].includes(d));
  const right2 = ones[0].find((d) => d !== right1);

  const twoOrThreeOrFive = digits.filter((d) => d.length === 5).map((d) => d.split('') as Segment[]);
  const threes = twoOrThreeOrFive.filter((d) => ones[0].every((o) => d.includes(o)));
  const bottom = threes[0].find((d) => ![...fours[0], ...sevens[0]].includes(d));
  const middle = threes[0].find((d) => ![top, bottom, right1, right2].includes(d));

  const twoOrFive = twoOrThreeOrFive.filter((d) => !d.includes(ones[0][0]) || !d.includes(ones[0][1]));
  const twos = twoOrFive.filter((d) => d.includes(right1));
  const fives = twoOrFive.filter((d) => d.includes(right2));
  const left1 = fives[0].find((d) => ![top, middle, bottom, right2].includes(d));
  const left2 = twos[0].find((d) => ![top, middle, bottom, right1].includes(d));

  const isZero = (digit: string) => [top, left1, right1, left2, right2, bottom].sort().join('') === digit;
  const isOne = (digit: string) => [right1, right2].sort().join('') === digit;
  const isTwo = (digit: string) => [top, right1, middle, left2, bottom].sort().join('') === digit;
  const isThree = (digit: string) => [top, right1, middle, right2, bottom].sort().join('') === digit;
  const isFour = (digit: string) => [left1, right1, middle, right2].sort().join('') === digit;
  const isFive = (digit: string) => [top, left1, middle, right2, bottom].sort().join('') === digit;
  const isSix = (digit: string) => [top, left1, middle, left2, right2, bottom].sort().join('') === digit;
  const isSeven = (digit: string) => [top, right1, right2].sort().join('') === digit;
  const isEight = (digit: string) => [top, left1, right1, middle, left2, right2, bottom].sort().join('') === digit;
  const isNine = (digit: string) => [top, left1, right1, middle, right2, bottom].sort().join('') === digit;

  const mapped = entry.output.map((d) => {
    const digit = d.split('').sort().join('');
    if (isZero(digit)) {
      return '0';
    }
    if (isOne(digit)) {
      return '1';
    }
    if (isTwo(digit)) {
      return '2';
    }
    if (isThree(digit)) {
      return '3';
    }
    if (isFour(digit)) {
      return '4';
    }
    if (isFive(digit)) {
      return '5';
    }
    if (isSix(digit)) {
      return '6';
    }
    if (isSeven(digit)) {
      return '7';
    }
    if (isEight(digit)) {
      return '8';
    }
    if (isNine(digit)) {
      return '9';
    }

    return '';
  });

  return Number(mapped.join(''));
}

export function methodA(input: string[]): number {
  const entries = parseInput(input);
  const digitMap = entries.reduce((mapper, entry) => {
    const digits = entry.output.map((digit) => mapDigits(digit)).filter((d) => !!d);
    digits.forEach((digit) => {
      mapper.set(digit, (mapper.get(digit) || 0) + 1);
    });
    return mapper;
  }, new Map());

  return [...digitMap.values()].reduce((sum, value) => sum + value, 0);
}

export function methodB(input: string[]): number {
  const entries = parseInput(input);
  const values = entries.map((entry) => getOutputFromEntry(entry));
  return values.reduce((sum, value) => sum + value, 0);
}
