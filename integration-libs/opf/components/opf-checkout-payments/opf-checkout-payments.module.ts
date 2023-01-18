/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpfCheckoutPaymentsComponent } from './opf-checkout-payments.component';
import { I18nModule } from '@spartacus/core';

@NgModule({
  declarations: [OpfCheckoutPaymentsComponent],
  exports: [OpfCheckoutPaymentsComponent],
  imports: [CommonModule, I18nModule],
})
export class OpfCheckoutPaymentsModule {}
