import { Injectable } from '@angular/core';
import { OrderEntry, OrderEntryGroup } from '@spartacus/cart/base/root';
import {
  Consignment,
  Order,
  OrderConsignmentFacade,
} from '@spartacus/order/root';
import {
  CollapsibleNode,
  HierarchyComponentService,
  HierarchyNode,
} from '@spartacus/storefront';

@Injectable()
export class OrderConsignmentService implements OrderConsignmentFacade {
  constructor(protected hierarchyService: HierarchyComponentService) {}

  processShippingEntries(order: Order, shippingEntries: OrderEntry[]): {
    filteredEntries: OrderEntry[];
    hierarchyTrees: HierarchyNode[];
  } {
    const filteredShippingEntries = this.filterEntries(
      shippingEntries,
      order,
      (entry) => entry.entryNumber
    );

    const shippingEntryNumbers = this.getEntryNumbers(
      shippingEntries,
      (entry) => entry.entryNumber
    );

    const matchedEntryGroups = order.entryGroups
    ?.map((group) => this.findMatchingEntryGroups(group, shippingEntryNumbers))
    .filter(Boolean) as OrderEntryGroup[];

    const hierarchyTrees = this.generateHierarchyTrees(matchedEntryGroups);

    return{
      filteredEntries: filteredShippingEntries,
      hierarchyTrees: hierarchyTrees,
    }
  }

  /**
   * Associates entry groups from the order with corresponding consignments.
   *
   * @param order The order containing the entry groups.
   * @param consignments The list of consignments to be enriched with entry groups.
   * @returns An updated list of consignments, each containing its related entry groups.
   */
  assignEntryGroupsToConsignments(
    order: Order,
    consignments: Consignment[]
  ): Consignment[] {
    return consignments.map((consignment) => {
      const filteredEntries = this.filterEntries(
        consignment.entries,
        order,
        (entry) => entry.orderEntry?.entryNumber
      );

      const entryNumbers = this.getEntryNumbers(
        consignment.entries,
        (entry) => entry.orderEntry?.entryNumber
      );

      const matchedEntryGroups = order.entryGroups
        ?.map((group) => this.findMatchingEntryGroups(group, entryNumbers))
        .filter(Boolean) as OrderEntryGroup[];

      const hierarchyTrees = this.generateHierarchyTrees(matchedEntryGroups);

      return {
        ...consignment,
        entryGroups: matchedEntryGroups,
        hierachyTrees: hierarchyTrees,
        entries: filteredEntries, // Add filtered entries here
      };
    });
  }

  /**
   * Processes unconsigned entries for a given order, generating filtered entries and hierarchy trees.
   *
   * @param order The order containing entryGroups.
   * @param unconsignedEntries The unconsigned entries to process.
   * @returns An object containing filtered entries and generated hierarchy trees for pickup and delivery.
   */
  processUnconsignedEntries(
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
  } {
    // Filter pickup entries
    const filteredPickupEntries = this.filterEntries<OrderEntry>(
      unconsignedEntries.pickup,
      order,
      (entry) => entry.entryNumber
    );
    const pickupEntryNumbers = this.getEntryNumbers<OrderEntry>(
      unconsignedEntries.pickup,
      (entry) => entry.entryNumber
    );

    const matchedPickupEntryGroups = order.entryGroups
      ?.map((group) => this.findMatchingEntryGroups(group, pickupEntryNumbers))
      .filter(Boolean) as OrderEntryGroup[];
    const pickupHierarchyTrees = this.generateHierarchyTrees(
      matchedPickupEntryGroups
    );

    // Filter delivery entries
    const filteredDeliveryEntries = this.filterEntries<OrderEntry>(
      unconsignedEntries.delivery,
      order,
      (entry) => entry.entryNumber
    );
    const deliveryEntryNumbers = this.getEntryNumbers<OrderEntry>(
      unconsignedEntries.delivery,
      (entry) => entry.entryNumber
    );

    const matchedDeliveryEntryGroups = order.entryGroups
      ?.map((group) =>
        this.findMatchingEntryGroups(group, deliveryEntryNumbers)
      )
      .filter(Boolean) as OrderEntryGroup[];
    const deliveryHierarchyTrees = this.generateHierarchyTrees(
      matchedDeliveryEntryGroups
    );

    // Return results
    return {
      pickup: {
        filteredEntries: filteredPickupEntries,
        hierarchyTrees: pickupHierarchyTrees,
      },
      delivery: {
        filteredEntries: filteredDeliveryEntries,
        hierarchyTrees: deliveryHierarchyTrees,
      },
    };
  }

