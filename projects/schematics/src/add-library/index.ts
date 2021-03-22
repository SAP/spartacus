import {
  chain,
  externalSchematic,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { InstallSpartacusLibraryOptions } from '../add-spartacus/schema';

export function addSpartacusLibrary(
  options: InstallSpartacusLibraryOptions
): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      externalSchematic(options.collectionName, options.schematicName, {
        project: options.project,
      }),
    ])(tree, context);
  };
}
