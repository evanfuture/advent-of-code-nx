import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { inputText } from './inputs';
import { methodA } from './methods';
import { transformInput } from './transformInput';

@Component({
  selector: 'aoc-year2021-day01',
  template: `{{ answerA }}`,
})
export class Year2021Day01Component {
  inputA: number[] = transformInput(inputText);
  answerA = methodA(this.inputA);
}

@NgModule({
  imports: [CommonModule],
  declarations: [Year2021Day01Component],
  exports: [Year2021Day01Component],
})
export class Year2021Day01Module {}
