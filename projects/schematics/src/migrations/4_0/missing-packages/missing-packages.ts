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
    comment:
      "We've found imports from @commerce-storefront-toolset/checkout package which is not installed. If you are using the checkout feature you can configure it by running schematics `ng add @commerce-storefront-toolset/checkout`. If you only need to install package add it with npm (`npm i @commerce-storefront-toolset/checkout`) or yarn (`yarn add @commerce-storefront-toolset/checkout`). If you are not using checkout package check why you have imports from this library.",
  },
  {
    package: '@commerce-storefront-toolset/asm',
    comment:
      "We've found imports from @commerce-storefront-toolset/asm package which is not installed. If you are using the ASM feature you can configure it by running schematics `ng add @commerce-storefront-toolset/asm`. If you only need to install package add it with npm (`npm i @commerce-storefront-toolset/asm`) or yarn (`yarn add @commerce-storefront-toolset/asm`). If you are not using ASM package check why you have imports from this library.",
  },
  {
    package: '@commerce-storefront-toolset/user',
    comment:
      "We've found imports from @commerce-storefront-toolset/user package which is not installed. If you are using the user features (account/profile) you can configure it by running schematics `ng add @commerce-storefront-toolset/user`. If you only need to install package add it with npm (`npm i @commerce-storefront-toolset/user`) or yarn (`yarn add @commerce-storefront-toolset/user`). If you are not using user package check why you have imports from this library.",
  },
  {
    package: '@commerce-storefront-toolset/tracking',
    comment:
      "We've found imports from @commerce-storefront-toolset/tracking package which is not installed. If you are using the tracking features (personalization, tag managers integration) you can configure it by running schematics `ng add @commerce-storefront-toolset/tracking`. If you only need to install package add it with npm (`npm i @commerce-storefront-toolset/tracking`) or yarn (`yarn add @commerce-storefront-toolset/tracking`). If you are not using tracking package check why you have imports from this library.",
  },
  {
    package: '@commerce-storefront-toolset/smartedit',
    comment:
      "We've found imports from @commerce-storefront-toolset/smartedit package which is not installed. If you are using the Smartedit feature you can configure it by running schematics `ng add @commerce-storefront-toolset/smartedit`. If you only need to install package add it with npm (`npm i @commerce-storefront-toolset/smartedit`) or yarn (`yarn add @commerce-storefront-toolset/smartedit`). If you are not using Smartedit package check why you have imports from this library.",
  },
  {
    package: '@commerce-storefront-toolset/qualtrics',
    comment:
      "We've found imports from @commerce-storefront-toolset/qualtrics package which is not installed. If you are using the Qualtrics feature you can configure it by running schematics `ng add @commerce-storefront-toolset/qualtrics`. If you only need to install package add it with npm (`npm i @commerce-storefront-toolset/qualtrics`) or yarn (`yarn add @commerce-storefront-toolset/qualtrics`). If you are not using Qualtrics package check why you have imports from this library.",
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    for (const migrationData of MISSING_PACKAGE_DATA) {
      migrateMissingPackage(tree, context, migrationData);
    }
  };
}
