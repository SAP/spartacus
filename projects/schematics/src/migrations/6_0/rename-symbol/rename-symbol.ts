/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, Tree } from '@angular-devkit/schematics';
import { migrateRenamedSymbols } from '../../mechanism/rename-symbol/rename-symbol';
import { GENERATED_RENAMED_SYMBOLS_DATA } from './data/generated-rename-symbol.migration';

export function migrate(): Rule {
  return (tree: Tree) => {
    return migrateRenamedSymbols(tree, GENERATED_RENAMED_SYMBOLS_DATA);
  };
}
