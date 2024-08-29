/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { DeliveryMode } from '@spartacus/cart/base/root';

@Injectable()
export class OrderOverviewComponentService {
  showDeliveryMode(mode: DeliveryMode | undefined): boolean {
    return mode !== undefined;
  }
}
