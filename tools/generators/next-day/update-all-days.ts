import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { tsquery } from '@phenomnomnominal/tsquery';
import {
  ArrayLiteralExpression,
  Identifier,
  ImportDeclaration,
  ObjectLiteralExpression,
  VariableDeclaration,
} from 'typescript';
import { NextDayOptions } from './schema';

export default function (tree: Tree, schema: NextDayOptions) {
  const sourceRoot = readProjectConfiguration(tree, 'year2021-all').sourceRoot;
  const filePath = `${sourceRoot}/lib/year${schema.year}-all.module.ts`;
  const newImport = `import { Year${schema.year}Day${schema.day}AComponent, Year${schema.year}Day${schema.day}BComponent, Year${schema.year}Day${schema.day}Module } from '@aoc/year${schema.year}/day${schema.day}';`;
  const fileEntry = tree.read(filePath);
  const contents = fileEntry.toString();
  const ast = tsquery.ast(contents);

  const imports = tsquery(ast, 'ImportDeclaration', { visitAllChildren: true }) as ImportDeclaration[];
  const lastImport = imports[imports.length - 1];
  const endOfImportsPos = lastImport.end;

  const days = (
    (tsquery(ast, 'Identifier[name=AVAILABLE_DAYS]', { visitAllChildren: true })?.[0] as Identifier)
      ?.parent as VariableDeclaration
  )?.initializer as ArrayLiteralExpression;
  const { hasTrailingComma: daysTC, end: endOfDaysPos } = days.elements;

  const answers = (
    (tsquery(ast, 'Identifier[name=YEAR2021_ANSWERS]', { visitAllChildren: true })?.[0] as Identifier)
      ?.parent as VariableDeclaration
  )?.initializer as ObjectLiteralExpression;
  const { hasTrailingComma: answersTC, end: endOfAnswersPos } = answers.properties;

  const ngModuleImports = (
    tsquery(ast, 'CallExpression Identifier[name=CommonModule]', { visitAllChildren: true })?.[0] as Identifier
  )?.parent as ArrayLiteralExpression;
  const { hasTrailingComma: ngModuleTC, end: endOfNgModulePos } = ngModuleImports.elements;

  const updatedConfig = `${contents.slice(0, endOfImportsPos)}
    ${newImport}
    ${contents.slice(endOfImportsPos, endOfDaysPos)}${daysTC ? '' : ','}
    '${schema.day}',
    ${contents.slice(endOfDaysPos, endOfAnswersPos)}${answersTC ? '' : ','}
    '${schema.year}${schema.day}A': Year${schema.year}Day${schema.day}AComponent,
    '${schema.year}${schema.day}B': Year${schema.year}Day${schema.day}BComponent,
    ${contents.slice(endOfAnswersPos, endOfNgModulePos)}${ngModuleTC ? '' : ','}
    Year${schema.year}Day${schema.day}Module,
    ${contents.slice(endOfNgModulePos)}`;

  if (updatedConfig !== contents) {
    tree.write(filePath, updatedConfig);
  }
}
