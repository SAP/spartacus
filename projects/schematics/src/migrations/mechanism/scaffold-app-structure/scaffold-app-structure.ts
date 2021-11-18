import { noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { checkAppStructure } from '../../../shared/utils/lib-utils';
import {
  getDefaultProjectNameFromWorkspace,
  scaffoldStructure,
} from '../../../shared/utils/workspace-utils';

export function scaffoldAppStructure(): Rule {
  return (tree: Tree, context: SchematicContext): Rule => {
    const project = getDefaultProjectNameFromWorkspace(tree);

    const spartacusFeatureModuleExists = checkAppStructure(tree, project);
    if (!spartacusFeatureModuleExists) {
      context.logger.info('Scaffolding the new app structure...');
      context.logger.warn(
        'Please migrate manually the rest of your feature modules to the new app structure: https://sap.github.io/spartacus-docs/reference-app-structure/'
      );
    }

    return spartacusFeatureModuleExists
      ? noop()
      : scaffoldStructure({ project });
  };
}
