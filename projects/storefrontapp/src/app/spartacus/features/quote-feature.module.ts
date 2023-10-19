/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import {
  quoteTranslationChunksConfig,
  quoteTranslations,
} from '@spartacus/quote/assets';
import {
  QUOTE_AWARE_FEATURE,
  QUOTE_FEATURE,
  QUOTE_REQUEST_FEATURE,
  QuoteRootModule,
} from '@spartacus/quote/root';

@NgModule({
  imports: [QuoteRootModule],
  providers: [
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
    provideConfig({
      featureModules: {
        [QUOTE_AWARE_FEATURE]: {
          module: () =>
            import('@spartacus/quote/components/aware').then(
              (m) => m.QuoteAwareComponentModule
            ),
        },
      },
    }),
    provideConfig({
      featureModules: {
        [QUOTE_REQUEST_FEATURE]: {
          module: () =>
            import('@spartacus/quote/components/request-button').then(
              (m) => m.QuoteRequestButtonModule
            ),
        },
      },
    }),
  ],
})
export class QuoteFeatureModule {}
