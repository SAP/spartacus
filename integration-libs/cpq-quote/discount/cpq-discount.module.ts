/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { quoteOutlet } from '@spartacus/cart/base/root';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { CpqQuoteHeadingComponent } from './cpq-quote-heading/cpq-quote-heading.component';
import { CpqQuoteDiscountComponent } from './cpq-quote-discount-tbody/cpq-quote.component';

// export function defaultCpqQuoteComponentsConfig() {
//   return {
//     featureModules: {
//       [CPQ_QUOTE_FEATURE_NAME]: {
//         cmsComponents: [
//           'CpqQuoteHeadingComponent',
//           'CpqQuoteDiscountComponent',
//         ],
//       },
//     },
//   };
// }
import { CommonModule } from '@angular/common';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, IconModule],

  providers: [
    provideOutlet({
      id: quoteOutlet.CPQ_QUOTE_MODULE,
      position: OutletPosition.AFTER,
      component: CpqQuoteDiscountComponent,
    }),
    provideOutlet({
      id: quoteOutlet.CPQ_QUOTE_HEADING,
      position: OutletPosition.AFTER,
      component: CpqQuoteHeadingComponent,
    }),

    // provideDefaultConfigFactory(defaultCpqQuoteComponentsConfig),
  ],
  declarations:[CpqQuoteHeadingComponent,CpqQuoteDiscountComponent],

  exports:[CpqQuoteHeadingComponent,CpqQuoteDiscountComponent]
})
export class CpqDiscountModule {

  constructor(){
    console.log("cpq-discount");
  }
}
