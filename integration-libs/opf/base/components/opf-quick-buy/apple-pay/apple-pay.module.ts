/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApplePayButtonComponent } from './apple-pay-button/apple-pay-button.component';
import { ApplePaySessionFactory } from './apple-pay-session/apple-pay-session.factory';
import { ApplePayService } from './apple-pay.service';
import { ApplePayObservableFactory } from './observable/apple-pay-observable.factory';

@NgModule({
  imports: [CommonModule],
  declarations: [ApplePayButtonComponent],
  providers: [
    ApplePayService,
    ApplePayObservableFactory,
    ApplePaySessionFactory,
  ],
  exports: [ApplePayButtonComponent],
})
export class OpfApplePayModule {}
