import { Injectable } from '@angular/core';
import {
  BaseOrganizationListService,
  OrganizationTableType,
} from '../../../shared';
import { EntitiesModel, B2BUser } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { B2BUserService } from '@spartacus/my-account/organization/core';

@Injectable({
  providedIn: 'root',
})
export class UserApproverListService extends BaseOrganizationListService<
  B2BUser
> {
  protected tableType = OrganizationTableType.USER_APPROVERS;

  constructor(
    protected tableService: TableService,
    protected userService: B2BUserService
  ) {
    super(tableService);
  }

  protected load(
    structure: TableStructure,
    code: string
  ): Observable<EntitiesModel<B2BUser>> {
    const config = structure.pagination;
    return this.userService
      .getApprovers(code, config)
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

  unassign(userCode: string, approver: B2BUser) {
    this.userService.unassignApprover(userCode, approver.customerId);
  }
}
