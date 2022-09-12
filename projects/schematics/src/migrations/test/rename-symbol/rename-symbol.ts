/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, Tree } from '@angular-devkit/schematics';
import {
  ASM_AUTH_HTTP_HEADER_SERVICE,
  CS_AGENT_AUTH_SERVICE,
} from '../../../shared/constants';
import { SPARTACUS_ASM, SPARTACUS_CORE } from '../../../shared/libs-constants';
import { RenamedSymbol } from '../../../shared/utils/file-utils';
import { migrateRenamedSymbols } from '../../mechanism/rename-symbol/rename-symbol';

export const RENAMED_SYMBOLS_DATA: RenamedSymbol[] = [
  {
    // 1) For import change
    previousNode: 'OtherComponent1',
    previousImportPath: '@commerce-storefront-toolset/storefront',
    newImportPath: '@commerce-storefront-toolset/storefinder/components',
  },
  {
    // 2) For import and rename change with alias
    previousNode: 'OtherComponent2',
    previousImportPath: '@commerce-storefront-toolset/storefront',
    newNode: 'OtherComponentTest2',
    newImportPath: '@commerce-storefront-toolset/storefinder/components',
  },
  {
    // 3) For import and rename change
    previousNode: 'OtherComponent3',
    previousImportPath: '@commerce-storefront-toolset/storefront',
    newNode: 'OtherComponentTest3',
    newImportPath: '@commerce-storefront-toolset/storefinder/components',
  },
  {
    // 4) For name change
    previousNode: 'OtherComponent4',
    previousImportPath: '@commerce-storefront-toolset/storefront',
    newNode: 'OtherComponentTest4',
  },
  // projects/core/src/asm/services/asm-auth-http-header.service.ts
  {
    previousNode: ASM_AUTH_HTTP_HEADER_SERVICE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/root`,
  },
  // projects/core/src/asm/facade/csagent-auth.service.ts
  {
    previousNode: CS_AGENT_AUTH_SERVICE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/root`,
  },
];

export function migrate(): Rule {
  return (tree: Tree) => {
    return migrateRenamedSymbols(tree, RENAMED_SYMBOLS_DATA);
  };
}
