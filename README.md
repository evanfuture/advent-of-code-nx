# Advent of Code

This is a monorepo "starter" for forking and writing your own solutions for [Advent of Code](https://adventofcode.com/).

This project was generated using [Nx](https://nx.dev), a tooling library that encourages excellent architectural practices.  This is my own preferred way to work, and so you'll find a thin Angular app, styling with Tailwind, and a few shared libs for helpers.  The bulk of the actual coding work you'll do is inside the libs folder, one lib for each day's challenge:

## For Each Day

First, you can run `nx workspace-generator next-day {day}` replacing `{day}` with a two digit version of the day, eg, `nx workspace-generator next-day 02`

You can also run `npm run next-day 02` to get the same effect.

This will scaffold out day 2, and add it to the lib.  The generator also auto-adds the lib's component into main app, so you only really need to generate it and start coding.

The main Angular app is just a simple container, but importantly, it should only fetch and run the answer-calculation script when you click on the button, which should help make this monorepo useful across many seasons.

## Active Work

Once you have today's day lib, you can paste your input and the example given into the lib/src/lib/inputs.ts file.

You can modify the methods.spec.ts file with the example data, and run `nx test year2021-day02 -- --watch` while you implement the actual answer in methods.ts

Once your tests pass, you can run the app with `npm run start` and click on the day/variation you're working on.

GOOOOD LUCK!!!
