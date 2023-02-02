/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';
import { CartBaseModule } from '@spartacus/cart/base';
import { PickupInStoreCartModule } from '@spartacus/pickup-in-store/base/cart';
import { environment } from '../../../../environments/environment';

const extensions: Type<any>[] = [];

if (environment.pickupInStore) {
  extensions.push(PickupInStoreCartModule);
}

@NgModule({
  imports: [CartBaseModule, ...extensions],
})
export class CartBaseWrapperModule {}
