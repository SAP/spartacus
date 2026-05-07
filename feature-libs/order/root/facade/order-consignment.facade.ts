/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Order } from '../model/order.model';
import { Consignment } from '@spartacus/order/root';
import { OrderEntry } from '@spartacus/cart/base/root';
import { HierarchyNode } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
})
export abstract class OrderConsignmentFacade {
  /**
   * Associates entry groups from the order with corresponding consignments.
   *
   * @param order The order containing the entry groups.
   * @param consignments The list of consignments to be enriched with entry groups.
   * @returns An updated list of consignments, each containing its related entry groups.
   */
  abstract assignEntryGroupsToConsignments(
    order: Order,
    consignments: Consignment[]
  ): Consignment[];

  /**
   * Processes unconsigned entries for a given order, generating filtered entries and hierarchy trees.
   *
   * @param order The order containing entryGroups.
   * @param unconsignedEntries The unconsigned entries to process.
   * @returns An object containing filtered entries and generated hierarchy trees for pickup and delivery.
   */
  abstract processUnconsignedEntries(
    order: Order,
    unconsignedEntries: { pickup: OrderEntry[]; delivery: OrderEntry[] }
  ): {
    pickup: {
      filteredEntries: OrderEntry[];
      hierarchyTrees: HierarchyNode[];
    };
    delivery: {
      filteredEntries: OrderEntry[];
      hierarchyTrees: HierarchyNode[];
    };
  };

  /**
   * Processes shipping entries for a given order, generating filtered entries and hierarchy trees.
   *
   * @param order The order containing entryGroups.
   * @param shippingEntries The shipping entries to process.
   * @returns An object containing filtered entries and generated hierarchy trees.
   */
  abstract processShippingEntries(
    order: Order,
    shippingEntries: OrderEntry[]
  ): {
    filteredEntries: OrderEntry[];
    hierarchyTrees: HierarchyNode[];
  };
}
