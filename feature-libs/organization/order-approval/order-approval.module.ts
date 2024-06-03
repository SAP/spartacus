/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OrderApprovalComponentsModule } from './components/order-approval-components.module';
import { OrderApprovalCoreModule } from './core/order-approval-core.module';
import { OrderApprovalOccModule } from './occ/order-approval-occ.module';

@NgModule({
  imports: [
    OrderApprovalCoreModule.forRoot(),
    OrderApprovalOccModule,
    OrderApprovalComponentsModule,
  ],
})
export class OrderApprovalModule {}
