/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { updateServerFiles } from '../../mechanism/update-ssr/update-ssr-files';

export function migrate(): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    return updateServerFiles();
  };
}
