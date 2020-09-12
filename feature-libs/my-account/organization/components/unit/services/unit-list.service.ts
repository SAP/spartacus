import { Injectable } from '@angular/core';
import { B2BUnit, B2BUnitNode, EntitiesModel } from '@spartacus/core';
import { TableService } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { OrgUnitService } from '../../../core/services/org-unit.service';
import { OrganizationListService } from '../../shared/organization-list/organization-list.service';
import { OrganizationTableType } from '../../shared/organization.model';

interface TreeAction {
  prepareUnit(child, depthLevel): any;
  next(array: B2BUnitNode[], child, depthLevel, pagination): void;
}

// toggle?: string;
// expandFromLevel?: number;
// collapseFromLevel?: number;

class ToggleAction implements TreeAction {
  constructor(private id: string, private unitListService: UnitListService) {}

  prepareUnit(child, depthLevel) {
    return this.unitListService.prepareUnit(child, {
      depthLevel,
      expanded:
        child.id === this.id
          ? !this.unitListService.isExpandedNodeMap[child.id]
          : this.unitListService.isExpandedNodeMap[child.id],
      visible: true,
    });
  }

  next(array: B2BUnitNode[], child, depthLevel, pagination) {
    this.unitListService.flatten(
      array,
      child.children,
      depthLevel + 1,
      pagination,
      child.id === this.id && !this.unitListService.isExpandedNodeMap[child.id]
        ? new CollapseFromLevelAction(depthLevel + 1, this.unitListService)
        : this
    );
  }
}

class CollapseFromLevelAction implements TreeAction {
  constructor(
    private depthLevel: number,
    private unitListService: UnitListService
  ) {}

  prepareUnit(child, depthLevel) {
    return this.unitListService.prepareUnit(child, {
      depthLevel,
      expanded:
        this.depthLevel > depthLevel
          ? this.unitListService.isExpandedNodeMap[child.id]
          : false,
      visible: this.depthLevel > depthLevel,
    });
  }

  next(array: B2BUnitNode[], child, depthLevel, pagination) {
    this.unitListService.flatten(
      array,
      child.children,
      depthLevel + 1,
      pagination,
      new CollapseFromLevelAction(depthLevel + 1, this.unitListService)
    );
  }
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
  protected treeAction$ = new BehaviorSubject<TreeAction>(
    new CollapseFromLevelAction(2, this)
  );
  constructor(
    protected tableService: TableService,
    protected unitService: OrgUnitService
  ) {
    super(tableService);
  }

  isExpandedNodeMap = {};

  protected load(): Observable<EntitiesModel<B2BUnit>> {
    return combineLatest([this.unitService.getTree(), this.treeAction$]).pipe(
      map(([raw, action]) => this.convertUnits(raw, action)),
      tap(console.log)
    );
  }

  key(): string {
    return 'uid';
  }

  public flatten(
    array: B2BUnitNode[],
    children: B2BUnitNode[],
    depthLevel,
    pagination,
    action: TreeAction
  ) {
    children.forEach((child) => {
      array.push(
        action.prepareUnit(child, depthLevel)
        // this.prepareUnit(child, { depthLevel, expanded: true, visible: true })
      );
      pagination.totalResults++;
      action.next(array, child, depthLevel, pagination);
      // this.flatten(array, child.children, depthLevel + 1, pagination, action);
    });
  }

  public prepareUnit(unit: B2BUnitNode, { depthLevel, expanded, visible }) {
    this.isExpandedNodeMap[unit.id] = expanded;
    return {
      uid: unit.id,
      name: unit.name,
      active: unit.active,
      count: unit.children?.length ?? 0,
      depthLevel,
      expanded,
      visible,
    };
  }

  protected convertUnits(
    root: B2BUnitNode,
    action: TreeAction
  ): EntitiesModel<B2BUnit> {
    const depthLevel = 0,
      pagination = { totalResults: 0 },
      units = [];

    this.flatten(units, [root], depthLevel, pagination, action);
    return {
      // values: units.filter((unit) => unit.visible),
      values: units,
      pagination,
    };
  }

  toggle(_event: string) {
    // here's the place to update your local subject
    console.log(_event);
    this.treeAction$.next(new ToggleAction(_event, this));
  }

  // toggleAriaExpandedForNode(code: string): void {
  //   this.isExpandedNodeMap[code] = !this.isExpandedNodeMap[code];
  //   if (!this.isExpandedNodeMap[code]) {
  //     this.hideElementChildren(code);
  //   }
  // }
  //
  // hideElementChildren(code: string): void {
  //   Object.keys(this.isExpandedNodeMap)
  //     .filter((s) => s.indexOf(code) !== -1)
  //     .forEach((p) => {
  //       this.isExpandedNodeMap[p] = false;
  //     });
  // }
}
