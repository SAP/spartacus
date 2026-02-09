/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { OpfTokenisationPaymentMethodsModule } from './opf-tokenisation-payment-methods/opf-tokenisation-payment-methods.module';

@NgModule({
  imports: [OpfTokenisationPaymentMethodsModule],
})
export class OpfTokenisationComponentsModule {}
