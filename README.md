# Advent of Code

This project was generated using [Nx](https://nx.dev).

## For Each Day

First, you can run `nx workspace-generator next-day {day}` replacing `{day}` with a two digit version of the day, eg, `nx workspace-generator next-day 02`

This will scaffold out day 2, and add it to the lib.

The main Angular app is just a simple contianer, but importantly, it should only fetch and run the answer-calculation script when you click on the button, which should help make this monorepo useful across many seasons.

## Active Work

Once you have today's day lib, you can paste your input and the example given into the lib/src/lib/inputs.ts file.

You can modify the methods.spec.ts file with the example data, and run `nx test year2021-day02 -- --watch` while you implement the actual answer in methods.ts

Once your tests pass, you can run the app with `npm run start` and click on the day/variation you're working on.

GOOOOD LUCK!!!
