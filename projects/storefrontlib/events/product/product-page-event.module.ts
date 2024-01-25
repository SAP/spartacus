/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ProductPageEventBuilder } from './product-page-event.builder';

@NgModule({})
export class ProductPageEventModule {
  constructor(_productPageEventBuilder: ProductPageEventBuilder) {
    // Intentional empty constructor
  }
}
