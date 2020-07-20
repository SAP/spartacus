import { Injectable } from '@angular/core';
import {
  BaseOrganizationListService,
  OrganizationTableType,
} from '../../shared';
import { EntitiesModel, OrgUnitService, B2BUnitNode } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UnitChildrenService extends BaseOrganizationListService<
  B2BUnitNode
> {
  protected tableType = OrganizationTableType.UNIT_CHILDREN;

  constructor(
    protected tableService: TableService,
    protected orgUnitService: OrgUnitService
  ) {
    super(tableService);
  }

  protected load(
    structure: TableStructure,
    code: string
  ): Observable<EntitiesModel<B2BUnitNode>> {
    const config = structure.pagination;
    return this.orgUnitService.getChildUnits(code, config);
    // .pipe(map((users) => {
    //   console.log(users)
    //   return this.filterSelected(users)
    // }));
  }

  // protected filterSelected({
  //   pagination,
  //   sorts,
  //   values,
  // }: EntitiesModel<B2BUnitNode>): EntitiesModel<B2BUnitNode> {
  //   return {
  //     pagination,
  //     sorts,
  //     values: values.filter((value) => value.selected),
  //   };
  // }
}
