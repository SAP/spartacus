/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  quoteTranslationChunksConfig,
  quoteTranslations,
} from 'feature-libs/quote/assets/public_api';
import { provideConfig } from '@spartacus/core';
import {
  QuoteRootModule,
  QUOTE_FEATURE,
} from 'feature-libs/quote/root/public_api';
import { QuoteConfig } from 'feature-libs/quote/core/public_api';

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
            import('feature-libs/quote/public_api').then(
              (m) => m.QuoteModule
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
