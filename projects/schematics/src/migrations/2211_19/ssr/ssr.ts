/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { isUsingLegacyServerBuilder as isOldSsrUsed } from '../../../shared/utils/package-utils';
import { updateServerFiles } from '../update-ssr/update-ssr-files';

export function migrate(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return isOldSsrUsed(tree) ? updateServerFiles() : noop();
  };
}
