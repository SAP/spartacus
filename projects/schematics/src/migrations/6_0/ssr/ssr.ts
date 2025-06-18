/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { modifyAppServerModuleFile } from '../../../add-ssr/index';
import { isUsingLegacyServerBuilder as isOldSsrUsed } from '../../../shared/utils/package-utils';

export function migrate(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return isOldSsrUsed(tree) ? modifyAppServerModuleFile() : noop();
  };
}
