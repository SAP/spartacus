/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';
import { GENERATED_REMOVED_PUBLIC_API_DATA } from './data/generated-removed-public-api.migration';

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(
      tree,
      context,
      GENERATED_REMOVED_PUBLIC_API_DATA
    );
  };
}
