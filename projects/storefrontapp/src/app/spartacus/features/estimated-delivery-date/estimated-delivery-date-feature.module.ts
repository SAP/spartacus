/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { I18nConfig, provideConfig } from '@spartacus/core';
import {
  estimatedDeliveryDateTranslationChunksConfig,
  estimatedDeliveryDateTranslations
} from 'feature-libs/estimated-delivery-date/assets/public_api';
import {EstimatedDeliveryDateRootModule} from 'feature-libs/estimated-delivery-date/root/public_api';

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
