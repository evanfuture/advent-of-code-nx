import { exampleAText } from './inputs';
import { methodA } from './methods';
import { transformInput } from './transformInput';

const inputA: number[] = transformInput(exampleAText);
const answerA = 7;

describe('year2021Day01', () => {
  it('should work for example', () => {
    expect(methodA(inputA)).toEqual(answerA);
  });
});
