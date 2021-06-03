import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { migrateDependencies } from '../../mechanism/dependency-management/dependency-management';

export const REMOVED_DEPENDENCIES: string[] = ['i18next-xhr-backend'];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return migrateDependencies(tree, context, REMOVED_DEPENDENCIES);
  };
}
