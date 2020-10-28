import { Injectable } from '@angular/core';
import {
  B2BUser,
  B2BUserGroup,
  EntitiesModel,
  PaginationModel,
} from '@spartacus/core';
import {
  OrgUnitService,
  B2BUserService,
} from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationSubListService } from '../../../shared/organization-sub-list/organization-sub-list.service';
import { OrganizationTableType } from '../../../shared/organization.model';
import { OrganizationItemStatus } from '../../../../core/model/organization-item-status';

@Injectable({
  providedIn: 'root',
})
export class UnitApproverListService extends OrganizationSubListService<
  B2BUser
> {
  protected tableType = OrganizationTableType.UNIT_APPROVERS;
  protected _domainType = OrganizationTableType.USER;

  constructor(
    protected tableService: TableService,
    protected unitService: OrgUnitService,
    protected userService: B2BUserService
  ) {
    super(tableService);
  }

  protected load(
    pagination: PaginationModel,
    code: string
  ): Observable<EntitiesModel<B2BUser>> {
    return this.unitService.getUsers(
      code,
      B2BUserGroup.B2B_APPROVER_GROUP,
      pagination
    );
  }

  /**
   * @override
   * Assign budget to the cost center.
   */
  assign(
    unitId: string,
    customerId: string
  ): Observable<OrganizationItemStatus<B2BUser>> {
    this.unitService.assignApprover(
      unitId,
      customerId,
      B2BUserGroup.B2B_APPROVER_GROUP
    );
    return this.userService.getLoadingStatusSuccess(customerId);
  }

  /**
   * @override
   * Unassign the budget from the cost center.
   */
  unassign(
    unitId: string,
    customerId: string
  ): Observable<OrganizationItemStatus<B2BUser>> {
    this.unitService.unassignApprover(
      unitId,
      customerId,
      B2BUserGroup.B2B_APPROVER_GROUP
    );
    return this.userService.getLoadingStatusSuccess(customerId);
  }
}
