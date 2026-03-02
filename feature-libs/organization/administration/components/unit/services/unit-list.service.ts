/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { EntitiesModel } from '@spartacus/core';
import {
  B2BUnitNode,
  B2BUnitTreeNode,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ListService } from '../../shared/list/list.service';
import { OrganizationTableType } from '../../shared/organization.model';
import { UnitItemService } from './unit-item.service';
import { UnitTreeService } from './unit-tree.service';

/**
 * Service to populate Unit data to `Table` data. Unit
 * data is driven by the table configuration, using the `OrganizationTables.UNIT`.
 */
@Injectable({
  providedIn: 'root',
})
export class UnitListService extends ListService<B2BUnitTreeNode> {
  protected tableType = OrganizationTableType.UNIT;

  /**
   * Search term state for filtering units by ID or name.
   */
  protected searchTerm$ = new BehaviorSubject<string>('');

  constructor(
    protected tableService: TableService,
    protected unitService: OrgUnitService,
    protected unitItemService: UnitItemService,
    protected unitTreeService: UnitTreeService
  ) {
    super(tableService);
  }

  /**
   * Updates the search term for filtering units.
   * @param term - The search term to filter by ID or name.
   */
  search(term: string): void {
    this.searchTerm$.next(term.toLowerCase().trim());
  }

  /**
   * Clears the current search term.
   */
  clearSearch(): void {
    this.searchTerm$.next('');
  }

  protected load(): Observable<EntitiesModel<B2BUnitTreeNode> | undefined> {
    return combineLatest([this.unitService.getTree(), this.searchTerm$]).pipe(
      switchMap(([tree, term]) => {
        const filteredTree = term ? this.filterTree(tree, term) : tree;
        return this.unitItemService.key$.pipe(
          map((key) => {
            if (filteredTree) {
              this.unitTreeService.initialize(filteredTree, key);
            }
            return filteredTree;
          })
        );
      }),
      switchMap((tree) =>
        this.unitTreeService.treeToggle$.pipe(map(() => tree))
      ),
      map((tree: B2BUnitNode | undefined) => {
        const result = this.convertListItem(tree);
        // When a search term is active but yields no results, return an empty
        // list instead of undefined so the search box remains visible.
        if (!result && this.searchTerm$.getValue()) {
          return { values: [], pagination: { totalResults: 0 } };
        }
        return result;
      })
    );
  }

  /**
   * Recursively filters the unit tree by matching ID or name.
   * Preserves ancestor nodes when child nodes match.
   * @param node - The current node to filter.
   * @param term - The search term (lowercase).
   * @returns The filtered node or undefined if no match.
   */
  protected filterTree(
    node: B2BUnitNode | undefined,
    term: string
  ): B2BUnitNode | undefined {
    if (!node) {
      return undefined;
    }

    const matches =
      node.id?.toLowerCase().includes(term) ||
      node.name?.toLowerCase().includes(term);

    const filteredChildren = node.children
      ?.map((child) => this.filterTree(child, term))
      .filter((child): child is B2BUnitNode => !!child);

    // Keep node if it matches or has matching descendants
    if (matches || (filteredChildren && filteredChildren.length > 0)) {
      return { ...node, children: filteredChildren };
    }
    return undefined;
  }

  protected convertListItem(
    unit: B2BUnitNode | undefined,
    depthLevel = 0,
    pagination = { totalResults: 0 }
  ): EntitiesModel<B2BUnitTreeNode> | undefined {
    let values: B2BUnitTreeNode[] = [];
    if (!unit) {
      return undefined;
    }

    const node: B2BUnitTreeNode = {
      ...unit,
      count: unit.children?.length ?? 0,
      expanded: this.unitTreeService.isExpanded(unit.id ?? '', depthLevel),
      depthLevel,
      // tmp, should be normalized
      uid: unit.id ?? '',
      children: [...(unit.children ?? [])].sort((unitA, unitB) =>
        (unitA.name ?? '').localeCompare(unitB.name ?? '')
      ),
    };

    values.push(node);
    pagination.totalResults++;

    node.children?.forEach((childUnit) => {
      const childList = this.convertListItem(
        childUnit,
        depthLevel + 1,
        pagination
      )?.values;
      if (node.expanded && childList && childList.length > 0) {
        values = values.concat(childList);
      }
    });

    return { values, pagination };
  }

  key(): string {
    return 'uid';
  }
}
