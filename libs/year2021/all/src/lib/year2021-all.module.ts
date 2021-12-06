import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Year2021Day01AComponent, Year2021Day01BComponent, Year2021Day01Module } from '@aoc/year2021/day01';
import { Year2021Day02AComponent, Year2021Day02BComponent, Year2021Day02Module } from '@aoc/year2021/day02';
import { Year2021Day03AComponent, Year2021Day03BComponent, Year2021Day03Module } from '@aoc/year2021/day03';
import { Year2021Day04AComponent, Year2021Day04BComponent, Year2021Day04Module } from '@aoc/year2021/day04';
import { Year2021Day05AComponent, Year2021Day05BComponent, Year2021Day05Module } from '@aoc/year2021/day05';

export const AVAILABLE_YEARS: string[] = ['2021'];
export const AVAILABLE_DAYS: string[] = ['01', '02', '03', '04', '05'];
export const VARIATIONS: string[] = ['A', 'B'];

export const YEAR2021_ANSWERS: Record<string, any> = {
  '202101A': Year2021Day01AComponent,
  '202101B': Year2021Day01BComponent,
  '202102A': Year2021Day02AComponent,
  '202102B': Year2021Day02BComponent,
  '202103A': Year2021Day03AComponent,
  '202103B': Year2021Day03BComponent,
  '202104A': Year2021Day04AComponent,
  '202104B': Year2021Day04BComponent,
  '202105A': Year2021Day05AComponent,
  '202105B': Year2021Day05BComponent,
};

@NgModule({
  imports: [
    CommonModule,
    Year2021Day01Module,
    Year2021Day02Module,
    Year2021Day03Module,
    Year2021Day04Module,
    Year2021Day05Module,
  ],
})
export class Year2021AllModule {}
