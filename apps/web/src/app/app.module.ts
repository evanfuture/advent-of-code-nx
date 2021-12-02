import { Component, Directive, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AVAILABLE_DAYS, AVAILABLE_YEARS, VARIATIONS, Year2021AllModule, YEAR2021_ANSWERS } from '@aoc/year2021/all';

@Directive({
  selector: '[aocAnswer]',
})
export class AnswerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: 'aoc-root',
  template: `
    <main class="w-full max-w-screen-md mx-auto">
      <h1 class="mb-4">evanfuture's Advent of Code</h1>
      <div class="flex space-x-3">
        <div>
          <ng-container *ngFor="let year of years">
            <h2 class="mb-4">{{ year }}</h2>
            <div class="flex flex-wrap px-5 space-x-3 bg-gray-600 rounded-2xl py-7">
              <ng-container *ngFor="let day of availableDays">
                <div
                  *ngFor="let variation of variations"
                  [ngClass]="{ 'bg-blue-800': activeAnswer === year + day + variation }"
                >
                  <h3>Day {{ day }} {{ variation }}</h3>
                  <button class="px-3 py-4 text-xs rounded-sm" (click)="getAnswer(year, day, variation)">
                    {{ activeAnswer === year + day + variation ? 'Hide' : 'Show' }} Answer
                  </button>
                </div>
              </ng-container>
            </div>
          </ng-container>
        </div>
        <div>
          <div class="mb-4">Answer:</div>
          <div class="flex flex-wrap px-5 space-x-3 bg-gray-600 rounded-2xl py-7">
            <ng-template aocAnswer></ng-template>
          </div>
        </div>
      </div>
    </main>
  `,
})
export class AppComponent {
  years: string[] = AVAILABLE_YEARS;
  availableDays: string[] = AVAILABLE_DAYS;
  variations: string[] = VARIATIONS;
  answers: Record<string, any> = YEAR2021_ANSWERS;
  activeAnswer = '';

  @ViewChild(AnswerDirective, { static: true }) aocAnswer!: AnswerDirective;

  getAnswer(year: string, day: string, variation: string) {
    const ydv = year + day + variation;
    const isActiveAlready = this.activeAnswer === ydv;
    this.activeAnswer = '';

    const viewContainerRef = this.aocAnswer.viewContainerRef;
    viewContainerRef.clear();

    if (!isActiveAlready) {
      this.activeAnswer = ydv;
      viewContainerRef.createComponent(this.answers[ydv]);
    }
  }
}

@NgModule({
  declarations: [AppComponent, AnswerDirective],
  imports: [BrowserModule, Year2021AllModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
