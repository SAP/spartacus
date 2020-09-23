import { Injectable } from '@angular/core';
import { B2BUnitNode, B2bUnitTreeNode, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OrganizationListService } from '../../shared/organization-list/organization-list.service';
import { OrganizationTableType } from '../../shared/organization.model';
import { UnitItemService } from './unit-item.service';
import { TREE_TOGGLE } from './unit-tree.model';
import { UnitTreeService } from './unit-tree.service';

/**
 * Service to populate Unit data to `Table` data. Unit
 * data is driven by the table configuration, using the `OrganizationTables.UNIT`.
 */
@Injectable({
  providedIn: 'root',
})
export class UnitListService extends OrganizationListService<B2bUnitTreeNode> {
  protected tableType = OrganizationTableType.UNIT;

  constructor(
    protected tableService: TableService,
    protected unitService: OrgUnitService,
    protected unitItemService: UnitItemService,
    protected uts: UnitTreeService
  ) {
    super(tableService);
  }

  protected load(): Observable<EntitiesModel<B2bUnitTreeNode>> {
    return this.unitService.getTree().pipe(
      switchMap((node) =>
        this.unitItemService.key$.pipe(
          map((key) => {
            this.uts.initialize(node, key);
            return node;
          })
        )
      ),
      switchMap((tree) => this.uts.treeToggle$.pipe(map(() => tree))),
      map((tree: B2BUnitNode) => this.convertListItem(tree))
    );
  }

  protected convertListItem(
    unit: B2BUnitNode,
    depthLevel = 0,
    pagination = { totalResults: 0 },
    parentToggleState?: TREE_TOGGLE
  ): EntitiesModel<B2bUnitTreeNode> {
    let values = [];
    if (!unit) {
      return;
    }

    if (!parentToggleState) {
      parentToggleState = this.uts.getToggleState(unit.id);
    }

    const node: B2bUnitTreeNode = {
      ...unit,
      count: unit.children?.length ?? 0,
      expanded: this.uts.isExpanded(unit.id, depthLevel, parentToggleState),
      depthLevel,
      // tmp, should be normalized
      uid: unit.id,
    };

    values.push(node);
    pagination.totalResults++;

    unit.children.forEach((childUnit) => {
      const childList = this.convertListItem(
        childUnit,
        depthLevel + 1,
        pagination,
        parentToggleState
      )?.values;
      if (node.expanded && childList.length > 0) {
        values = values.concat(childList);
      }
    });

    return { values, pagination };
  }

  key(): string {
    return 'uid';
  }
}
