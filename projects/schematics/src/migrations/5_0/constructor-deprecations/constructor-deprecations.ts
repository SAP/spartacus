import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';

export const CONSTRUCTOR_DEPRECATIONS_DATA: ConstructorDeprecation[] = [];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return migrateConstructorDeprecation(
      tree,
      context,
      CONSTRUCTOR_DEPRECATIONS_DATA
    );
  };
}
