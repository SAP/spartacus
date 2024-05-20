/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RequestedDeliveryDateCoreModule } from '@spartacus/requested-delivery-date/core';
import { RequestedDeliveryDateOccModule } from '@spartacus/requested-delivery-date/occ';

@NgModule({
  imports: [RequestedDeliveryDateCoreModule, RequestedDeliveryDateOccModule],
})
export class RequestedDeliveryDateModule {}
