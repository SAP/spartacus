/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SavedCartAdapter } from '@spartacus/cart/saved-cart/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { OccSavedCartAdapter } from './adapters/occ-saved-cart.adapter';
import { defaultOccSavedCartConfigFactory } from './config/default-occ-saved-cart-config-factory';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfigFactory(defaultOccSavedCartConfigFactory),
    {
      provide: SavedCartAdapter,
      useClass: OccSavedCartAdapter,
    },
  ],
})
export class SavedCartOccModule {}
