import {
  chain,
  externalSchematic,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { RunSchematicTaskOptions } from '@angular-devkit/schematics/tasks/run-schematic/options';
import { LibraryOptions } from '../shared/utils/lib-utils';

export function addSpartacusLibrary(
  taskOptions: RunSchematicTaskOptions<LibraryOptions>
): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (!taskOptions.collection) {
      throw new SchematicsException(
        `Can't run the Spartacus library schematic, please specify the 'collection' argument.`
      );
    }
    return chain([
      externalSchematic(taskOptions.collection, taskOptions.name, {
        ...taskOptions.options,
      }),
    ])(tree, context);
  };
}
