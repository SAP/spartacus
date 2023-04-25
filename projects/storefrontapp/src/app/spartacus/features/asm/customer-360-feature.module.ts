/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  Customer360RootModule,
  CUSTOMER_360_FEATURE,
} from '@spartacus/asm/customer-360/root';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  customer360TranslationChunksConfig,
  customer360Translations,
} from 'feature-libs/asm/customer-360/assets/public_api';

@NgModule({
  imports: [Customer360RootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [CUSTOMER_360_FEATURE]: {
          module: () =>
            import('@spartacus/asm/customer-360').then(
              (m) => m.Customer360Module
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: customer360Translations,
        chunks: customer360TranslationChunksConfig,
      },
    }),
  ],
})
export class Customer360FeatureModule {}
