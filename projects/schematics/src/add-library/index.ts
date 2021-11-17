import { Rule } from '@angular-devkit/schematics';
import { RunSchematicTaskOptions } from '@angular-devkit/schematics/tasks/run-schematic/options';
import {
  LibraryOptions,
  runExternalSpartacusLibrary,
} from '../shared/utils/lib-utils';

export function addSpartacusLibrary(
  taskOptions: RunSchematicTaskOptions<LibraryOptions>
): Rule {
  return runExternalSpartacusLibrary(taskOptions);
}
