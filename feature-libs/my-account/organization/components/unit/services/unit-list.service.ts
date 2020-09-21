import { Injectable } from '@angular/core';
import { B2BUnit, B2BUnitNode, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { TableService } from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { OrganizationListService } from '../../shared/organization-list/organization-list.service';
import { OrganizationTableType } from '../../shared/organization.model';
import { UnitItemService } from './unit-item.service';

interface B2bUnitTreeNode extends B2BUnitNode {
  expanded: boolean;
  depthLevel: number;
  count: number;
  uid: string;
}

/**
 * Service to populate Budget data to `Table` data. Budget
 * data is driven by the table configuration, using the `OrganizationTables.BUDGET`.
 */
@Injectable({
  providedIn: 'root',
})
export class UnitListService extends OrganizationListService<B2BUnit> {
  protected tableType = OrganizationTableType.UNIT;

  protected initialExpanded = 1;

  protected expandState = new Map<string, boolean>();
  protected levelState = new Map<string, number>();
  protected update$ = new BehaviorSubject(undefined);

  protected expandedNodeMap = {};
  constructor(
    protected tableService: TableService,
    protected unitService: OrgUnitService,
    protected unitItemService: UnitItemService
  ) {
    super(tableService);
    this.waitForKey();
  }

  protected waitForKey() {
    this.unitService
      .getTree()
      .pipe(
        withLatestFrom(this.unitItemService.key$),
        first(([_tree, id]) => Boolean(id))
      )
      .subscribe(([tree, id]) => {
        this.expandBranch(id, tree);
        this.update$.next(true);
      });
  }

  protected load(): Observable<EntitiesModel<B2BUnit>> {
    return this.update$.pipe(
      switchMap(() =>
        this.unitService
          .getTree()
          .pipe(map((tree: B2BUnitNode) => this.convertListItem(tree)))
      )
    );
  }

  protected convertListItem(
    unit: B2BUnitNode,
    depthLevel = 0,
    pagination = { totalResults: 0 }
  ): EntitiesModel<B2BUnit> {
    let values = [];
    const expanded = this.isExpanded(unit.id, depthLevel);
    const treeNode: B2bUnitTreeNode = {
      ...unit,
      count: unit.children?.length ?? 0,
      expanded: expanded,
      depthLevel,
      // tmp, should be normalized
      uid: unit.id,
    };
    this.expandState.set(treeNode.uid, expanded);
    this.levelState.set(treeNode.uid, depthLevel);

    values.push(treeNode);
    pagination.totalResults++;

    unit.children.forEach((childUnit) => {
      const childList = this.convertListItem(
        childUnit,
        depthLevel + 1,
        pagination
      )?.values;
      if (treeNode.expanded && childList.length > 0) {
        values = values.concat(childList);
      }
    });

    return { values, pagination };
  }

  /**
   * Indicates whether the unit is expanded.
   */
  protected isExpanded(unitId: string, level: number): boolean {
    return this.expandState.get(unitId) ?? level < this.initialExpanded;
  }

  toggle(unit: B2BUnit) {
    this.expandState.set(unit.uid, !(unit as any).expanded);
    this.update$.next(true);
  }

  key(): string {
    return 'uid';
  }

  collapseAll() {
    this.levelState.forEach((depthLevel, key) => {
      if (depthLevel >= this.initialExpanded) this.expandState.set(key, false);
    });
    this.update$.next(true);
  }

  expandAll() {
    this.expandState.forEach((_value, key) => this.expandState.set(key, true));
    this.update$.next(true);
  }

  protected expandBranch(id: string, unit: B2BUnitNode) {
    if (this.findInTree(id, unit).length > 0) {
      this.expandState.set(unit.id, true);
      unit.children?.forEach((child) => this.expandBranch(id, child));
    }
  }

  protected findInTree(id, unit: B2BUnitNode): B2BUnitNode[] {
    return unit.id === id
      ? [unit]
      : unit.children.flatMap((child) => this.findInTree(id, child));
  }
}
