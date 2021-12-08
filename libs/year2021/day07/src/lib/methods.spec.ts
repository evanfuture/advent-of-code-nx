import { exampleAText } from './inputs';
import { methodA, methodB } from './methods';
import { transformInput } from './transformInput';

describe('year2021Day07', () => {
  it('should work for example A', () => {
    const inputA = transformInput(exampleAText);
    const answerA = 37;
    expect(methodA(inputA)).toEqual(answerA);
  });

  it('should work for example B', () => {
    const inputB = transformInput(exampleAText);
    const answerB = 168;
    expect(methodB(inputB)).toEqual(answerB);
  });
});
