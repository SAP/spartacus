/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderEntry } from '@spartacus/cart/base/root';
import { PointOfService } from '@spartacus/core';

export type DeliveryPointOfServiceItems = {
  name: string;
  storeDetails: PointOfService;
  value: Array<OrderEntry>;
};

export type DeliveryPointOfService = {
  name: string;
  value: Array<OrderEntry>;
  storeDetails: PointOfService;
};
