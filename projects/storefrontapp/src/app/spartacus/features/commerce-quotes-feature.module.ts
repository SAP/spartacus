/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  quoteTranslationChunksConfig,
  quoteTranslations,
} from '@spartacus/commerce-quotes/assets';
import { provideConfig } from '@spartacus/core';
import {
  QuoteRootModule,
  QUOTE_FEATURE,
} from '@spartacus/commerce-quotes/root';
import { QuoteConfig } from '@spartacus/commerce-quotes/core';

@NgModule({
  imports: [QuoteRootModule],
  providers: [
    provideConfig(<QuoteConfig>{
      quote: {
        tresholds: {
          sellerAutoApproval: 75000,
          requestInitiation: 25000,
        },
      },
    }),
    provideConfig({
      featureModules: {
        [QUOTE_FEATURE]: {
          module: () =>
            import('@spartacus/commerce-quotes').then(
              (m) => m.CommerceQuotesModule
            ),
        },
      },
      i18n: {
        resources: quoteTranslations,
        chunks: quoteTranslationChunksConfig,
      },
    }),
  ],
})
export class CommerceQuotesFeatureModule {}
