/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { modifyAppServerModuleFile } from '../../../add-ssr/index';
import { checkIfSSRIsUsed } from '../../../shared/utils/package-utils';

export function migrate(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return checkIfSSRIsUsed(tree) ? modifyAppServerModuleFile() : noop();
  };
}
