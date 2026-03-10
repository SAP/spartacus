/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { OpfTokenisationPaymentMethodsModule } from './opf-tokenisation-payment-methods/opf-tokenisation-payment-methods.module';
import { provideOutlet } from '@spartacus/storefront';
import { OpfTokenisationPaymentMethodsComponent } from './opf-tokenisation-payment-methods/opf-tokenisation-payment-methods.component';

@NgModule({
  imports: [OpfTokenisationPaymentMethodsModule],
  providers: [
    provideOutlet({
      id: 'cx-opf-checkout-before-payment-options',
      component: OpfTokenisationPaymentMethodsComponent,
    }),
  ],
})
export class OpfTokenisationComponentsModule {}
