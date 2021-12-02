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
    <main
      class="relative px-4 py-10 bg-white text-gray-800 shadow-lg sm:rounded-3xl sm:p-20 w-full max-w-screen-md m-auto bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60"
    >
      <h1 class="mb-4">My Advent of Code</h1>
      <div class="flex space-x-4">
        <div class="flex-1">
          <ng-container *ngFor="let year of years">
            <h2 class="mb-4">{{ year }}</h2>
            <div class="grid grid-cols-2 gap-4">
              <div *ngFor="let day of availableDays" class="flex items-center space-x-1">
                <button
                  *ngFor="let variation of variations"
                  class="p-3 hover:bg-green-400 w-1/2"
                  [ngClass]="{
                    'bg-green-100 text-white': activeAnswer !== year + day + variation,
                    'bg-green-800 text-white': activeAnswer === year + day + variation
                  }"
                  (click)="getAnswer(year, day, variation)"
                >
                  <h3>Day {{ day }} {{ variation }}</h3>
                </button>
              </div>
            </div>
          </ng-container>
        </div>
        <div>
          <div class="mb-4">Answer:</div>
          <div class="text-3xl">
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
