import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConfigDeprecation } from '../../../shared/utils/file-utils';
import { migrateConfigDeprecation } from '../../mechanism/config-deprecations/config-deprecation';

export const CONFIG_DEPRECATIONS_DATA: ConfigDeprecation[] = [];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return migrateConfigDeprecation(tree, context, CONFIG_DEPRECATIONS_DATA);
  };
}
