import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationSubListService } from '../../shared/organization-sub-list/organization-sub-list.service';
import { OrganizationTableType } from '../../shared/organization.model';
import { OrganizationItemStatus } from '../../../core/model/organization-item-status';

@Injectable({
  providedIn: 'root',
})
export class UserApproverListService extends OrganizationSubListService<
  B2BUser
> {
  protected tableType = OrganizationTableType.USER_APPROVERS;
  protected _domainType = OrganizationTableType.USER_GROUP;

  constructor(
    protected tableService: TableService,
    protected userService: B2BUserService
  ) {
    super(tableService);
  }

  protected load(
    pagination: PaginationModel,
    code: string
  ): Observable<EntitiesModel<B2BUser>> {
    return this.userService.getApprovers(code, pagination);
  }

  /**
   * @override
   * Assign approver to the user.
   */
  assign(
    userCode: string,
    approverId: string
  ): Observable<OrganizationItemStatus<B2BUser>> {
    this.userService.assignApprover(userCode, approverId);
    return this.userService.getLoadingStatusSuccess(approverId);
  }

  /**
   * @override
   * Unassign the approver from the user.
   */
  unassign(
    userCode: string,
    approverId: string
  ): Observable<OrganizationItemStatus<B2BUser>> {
    this.userService.unassignApprover(userCode, approverId);
    return this.userService.getLoadingStatusSuccess(approverId);
  }
}
