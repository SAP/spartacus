/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { CardModule, DatePickerModule } from '@spartacus/storefront';
import { DeliveryModeDatePickerComponent } from './delivery-mode-date-picker/delivery-mode-date-picker.component';
import { OrderOverviewDeliveryDateComponent } from './order-overview-delivery-date/order-overview-delivery-date.component';

@NgModule({
  imports: [
    CommonModule,
    DatePickerModule,
    I18nModule,
    ReactiveFormsModule,
    CardModule,
  ],
  declarations: [
    DeliveryModeDatePickerComponent,
    OrderOverviewDeliveryDateComponent,
  ],
  exports: [
    DeliveryModeDatePickerComponent,
    OrderOverviewDeliveryDateComponent,
  ],
})
export class RequestedDeliveryDateComponentsModule {}
