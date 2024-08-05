/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ServiceDetailsCardModule } from './order-summary/service-details-card.module';
import { RescheduleServiceOrderModule } from './reschedule-service-order/reschedule-service-order.module';
import { S4ServiceOrderDetailActionsModule } from './s4-service-order-detail-actions/s4-service-order-detail-actions.module';
@NgModule({
  imports: [ServiceDetailsCardModule, RescheduleServiceOrderModule, S4ServiceOrderDetailActionsModule],
})
export class S4ServiceComponentsModule {}
