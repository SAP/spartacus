/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CartBaseComponentsModule } from '@commerce-storefront-toolset/cart/base/components';
import { CartBaseCoreModule } from '@commerce-storefront-toolset/cart/base/core';
import { CartBaseOccModule } from '@commerce-storefront-toolset/cart/base/occ';

@NgModule({
  imports: [CartBaseCoreModule, CartBaseOccModule, CartBaseComponentsModule],
})
export class CartBaseModule {}
