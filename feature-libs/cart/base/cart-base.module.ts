/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CartBaseComponentsModule } from '@spartacus/cart/base/components';
import { CartBaseCoreModule } from '@spartacus/cart/base/core';
import { CartBaseOccModule } from '@spartacus/cart/base/occ';

@NgModule({
  imports: [CartBaseCoreModule, CartBaseOccModule, CartBaseComponentsModule],
})
export class CartBaseModule {}
