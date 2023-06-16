/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  commerceQuotesTranslationChunksConfig,
  commerceQuotesTranslations,
} from '@spartacus/commerce-quotes/assets';
import { provideConfig } from '@spartacus/core';
import {
  CommerceQuotesRootModule,
  COMMERCE_QUOTES_FEATURE,
} from '@spartacus/commerce-quotes/root';
import { QuoteConfig } from '@spartacus/commerce-quotes/core';

@NgModule({
  imports: [CommerceQuotesRootModule],
  providers: [
    provideConfig(<QuoteConfig>{
      commerceQuotes: {
        tresholds: {
          sellerAutoApproval: 75000,
          requestInitiation: 25000,
        },
      },
    }),
    provideConfig({
      featureModules: {
        [COMMERCE_QUOTES_FEATURE]: {
          module: () =>
            import('@spartacus/commerce-quotes').then(
              (m) => m.CommerceQuotesModule
            ),
        },
      },
      i18n: {
        resources: commerceQuotesTranslations,
        chunks: commerceQuotesTranslationChunksConfig,
      },
    }),
  ],
})
export class CommerceQuotesFeatureModule {}
