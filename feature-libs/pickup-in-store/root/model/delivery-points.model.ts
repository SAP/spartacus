/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderEntry, OrderEntryGroup } from '@spartacus/cart/base/root';
import { PointOfService } from '@spartacus/core';
import { HierarchyNode } from '@spartacus/storefront';

export type DeliveryPointOfServiceItems = {
  name: string;
  storeDetails: PointOfService;
  value: Array<OrderEntry>;
};

export type DeliveryPointOfService = {
  name: string;
  value: Array<OrderEntry>;
  storeDetails: PointOfService;
  entryGroups?: OrderEntryGroup[];
  hierachyTrees?: HierarchyNode<any, any>[];
};
