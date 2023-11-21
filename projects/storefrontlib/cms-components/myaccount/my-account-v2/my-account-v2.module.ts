/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { MyAccountV2NavigationModule } from './my-account-v2-navigation';
import { MyAccountV2PaymentMethodsModule } from './my-account-v2-payment-methods/my-account-v2-payment-methods.module';

@NgModule({
  imports: [MyAccountV2NavigationModule, MyAccountV2PaymentMethodsModule],
})
export class MyAccountV2Module {}
