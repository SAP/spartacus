/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { FutureStockAccordionComponent } from './future-stock-accordion.component';

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
