/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  migrateMissingPackage,
  MissingPackageMigration,
} from '../../mechanism/missing-packages/missing-packages';

const MISSING_PACKAGE_DATA: MissingPackageMigration[] = [
  {
    package: '@commerce-storefront-toolset/checkout',
    comment: 'Checkout package missing',
  },
  {
    package: '@commerce-storefront-toolset/asm',
    comment: 'ASM package missing',
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    for (const migrationData of MISSING_PACKAGE_DATA) {
      migrateMissingPackage(tree, context, migrationData);
    }
  };
}
