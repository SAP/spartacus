/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FutureStockAccordionComponent } from './future-stock-accordion.component';
import { IconModule } from '@spartacus/storefront';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule],
  declarations: [FutureStockAccordionComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        FutureStockComponent: {
          component: FutureStockAccordionComponent,
        },
      },
    }),
  ],
  exports: [FutureStockAccordionComponent],
})
export class FutureStockAccordionModule {}
