/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { OrderGridComponent } from './order-grid.component';

@NgModule({
  imports: [CommonModule],
  declarations: [OrderGridComponent],
  entryComponents: [OrderGridComponent],
  exports: [OrderGridComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductOrderGridTabComponent: {
          component: OrderGridComponent,
        },
      },
    }),
  ],
})
export class OrderGridModule {}
