/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApplePaySessionFactory } from './apple-pay-session/apple-pay-session.factory';
import { ApplePayComponent } from './apple-pay.component';
import { ApplePayService } from './apple-pay.service';
import { ApplePayObservableFactory } from './observable/apple-pay-observable.factory';

@NgModule({
  imports: [CommonModule],
  declarations: [ApplePayComponent],
  providers: [
    ApplePayService,
    ApplePayObservableFactory,
    ApplePaySessionFactory,
  ],
  exports: [ApplePayComponent],
})
export class OpfApplePayModule {}
