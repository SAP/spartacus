/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, Tree } from '@angular-devkit/schematics';
import { RenamedSymbol } from '../../../shared/utils/file-utils';
import { migrateRenamedSymbols } from '../../mechanism/rename-symbol/rename-symbol';
import { CHECKOUT_RENAMED_SYMBOLS_DATA } from './checkout-rename-symbol';

export const RENAMED_SYMBOLS_DATA: RenamedSymbol[] = [
  ...CHECKOUT_RENAMED_SYMBOLS_DATA,
];

export function migrate(): Rule {
  return (tree: Tree) => {
    return migrateRenamedSymbols(tree, RENAMED_SYMBOLS_DATA);
  };
}
