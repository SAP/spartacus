import { Rule } from '@angular-devkit/schematics';
import { RunSchematicTaskOptions } from '@angular-devkit/schematics/tasks/run-schematic/options';
import {
  LibraryOptions,
  runExternalSpartacusLibrary,
} from '@spartacus/schematics';

export function addSpartacusLibrary(
  taskOptions: RunSchematicTaskOptions<LibraryOptions>
): Rule {
  return runExternalSpartacusLibrary(taskOptions);
}
