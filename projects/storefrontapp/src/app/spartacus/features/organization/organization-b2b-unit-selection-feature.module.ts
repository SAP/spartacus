/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  b2bUnitSelectionTranslationChunksConfig,
  b2bUnitSelectionTranslationsEn,
} from '@spartacus/organization/b2b-unit-selection/assets';
import {
  B2bUnitSelectionRootModule,
  ORGANIZATION_B2B_UNIT_SELECTION_FEATURE,
} from '@spartacus/organization/b2b-unit-selection/root';

@NgModule({
  imports: [B2bUnitSelectionRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [ORGANIZATION_B2B_UNIT_SELECTION_FEATURE]: {
          module: () =>
            import('@spartacus/organization/b2b-unit-selection').then(
              (m) => m.B2bUnitSelectionModule
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: b2bUnitSelectionTranslationsEn,
        },
        chunks: b2bUnitSelectionTranslationChunksConfig,
      },
    }),
  ],
})
export class OrganizationB2bUnitSelectionFeatureModule {}
