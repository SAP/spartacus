/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { DeliveryMode } from '@spartacus/cart/base/root';
import { OrderOverviewComponentService } from '@spartacus/order/components';
import { S4ServiceDeliveryModeConfig } from '@spartacus/s4-service/root';

@Injectable()
export class ServiceOrderOverviewComponentService extends OrderOverviewComponentService {
  protected config = inject(S4ServiceDeliveryModeConfig);
  shouldShowDeliveryMode(mode: DeliveryMode | undefined): boolean {
    return mode?.code === this.config.s4ServiceDeliveryMode?.code
      ? false
      : super.shouldShowDeliveryMode(mode);
  }
}
