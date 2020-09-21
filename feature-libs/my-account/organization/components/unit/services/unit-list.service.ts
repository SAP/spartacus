import { Injectable } from '@angular/core';
import { B2BUnit, B2BUnitNode, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { TableService } from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
  }

  protected load(): Observable<EntitiesModel<B2BUnit>> {
    return this.update$.pipe(
      switchMap(() =>
        this.unitService
          .getTree()
          .pipe(map((list: B2BUnitNode) => this.populate(list)))
      )
    );
  }

  protected populate(unit: B2BUnitNode): EntitiesModel<B2BUnit> {
    return { values: this.convertListItem(unit) };
  }

  protected convertListItem(unit: B2BUnitNode, depthLevel = 0): B2BUnit[] {
    let list = [];
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
    list.push(treeNode);

    unit.children.forEach((childUnit) => {
      const childList = this.convertListItem(childUnit, depthLevel + 1);
      if (treeNode.expanded && childList.length > 0) {
        list = list.concat(childList);
      }
    });

    return list;
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
    this.levelState.forEach((value, key) => {
      if (value >= this.initialExpanded) this.expandState.set(key, false);
    });
    this.update$.next(true);
  }

  expandAll() {
    this.expandState.forEach((_value, key) => this.expandState.set(key, true));
    this.update$.next(true);
  }
}
