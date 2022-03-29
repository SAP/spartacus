import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { METHODS_AND_PROPERTIES_DEPRECATIONS_DATA } from './data/methods-and-properties.migration';

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return migrateMethodPropertiesDeprecation(
      tree,
      context,
      METHODS_AND_PROPERTIES_DEPRECATIONS_DATA
    );
  };
}
