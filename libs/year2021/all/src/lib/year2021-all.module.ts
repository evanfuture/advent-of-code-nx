import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Year2021Day01AComponent, Year2021Day01BComponent, Year2021Day01Module } from '@aoc/year2021/day01';
import { Year2021Day02AComponent, Year2021Day02BComponent, Year2021Day02Module } from '@aoc/year2021/day02';

export const AVAILABLE_YEARS: string[] = ['2021'];
export const AVAILABLE_DAYS: string[] = ['01', '02'];
export const VARIATIONS: string[] = ['A', 'B'];

export const YEAR2021_ANSWERS: Record<string, any> = {
  '202101A': Year2021Day01AComponent,
  '202101B': Year2021Day01BComponent,
  '202102A': Year2021Day02AComponent,
  '202102B': Year2021Day02BComponent,
};

@NgModule({
  imports: [CommonModule, Year2021Day01Module, Year2021Day02Module],
})
export class Year2021AllModule {}
