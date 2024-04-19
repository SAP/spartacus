/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SchematicsException } from '@angular-devkit/schematics';
import { featureSchematicConfigMapping } from '../schematics-config-mappings';

/**
 * Returns the configured dependencies for the given feature.
 */
export function getConfiguredDependencies(feature: string): string[] {
  const featureConfig = featureSchematicConfigMapping.get(feature);
  if (!featureConfig) {
    throw new SchematicsException(`No feature config found for ${feature}.`);
  }

  return featureConfig.dependencyFeatures ?? [];
}
