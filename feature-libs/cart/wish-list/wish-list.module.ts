/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { WishListComponentsModule } from '@spartacus/cart/wish-list/components';
import { WishListCoreModule } from '@spartacus/cart/wish-list/core';

@NgModule({
  imports: [WishListComponentsModule, WishListCoreModule],
})
export class WishListModule {}
