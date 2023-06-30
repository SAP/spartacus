/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  quoteTranslationChunksConfig,
  quoteTranslations,
} from '@spartacus/quote/assets';
import { provideConfig } from '@spartacus/core';
import { QuoteRootModule, QUOTE_FEATURE } from '@spartacus/quote/root';
import { QuoteConfig } from '@spartacus/quote/core';

@NgModule({
  imports: [QuoteRootModule],
  providers: [
    provideConfig(<QuoteConfig>{
      quote: {
        //TODO CHHI: Delete when decision has been taken about quote request dialog
        // tresholds: {
        //   sellerAutoApproval: 75000,
        //   requestInitiation: 25000,
        // },
      },
    }),
    provideConfig({
      featureModules: {
        [QUOTE_FEATURE]: {
          module: () => import('@spartacus/quote').then((m) => m.QuoteModule),
        },
      },
      i18n: {
        resources: quoteTranslations,
        chunks: quoteTranslationChunksConfig,
      },
    }),
  ],
})
export class QuoteFeatureModule {}
