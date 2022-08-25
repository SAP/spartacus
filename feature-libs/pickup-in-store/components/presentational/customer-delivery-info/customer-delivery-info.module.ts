/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { CustomerDeliveryInfoComponent } from './customer-delivery-info.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [CustomerDeliveryInfoComponent],
  exports: [CustomerDeliveryInfoComponent],
})
export class CustomerDeliveryInfoModule {}
