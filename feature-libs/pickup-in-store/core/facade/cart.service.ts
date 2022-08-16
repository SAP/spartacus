/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CartFacade } from '@spartacus/pickup-in-store/root';

@Injectable()
export class CartService implements CartFacade {
  getPickupOption(_productCode: string): void {}
}
