/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { isSsrUsed } from '../../../shared/utils/package-utils';
import { updateServerFile } from './update-ssr/update-server-files';

export function migrate(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return isSsrUsed(tree) ? updateServerFile() : noop();
  };
}
