/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
        'Please migrate manually the rest of your feature modules to the new app structure: https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/31164ec95c7c4136b1d1a4a371cad3c7/3efc8ab2d99645169fbc81fc8afcc464.html'
      );
    }

    return spartacusFeatureModuleExists
      ? noop()
      : scaffoldStructure({ project });
  };
}
