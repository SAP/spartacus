/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ProductService } from '../facade/product.service';
import { MockProductService } from './mock-product.service';

/** Provides a default {@link MockProductService} for {@link ProductService}. */
@NgModule({
  providers: [{ provide: ProductService, useClass: MockProductService }],
})
export class ProductTestingModule {}
