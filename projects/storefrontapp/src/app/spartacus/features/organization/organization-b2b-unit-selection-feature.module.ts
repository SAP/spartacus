/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { I18nConfig, provideConfig } from '@spartacus/core';
import {
  b2bUnitSelectionTranslationChunksConfig,
  b2bUnitSelectionTranslationsEn,
} from '@spartacus/organization/b2b-unit-selection/assets';
import { B2bUnitSelectionModule } from '@spartacus/organization/b2b-unit-selection';
import { B2bUnitSelectionRootModule } from '@spartacus/organization/b2b-unit-selection/root';

/**
 * Feature module for B2B Unit Selection.
 *
 */
@NgModule({
  imports: [B2bUnitSelectionRootModule, B2bUnitSelectionModule],
  providers: [
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
