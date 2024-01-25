/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { QuickOrderComponentsModule } from '@spartacus/cart/quick-order/components';
import { QuickOrderCoreModule } from '@spartacus/cart/quick-order/core';

@NgModule({
  imports: [QuickOrderCoreModule, QuickOrderComponentsModule],
})
export class QuickOrderModule {}
