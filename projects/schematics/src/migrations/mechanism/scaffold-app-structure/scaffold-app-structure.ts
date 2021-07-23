import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  getDefaultProjectNameFromWorkspace,
  scaffoldStructure,
} from '../../../shared/utils/workspace-utils';

export function scaffoldAppStructure(
  tree: Tree,
  context: SchematicContext
): Rule {
  context.logger.info(
    'Scaffolding the new app structure if not already present...'
  );
  context.logger.info(
    'For more about the new app structure please visit: https://sap.github.io/spartacus-docs/reference-app-structure/'
  );
  const project = getDefaultProjectNameFromWorkspace(tree);
  return scaffoldStructure({ project });
}
