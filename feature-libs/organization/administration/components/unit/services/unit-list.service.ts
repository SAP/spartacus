/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  EntitiesModel,
  FeatureToggles,
  PaginationModel,
} from '@spartacus/core';
import {
  B2BUnitNode,
  B2BUnitTreeNode,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  ListService,
  SearchablePaginationModel,
} from '../../shared/list/list.service';
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

  private featureToggles = inject(FeatureToggles);

  constructor(
    protected tableService: TableService,
    protected unitService: OrgUnitService,
    protected unitItemService: UnitItemService,
    protected unitTreeService: UnitTreeService
  ) {
    super(tableService);
  }

  override isSearchEnabled(): boolean {
    return !!this.featureToggles.enableB2BUnitSearch;
  }

  override getSearchPlaceholderKey(): string {
    return 'orgUnit.search.placeholder';
  }

  protected load(
    pagination: PaginationModel
  ): Observable<EntitiesModel<B2BUnitTreeNode> | undefined> {
    const query = (pagination as SearchablePaginationModel)?.query
      ?.trim()
      ?.toLowerCase();

    return this.unitService.getTree().pipe(
      switchMap((node) =>
        this.unitItemService.key$.pipe(
          map((key) => {
            if (node) {
              this.unitTreeService.initialize(node, key);
            }
            return node;
          })
        )
      ),
      switchMap((tree) =>
        this.unitTreeService.treeToggle$.pipe(map(() => tree))
      ),
      map((tree: B2BUnitNode | undefined) => {
        if (query) {
          const forceExpandIds = new Set<string>();
          const filteredTree = this.filterTree(tree, query, forceExpandIds);
          return (
            this.convertListItem(
              filteredTree,
              0,
              { totalResults: 0 },
              forceExpandIds
            ) ?? { values: [], pagination: { totalResults: 0 } }
          );
        }
        return this.convertListItem(tree);
      })
    );
  }

  /**
   * Recursively filters the tree based on search query.
   *
   * Rules:
   * - If a node matches -> keep node + ALL children (as-is, collapsed by default)
   * - If only a descendant matches -> keep all ancestors to root + only matching branch.
   *   Ancestors are added to forceExpandIds so they appear expanded in the UI.
   * - Non-matching nodes with no matching descendants are removed.
   *
   * @param forceExpandIds Collects IDs of ancestor nodes that should be
   *   force-expanded in convertListItem(). These are nodes kept only because
   *   their descendants match (not because they match themselves).
   */
  protected filterTree(
    node: B2BUnitNode | undefined,
    query: string,
    forceExpandIds: Set<string>
  ): B2BUnitNode | undefined {
    if (!node) {
      return undefined;
    }

    const selfMatches =
      node.id?.toLowerCase().includes(query) ||
      node.name?.toLowerCase().includes(query);

    if (selfMatches) {
      // Self matches: keep ALL children as-is (collapsed, expandable).
      // Do NOT add to forceExpandIds — children stay in their natural state.
      return { ...node };
    }

    // Self doesn't match — check children recursively
    const filteredChildren = node.children
      ?.map((child) => this.filterTree(child, query, forceExpandIds))
      .filter((child): child is B2BUnitNode => child != null);

    if (filteredChildren && filteredChildren.length > 0) {
      // This is an ANCESTOR of a match -> force expand so matching descendants are visible
      forceExpandIds.add(node.id ?? '');
      return { ...node, children: filteredChildren };
    }

    // No match at all
    return undefined;
  }

  protected convertListItem(
    unit: B2BUnitNode | undefined,
    depthLevel = 0,
    pagination = { totalResults: 0 },
    forceExpandIds?: Set<string>
  ): EntitiesModel<B2BUnitTreeNode> | undefined {
    let values: B2BUnitTreeNode[] = [];
    if (!unit) {
      return undefined;
    }

    const node: B2BUnitTreeNode = {
      ...unit,
      count: unit.children?.length ?? 0,
      expanded:
        forceExpandIds?.has(unit.id ?? '') ||
        this.unitTreeService.isExpanded(unit.id ?? '', depthLevel),
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
        pagination,
        forceExpandIds
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
