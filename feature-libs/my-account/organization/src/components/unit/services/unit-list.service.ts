import { Injectable } from '@angular/core';
import { EntitiesModel, B2BUnit, B2BUnitNode } from '@spartacus/core';
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

  protected load(): // structure?: TableStructure,
  // _params?
  Observable<EntitiesModel<B2BUnit>> {
    // const paginationConfig = structure.options?.pagination;
    return this.unitService
      .getTree()
      .pipe(map((raw) => this.convertUnits(raw)));
  }

  /**
   * Populates budget data to a convenient table data model, so that we
   * can skip specific conversion in the view logic where possible.
   */
  // protected convertUnits({
  //   pagination,
  //   sorts,
  //   values,
  // }: EntitiesModel<B2BUnit>): EntitiesModel<B2BUnit> {
  //   const unitModels: EntitiesModel<B2BUnit> = {
  //     pagination,
  //     sorts,
  //     values: values.map((value: any) => ({
  //       ...value,
  //       currency: value.currency?.isocode,
  //       unit: value.orgUnit,
  //     })),
  //   };
  //   return unitModels;
  // }

  private flat(array: B2BUnitNode[], children: B2BUnitNode[], level) {
    children.forEach((child) => {
      array.push(this.convertUnit(child, level));
      this.flat(array, child.children, level + 1);
    });
  }

  convertUnit(unit: B2BUnitNode, level) {
    return {
      uid: unit.id,
      name: unit.name,
      active: unit.active,
      level,
      expanded: true,
    };
  }

  protected convertUnits(root: B2BUnitNode): EntitiesModel<B2BUnit> {
    const level = 0;
    const unitModels: EntitiesModel<B2BUnit> = {
      values: [this.convertUnit(root, level)],
    };
    this.flat(unitModels.values, root.children, level + 1);
    return unitModels;
  }
}
