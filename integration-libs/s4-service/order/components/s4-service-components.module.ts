/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ServiceDetailsCardModule } from './order-summary/service-details-card.module';
import { RescheduleServiceOrderModule } from './reschedule-service-order/reschedule-service-order.module';
import { RescheduleServiceOrderHeadlineModule } from './reschedule-service-order-headline/reschedule-service-order-headline.module';
@NgModule({
  imports: [ServiceDetailsCardModule, RescheduleServiceOrderModule, RescheduleServiceOrderHeadlineModule],
})
export class S4ServiceComponentsModule {}
