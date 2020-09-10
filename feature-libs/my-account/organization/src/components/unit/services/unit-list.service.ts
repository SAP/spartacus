import { Injectable } from '@angular/core';
import { B2BUnit, B2BUnitNode, EntitiesModel } from '@spartacus/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrgUnitService } from '../../../core/services/org-unit.service';
import { OrganizationListService } from '../../shared/organization-list/organization-list.service';
import { OrganizationTableType } from '../../shared/organization.model';

/**
 * Service to populate Budget data to `Table` data. Budget
 * data is driven by the table configuration, using the `OrganizationTables.BUDGET`.
 */
@Injectable({
  providedIn: 'root',
})
export class UnitListService extends OrganizationListService<B2BUnit> {
  protected tableType = OrganizationTableType.UNIT;

  constructor(
    protected tableService: TableService,
    protected unitService: OrgUnitService
  ) {
    super(tableService);
  }

  protected load(): Observable<EntitiesModel<B2BUnit>> {
    return this.unitService
      .getTree()
      .pipe(map((raw) => this.convertUnits(raw)));
  }

  key(): string {
    return 'uid';
  }

  private flatten(
    array: B2BUnitNode[],
    children: B2BUnitNode[],
    level,
    pagination
  ) {
    children.forEach((child) => {
      array.push(this.prepareUnit(child, level, pagination));
      this.flatten(array, child.children, level + 1, pagination);
    });
  }

  private prepareUnit(unit: B2BUnitNode, level, pagination) {
    pagination.totalResults++;
    return {
      uid: unit.id,
      name: unit.name,
      active: unit.active,
      count: unit.children?.length ?? 0,
      expanded: true,
      level,
    };
  }

  protected convertUnits(root: B2BUnitNode): EntitiesModel<B2BUnit> {
    const level = 0,
      pagination = { totalResults: 0 };
    const unitModels: EntitiesModel<B2BUnit> = {
      values: [this.prepareUnit(root, level, pagination)],
      pagination,
    };
    this.flatten(unitModels.values, root.children, level + 1, pagination);
    return unitModels;
  }

  toggle(_event: Event) {
    console.log(_event);
  }
}
