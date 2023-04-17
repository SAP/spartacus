/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OpfVerifyPaymentComponent } from './opf-verify-payment.component';

@NgModule({
  declarations: [OpfVerifyPaymentComponent],
  imports: [CommonModule],
  // providers: [
  //   provideDefaultConfig(<CmsConfig>{
  //     cmsComponents: {
  //       OpfVerifyPaymentComponent: {
  //         component: OpfVerifyPaymentComponent,
  //       },
  //     },
  //   }),
  // ],
  exports: [OpfVerifyPaymentComponent],
})
export class OpfVerifyPaymentModule {}
