import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { inputText } from './inputs';
import { methodA, methodB } from './methods';
import { transformInput } from './transformInput';

@Component({
  selector: 'aoc-year2021-day07-a',
  template: `{{ answerA }}`,
})
export class Year2021Day07AComponent {
  inputA = transformInput(inputText);
  answerA = methodA(this.inputA);
}
@Component({
  selector: 'aoc-year2021-day07-b',
  template: `{{ answerB }}`,
})
export class Year2021Day07BComponent {
  inputB = transformInput(inputText);
  answerB = methodB(this.inputB);
}

@NgModule({
  imports: [CommonModule],
  declarations: [Year2021Day07AComponent, Year2021Day07BComponent],
  exports: [Year2021Day07AComponent, Year2021Day07BComponent],
})
export class Year2021Day07Module {}
