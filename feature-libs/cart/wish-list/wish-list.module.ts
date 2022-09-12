/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { WishListComponentsModule } from '@commerce-storefront-toolset/cart/wish-list/components';
import { WishListCoreModule } from '@commerce-storefront-toolset/cart/wish-list/core';

@NgModule({
  imports: [WishListComponentsModule, WishListCoreModule],
})
export class WishListModule {}
