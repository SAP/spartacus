/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { ProductPageEventBuilder } from './product-page-event.builder';

@NgModule({
  providers: [
    provideAppInitializer(() => {
      inject(ProductPageEventBuilder);
    }),
  ],
})
export class ProductPageEventModule {}
