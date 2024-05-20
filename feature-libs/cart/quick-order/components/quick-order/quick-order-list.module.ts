/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  AtMessageModule,
  FormErrorsModule,
  IconModule,
  ItemCounterModule,
  MediaModule,
  MessageComponentModule,
  ProgressButtonModule,
} from '@spartacus/storefront';
import { QuickOrderComponent } from './quick-order.component';
import { QuickOrderFormComponent } from './form/quick-order-form.component';
import { QuickOrderItemComponent } from './table/item/quick-order-item.component';
import { QuickOrderTableComponent } from './table/quick-order-table.component';

@NgModule({
  imports: [
    AtMessageModule,
    CommonModule,
    FormErrorsModule,
    I18nModule,
    IconModule,
    ItemCounterModule,
    MediaModule,
    MessageComponentModule,
    ProgressButtonModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuickOrderComponent: {
          component: QuickOrderComponent,
          data: {
            quickOrderListLimit: 10,
          },
        },
      },
    }),
  ],
  declarations: [
    QuickOrderComponent,
    QuickOrderFormComponent,
    QuickOrderItemComponent,
    QuickOrderTableComponent,
  ],
  exports: [
    QuickOrderComponent,
    QuickOrderFormComponent,
    QuickOrderItemComponent,
    QuickOrderTableComponent,
  ],
})
export class QuickOrderListModule {}
