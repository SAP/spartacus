/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ProductEventBuilder } from './product-event.builder';

@NgModule({})
export class ProductEventModule {
  constructor(_productEventBuilder: ProductEventBuilder) {
    // Intentional empty constructor
  }
}
