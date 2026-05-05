/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderEntry, OrderEntryGroup } from '@spartacus/cart/base/root';
import { HierarchyNode, Value } from '../hierarchy-node';
import { TitleNode } from '../hierarchy-node-title';
import { CollapsibleNode } from '../hierarchy-node-collapsible';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * Service responsible for handling hierarchy-related operations.
 */
export class HierarchyComponentService {
  /**
   * Retrieves the order entries from the given entry groups.
   *
   * @param entryGroups$ - An Observable of OrderEntryGroup[] representing the entry groups.
   * @returns An Observable of OrderEntry[] representing the order entries.
   */
  getEntriesFromGroups(
    entryGroups$: Observable<OrderEntryGroup[]>
  ): Observable<OrderEntry[]> {
    return entryGroups$.pipe(
      map((entryGroups) =>
        entryGroups
          .filter((group) => !group.entryGroups?.length)
          .reduce<
            OrderEntry[]
          >((acc, curr) => [...acc, ...(curr.entries ?? [])], [])
      )
    );
  }

  /**
   * Retrieves the hierarchy nodes from the given entry groups.
   *
   * @param entryGroups$ - The observable of entry groups.
   * @returns An observable of hierarchy nodes.
   */
  getBundlesFromGroups(
    entryGroups$: Observable<OrderEntryGroup[]>
  ): Observable<HierarchyNode[]> {
    return entryGroups$.pipe(
      map(
        (entryGroups) =>
          entryGroups
            .map((entryGroup) => {
              if (entryGroup.type === 'CONFIGURABLEBUNDLE') {
                const root = new CollapsibleNode('ROOT', {
                  children: [],
                });
                this.buildHierarchyTree([entryGroup], root);
                return root;
              }
              return undefined; // Add this line to explicitly return undefined
            })
            .filter((node): node is CollapsibleNode => node !== undefined) // Filter out undefined elements and cast to CollapsibleNode<any>
      )
    );
  }

  /**
   * Builds a hierarchy tree from the given nodes and parent node.
   * @param nodes - The array of OrderEntryGroup nodes.
   * @param parent - The parent HierarchyNode.
   * @param count - The count of nodes processed (optional, default is 0).
   */
  buildHierarchyTree(
    nodes: OrderEntryGroup[],
    parent: HierarchyNode,
    count: number = 0
  ): void {
    let treeNode: HierarchyNode;
    nodes.forEach((node) => {
      const value: Value = {
        key: node.entryGroupNumber,
        data: node.entries,
      };

      if (count === 0) {
        treeNode = new TitleNode(node.label, {
          children: [],
          value: value,
        });

        parent.children.push(treeNode);
        treeNode = parent;
      } else {
        treeNode = new CollapsibleNode(node.label, {
          children: [],
          value: value,
          open: true,
        });
        parent.children.push(treeNode);
      }
      count++;
      if (node.entryGroups && node.entryGroups.length > 0) {
        this.buildHierarchyTree(node.entryGroups, treeNode, count);
      }
    });
  }
}
