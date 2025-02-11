/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

/**
 * URL where to find the manual migration steps.
 */
export const DOCS_URL_FOR_MODERNIZING_APPS_MIGRATED_FROM_6_8_TO_2211_19 =
  'https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/10a8bc7f635b4e3db6f6bb7880e58a7d/525dd86b812544249e78d73f67f3e6ed.html';

const FALLBACK_ADVICE_TO_FOLLOW_DOCS = `Could not complete this step automatically. To complete the migration, please follow the manual steps: ${DOCS_URL_FOR_MODERNIZING_APPS_MIGRATED_FROM_6_8_TO_2211_19}`;

/**
 * Prints an error message and a link to the manual migration steps.
 */
export function printErrorWithDocsForMigrated_6_8_To_2211_19(
  message: string,
  context: SchematicContext
) {
  context.logger.error(`⚠️ ${message}`);
  context.logger.error(FALLBACK_ADVICE_TO_FOLLOW_DOCS);
}

/**
 * If the wrapped Rule throws an error, it logs the error and prints a link to manual migration docs.
 */
export function withFallbackDocsForMigrated_6_8_To_2211_19(rule: Rule): Rule {
  return (tree: Tree, context: SchematicContext) => {
    try {
      return rule(tree, context);
    } catch (error) {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        error instanceof Error ? error.message : 'Unknown error',
        context
      );
      return tree;
    }
  };
}
