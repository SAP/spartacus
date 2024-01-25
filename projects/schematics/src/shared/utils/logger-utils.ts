/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

/**
 * Logs the provided message if the debug option is set to true.
 */
export function debugLogRule(message: string, debug?: boolean): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    if (debug) {
      context.logger.info(message);
    }
  };
}

/**
 * Formats the given message.
 */
export function formatFeatureStart(feature: string, message: string): string {
  return `⌛️ ${feature}: ${message}`;
}

/**
 * Formats the given message.
 */
export function formatFeatureComplete(
  feature: string,
  message: string
): string {
  return `✅ ${feature}: ${message}`;
}