  /**
   * A generic filtering method, applicable for both consignment entries and unconsigned entries.
   * @param entries The array of entries to filter.
   * @param order The order containing entryGroups.
   * @param extractEntryNumber Optional function to extract the entryNumber from an entry.
   * @returns An array of entries that meet the filtering criteria.
   */
  private filterEntries<T>(
    entries: T[] | undefined,
    order: Order,
    extractEntryNumber?: (entry: T) => number | undefined
  ): T[] {
    if (!entries) return [];
    return entries.filter((entry) => {
      const entryNumber = extractEntryNumber
        ? extractEntryNumber(entry)
        : (entry as any).orderEntry?.entryNumber;

      return order.entryGroups?.some((group) =>
        group.entries?.some(
          (orderEntry) => orderEntry.entryNumber === entryNumber
        )
      );
    });
  }

  /**
   * Extracts entry numbers from a given entries array using a specified extraction function.
   * @param entries The array of entries to process.
   * @param extractEntryNumber Optional function to extract the entryNumber from an entry.
   * @returns An array of entry numbers.
   */
  private getEntryNumbers<T>(
    entries: T[] | undefined,
    extractEntryNumber?: (entry: T) => number | undefined
  ): number[] {
    if (!entries) return [];
    return entries
      .map(
        (entry) =>
          extractEntryNumber?.(entry) || (entry as any)?.orderEntry?.entryNumber
      )
      .filter((num): num is number => num !== undefined);
  }
  /**
   * Recursively finds matching entry groups based on entry numbers.
   * @param group The current entry group to check.
   * @param entryNumbers A list of entry numbers to match.
   * @returns A new entry group object with matched children, or null if no match is found.
   */
  private findMatchingEntryGroups(
    group: OrderEntryGroup,
    entryNumbers: number[]
  ): OrderEntryGroup | null {
    // Check if the current group matches the entry numbers
    const matches = group.entries?.some((entry) =>
      entryNumbers.includes(entry.entryNumber || 0)
    );

    if (matches) {
      return {
        ...group,
        entryGroups: group.entryGroups
          ?.map((childGroup) =>
            this.findMatchingEntryGroups(childGroup, entryNumbers)
          )
          .filter(Boolean) as OrderEntryGroup[],
      };
    }

    // Check if any child groups match the entry numbers
    if (group.entryGroups?.length) {
      const matchedChildren = group.entryGroups
        .map((childGroup) =>
          this.findMatchingEntryGroups(childGroup, entryNumbers)
        )
        .filter(Boolean) as OrderEntryGroup[];

      if (matchedChildren.length) {
        return { ...group, entryGroups: matchedChildren };
      }
    }

    return null; // Return null if no match is found
  }
  /**
   * Generates hierarchy trees from the matched entry groups.
   *
   * @param entryGroups The list of matched entry groups.
   * @returns A list of hierarchy trees representing the entry groups.
   */
  private generateHierarchyTrees(
    entryGroups: OrderEntryGroup[]
  ): HierarchyNode[] {
    const bundles: HierarchyNode[] = [];

    entryGroups.forEach((entryGroup) => {
      if (entryGroup.type === 'CONFIGURABLEBUNDLE') {
        const root = new CollapsibleNode('ROOT', {
          children: [],
        });
        this.hierarchyService.buildHierarchyTree([entryGroup], root);
        bundles.push(root);
      }
    });

    return bundles;
  }
}
