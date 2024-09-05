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

@NgModule({
    imports: [CardModule, CommonModule, I18nModule, ServiceDetailsCardComponent],
    providers: [
        provideOutlet({
            id: OrderOutlets.SERVICE_DETAILS,
            component: ServiceDetailsCardComponent,
        }),
    ],
    exports: [ServiceDetailsCardComponent],
})
export class ServiceDetailsCardModule {}
