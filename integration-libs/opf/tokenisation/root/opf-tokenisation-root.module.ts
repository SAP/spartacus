/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { OPF_TOKENISATION_FEATURE } from './feature-name';
import { NgModule } from '@angular/core';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { OpfCheckoutOutlets } from '@spartacus/opf/checkout/root';
import { OpfTokenisationSavedCardsToggleComponent } from './components/opf-tokenisation-saved-cards-toggle/opf-tokenisation-saved-cards-toggle.component';
import { OpfTokenisationNewPaymentsHeadingComponent } from './components/opf-tokenisation-new-payments-heading/opf-tokenisation-new-payments-heading.component';
import { OpfTokenisationPaymentMethodComponent } from '@spartacus/opf/tokenisation/components';

export function defaultOpfTokenisationCmsComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [OPF_TOKENISATION_FEATURE]: {
        cmsComponents: ['AccountPaymentDetailsComponent'],
      },
    },
  };
  return config;
}

@NgModule({
  providers: [
    provideDefaultConfigFactory(defaultOpfTokenisationCmsComponentsConfig),
    provideOutlet({
      id: OpfCheckoutOutlets.OPF_CHECKOUT_BEFORE_PAYMENT_OPTIONS,
      component: OpfTokenisationSavedCardsToggleComponent,
      position: OutletPosition.BEFORE,
    }),
    provideOutlet({
      id: OpfCheckoutOutlets.OPF_CHECKOUT_BEFORE_PAYMENT_OPTIONS,
      component: OpfTokenisationPaymentMethodComponent,
      position: OutletPosition.AFTER,
    }),
    provideOutlet({
      id: OpfCheckoutOutlets.OPF_CHECKOUT_BEFORE_PAYMENT_OPTIONS,
      component: OpfTokenisationNewPaymentsHeadingComponent,
      position: OutletPosition.AFTER,
    }),
  ],
})
export class OpfTokenisationRootModule {}
