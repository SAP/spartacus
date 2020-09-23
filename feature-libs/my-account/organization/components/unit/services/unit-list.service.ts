import { Injectable } from '@angular/core';
import { B2BUnitNode, B2bUnitTreeNode, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { TableService } from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { OrganizationListService } from '../../shared/organization-list/organization-list.service';
import { OrganizationTableType } from '../../shared/organization.model';
import { UnitItemService } from './unit-item.service';

/**
 * Service to populate Unit data to `Table` data. Unit
 * data is driven by the table configuration, using the `OrganizationTables.UNIT`.
 */
@Injectable({
  providedIn: 'root',
})
export class UnitListService extends OrganizationListService<B2bUnitTreeNode> {
  protected tableType = OrganizationTableType.UNIT;

  protected initialExpanded = 1;

  protected treeState = new Map<string, B2bUnitTreeNode>();
  protected update$ = new BehaviorSubject(undefined);

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

  protected load(): Observable<EntitiesModel<B2bUnitTreeNode>> {
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
  ): EntitiesModel<B2bUnitTreeNode> {
    let values = [];
    const expanded = this.isExpanded(unit.id, depthLevel);
    const treeNode: B2bUnitTreeNode = {
      ...unit,
      count: unit.children?.length ?? 0,
      expanded,
      depthLevel,
      // tmp, should be normalized
      uid: unit.id,
    };
    this.treeState.set(treeNode.uid, treeNode);

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
    return this.treeState.get(unitId)?.expanded ?? level < this.initialExpanded;
  }

  toggle(unit: B2bUnitTreeNode) {
    this.treeState.set(unit.uid, { ...unit, expanded: !unit.expanded });
    this.update$.next(true);
  }

  key(): string {
    return 'uid';
  }

  collapseAll() {
    this.treeState.forEach((treeNode, id) => {
      if (treeNode.depthLevel >= this.initialExpanded)
        this.treeState.set(id, { ...treeNode, expanded: false });
    });
    this.update$.next(true);
  }

  expandAll() {
    this.treeState.forEach((treeNode, id) =>
      this.treeState.set(id, { ...treeNode, expanded: true })
    );
    this.update$.next(true);
  }

  protected expandBranch(id: string, unit: B2BUnitNode) {
    if (this.findInTree(id, unit).length > 0) {
      const treeNode = this.treeState.get(unit.id);
      this.treeState.set(unit.id, { ...treeNode, expanded: true });
      unit.children?.forEach((child) => this.expandBranch(id, child));
    }
  }

  protected findInTree(id, unit: B2BUnitNode): B2BUnitNode[] {
    return unit.id === id
      ? [unit]
      : unit.children.flatMap((child) => this.findInTree(id, child));
  }
}
