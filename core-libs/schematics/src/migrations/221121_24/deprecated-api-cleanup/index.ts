/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule } from '@angular-devkit/schematics';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';
import { REMOVED_EXPORTS, REMOVED_MEMBERS } from './data';

export function migrate(): Rule {
  return (tree, context) => {
    migrateMethodPropertiesDeprecation(tree, context, REMOVED_MEMBERS);
    return removedPublicApiDeprecation(tree, context, REMOVED_EXPORTS);
  };
}
