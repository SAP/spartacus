/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { SavedCartComponentsModule } from '@spartacus/cart/saved-cart/components';
import { SavedCartCoreModule } from '@spartacus/cart/saved-cart/core';
import { SavedCartOccModule } from '@spartacus/cart/saved-cart/occ';

@NgModule({
  imports: [SavedCartCoreModule, SavedCartOccModule, SavedCartComponentsModule],
})
export class SavedCartModule {}
