import { exampleAText } from './inputs';
import { methodA, methodB } from './methods';
import { transformInput } from './transformInput';

describe('year2021Day02', () => {
  it('should work for example A', () => {
    const inputA = transformInput(exampleAText);
    const answerA = 150;
    expect(methodA(inputA)).toEqual(answerA);
  });

  it('should work for example B', () => {
    const inputB = transformInput(exampleAText);
    const answerB = 900;
    expect(methodB(inputB)).toEqual(answerB);
  });
});
