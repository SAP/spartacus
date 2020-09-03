import { Injectable } from '@angular/core';
import {
  BaseOrganizationListService,
  OrganizationTableType,
  UnitRoleType,
} from '../../../shared/index';
import { EntitiesModel, B2BUser } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrgUnitService } from '@spartacus/my-account/organization/core';

@Injectable({
  providedIn: 'root',
})
export class UnitApproverListService extends BaseOrganizationListService<
  B2BUser
> {
  protected tableType = OrganizationTableType.UNIT_APPROVERS;

  constructor(
    protected tableService: TableService,
    protected orgUnitService: OrgUnitService
  ) {
    super(tableService);
  }

  protected load(
    structure: TableStructure,
    code: string,
    roleId: string
  ): Observable<EntitiesModel<B2BUser>> {
    const config = structure.pagination;
    return this.orgUnitService
      .getUsers(code, roleId, config)
      .pipe(map((users) => this.filterSelected(users)));
  }

  protected filterSelected({
    pagination,
    sorts,
    values,
  }: EntitiesModel<B2BUser>): EntitiesModel<B2BUser> {
    return {
      pagination,
      sorts,
      values: values.filter((value) => value.selected),
    };
  }

  unassign(orgUnitId: string, orgCustomerId: string) {
    this.orgUnitService.unassignApprover(
      orgUnitId,
      orgCustomerId,
      UnitRoleType.APPROVER
    );
  }
}
