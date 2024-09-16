/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CardModule, provideOutlet } from '@spartacus/storefront';
import { CommonModule } from '@angular/common';
import { I18nModule } from '@spartacus/core';
import { ServiceDetailsCardComponent } from './service-details-card.component';
import { OrderOutlets } from '@spartacus/order/root';
import { ServiceOrderOverviewComponentService } from './service-order-overview-component.service';
import { OrderOverviewComponentService } from '@spartacus/order/components';

@NgModule({
  imports: [CardModule, CommonModule, I18nModule],
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
  declarations: [ServiceDetailsCardComponent],
})
export class ServiceDetailsCardModule {}
