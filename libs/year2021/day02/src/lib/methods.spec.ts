import { exampleAText } from './inputs';
import { methodA, methodB } from './methods';
import { transformInput } from './transformInput';

describe('year2021Day02', () => {
  it('should work for example A', () => {
    const inputA: number[] = transformInput(exampleAText);
    const answerA = 7;
    expect(methodA(inputA)).toEqual(answerA);
  });

  it('should work for example B', () => {
    const inputB: number[] = transformInput(exampleAText);
    const answerB = 5;
    expect(methodB(inputB)).toEqual(answerB);
  });
});
