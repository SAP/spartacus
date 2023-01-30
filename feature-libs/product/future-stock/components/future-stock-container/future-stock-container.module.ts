/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { FutureStockAccordionModule } from '../future-stock-accordion/future-stock-accordion.module';

import { FutureStockContainerComponent } from './future-stock-container.component';

@NgModule({
  imports: [CommonModule, I18nModule, FutureStockAccordionModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        FutureStockComponent: {
          component: FutureStockContainerComponent,
        },
      },
    }),
  ],
  declarations: [FutureStockContainerComponent],
  exports: [FutureStockContainerComponent],
})
export class FutureStockContainerModule {}
