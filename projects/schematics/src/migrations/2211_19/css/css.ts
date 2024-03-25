/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { CSS_V6_DOCS_URL } from '../../../shared/constants';

export function migrate(): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.logger.warn(
      `For a CSS migration guide, please visit this URL: ${CSS_V6_DOCS_URL}. Under the Installation and Upgrade header, select “Updating Composable Storefront” for version 2211, and then open “Changes to Styles in Composable Storefront 2211.`
    );
  };
}
