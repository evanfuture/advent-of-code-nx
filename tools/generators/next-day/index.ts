import { libraryGenerator } from '@nrwl/angular/generators';
import {
  formatFiles,
  generateFiles,
  installPackagesTask,
  joinPathFragments,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { NextDayOptions } from './schema';
import updateAllDays from './update-all-days';

export default async function (tree: Tree, schema: NextDayOptions) {
  const currentYear = new Date().getFullYear();
  schema.year = schema.year || currentYear.toString();

  const libDirectory = `year${schema.year}`;
  const libName = `day${schema.day}`;
  await libraryGenerator(tree, { name: libName, directory: libDirectory });
  const libProjectName = `${libDirectory}-day${schema.day}`;
  const libraryRoot = readProjectConfiguration(tree, libProjectName).root;
  generateFiles(tree, joinPathFragments(__dirname, './files'), libraryRoot, {
    ...schema,
    tmpl: '',
  });
  await updateAllDays(tree, schema);
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
