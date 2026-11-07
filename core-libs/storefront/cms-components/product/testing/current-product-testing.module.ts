/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CurrentProductService } from '../current-product.service';
import { MockCurrentProductService } from './mock-current-product.service';

/** Provides a default {@link MockCurrentProductService} for {@link CurrentProductService}. */
@NgModule({
  providers: [
    { provide: CurrentProductService, useClass: MockCurrentProductService },
  ],
})
export class CurrentProductTestingModule {}
