import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrgUnitService } from '../../../../core/services/org-unit.service';
import {
  OrganizationListService,
  OrganizationTableType,
  UnitRoleType,
} from '../../../shared/index';

@Injectable({
  providedIn: 'root',
})
export class UnitApproverListService extends OrganizationListService<B2BUser> {
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
    const config = structure.options?.pagination;
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
