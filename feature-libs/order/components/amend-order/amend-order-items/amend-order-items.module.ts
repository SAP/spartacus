/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import {
  FormErrorsModule,
  ItemCounterModule,
  MediaModule,
} from '@spartacus/storefront';
import { CancelOrReturnItemsComponent } from './amend-order-items.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    MediaModule,
    ItemCounterModule,

    FormErrorsModule,
  ],
  declarations: [CancelOrReturnItemsComponent],
  exports: [CancelOrReturnItemsComponent],
})
export class AmendOrderItemsModule {}
