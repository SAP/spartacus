/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { defaultB2bUnitSelectionConfig } from './config/default-b2b-unit-selection-config';
import { ORGANIZATION_B2B_UNIT_SELECTION_FEATURE } from './feature-name';
// Side-effect import: ensures the LAUNCH_CALLER extension is registered at application startup.
import './model/augmented-core.model';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultB2bUnitSelectionComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [ORGANIZATION_B2B_UNIT_SELECTION_FEATURE]: {
        cmsComponents: ['B2bUnitSelectorComponent'],
      },
    },
  };
  return config;
}

@NgModule({
  providers: [
    provideDefaultConfig(defaultB2bUnitSelectionConfig),
    provideDefaultConfigFactory(defaultB2bUnitSelectionComponentsConfig),
  ],
})
export class B2bUnitSelectionRootModule {}
