/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { I18nConfig, provideConfig } from '@spartacus/core';
import {
  estimatedDeliveryDateTranslationChunksConfig,
  estimatedDeliveryDateTranslations,
} from '@spartacus/estimated-delivery-date/assets';
import { EstimatedDeliveryDateRootModule } from '@spartacus/estimated-delivery-date/root';

@NgModule({
  imports: [EstimatedDeliveryDateRootModule],
  providers: [
    provideConfig(<I18nConfig>{
      i18n: {
        resources: estimatedDeliveryDateTranslations,
        chunks: estimatedDeliveryDateTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class EstimatedDeliveryDateFeatureModule {}
