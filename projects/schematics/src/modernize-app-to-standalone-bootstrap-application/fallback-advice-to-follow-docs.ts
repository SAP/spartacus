/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

/**
 * URL where to find the manual migration steps.
 */
export const DOCS_URL_FOR_MODERNIZING_STANDALONE_BOOTSTRAP =
  'https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/10a8bc7f635b4e3db6f6bb7880e58a7d/f33df55121a1426eacb600ca1246203d.html';

const FALLBACK_ADVICE_TO_FOLLOW_DOCS = `Could not complete this step automatically. To complete the migration, please follow the manual steps: ${DOCS_URL_FOR_MODERNIZING_STANDALONE_BOOTSTRAP}`;

/**
 * Prints an error message and a link to the manual migration steps.
 */
export function printErrorWithDocsForStandaloneBootstrap(
  message: string,
  context: SchematicContext
) {
  context.logger.error(`⚠️ ${message}`);
  context.logger.error(FALLBACK_ADVICE_TO_FOLLOW_DOCS);
}

/**
 * If the wrapped Rule throws an error, it logs the error and prints a link to manual migration docs.
 */
export function withFallbackDocsForStandaloneBootstrap(rule: Rule): Rule {
  return (tree: Tree, context: SchematicContext) => {
    try {
      return rule(tree, context);
    } catch (error) {
      printErrorWithDocsForStandaloneBootstrap(
        error instanceof Error ? error.message : 'Unknown error',
        context
      );
      return tree;
    }
  };
}
