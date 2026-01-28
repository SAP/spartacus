/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { OrderOverviewComponentService } from '@spartacus/order/components';
import { OrderOutlets } from '@spartacus/order/root';
import { CardModule, provideOutlet } from '@spartacus/storefront';
import { ServiceDetailsCardComponent } from './service-details-card.component';
import { ServiceOrderOverviewComponentService } from './service-order-overview-component.service';

@NgModule({
  imports: [CardModule, CommonModule, I18nModule, ServiceDetailsCardComponent],
  providers: [
    ServiceOrderOverviewComponentService,
    {
      provide: OrderOverviewComponentService,
      useExisting: ServiceOrderOverviewComponentService,
    },
    provideOutlet({
      id: OrderOutlets.SERVICE_DETAILS,
      component: ServiceDetailsCardComponent,
    }),
  ],
  exports: [ServiceDetailsCardComponent],
})
export class ServiceDetailsCardModule {}
