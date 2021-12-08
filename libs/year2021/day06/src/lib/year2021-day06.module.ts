import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { inputText } from './inputs';
import { methodA, methodB } from './methods';
import { transformInput } from './transformInput';

@Component({
  selector: 'aoc-year2021-day06-a',
  template: `{{ answerA }}`,
})
export class Year2021Day06AComponent {
  inputA = transformInput(inputText);
  answerA = methodA(this.inputA);
}
@Component({
  selector: 'aoc-year2021-day06-b',
  template: `{{ answerB }}`,
})
export class Year2021Day06BComponent {
  inputB = transformInput(inputText);
  answerB = methodB(this.inputB);
}

@NgModule({
  imports: [CommonModule],
  declarations: [Year2021Day06AComponent, Year2021Day06BComponent],
  exports: [Year2021Day06AComponent, Year2021Day06BComponent],
})
export class Year2021Day06Module {}
