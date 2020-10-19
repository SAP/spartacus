import { Injectable } from '@angular/core';
import {
  B2BUser,
  B2BUserGroup,
  EntitiesModel,
  PaginationModel,
} from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationSubListService } from '../../../../shared/organization-sub-list/organization-sub-list.service';
import { OrganizationTableType } from '../../../../shared/organization.model';

@Injectable({
  providedIn: 'root',
})
export class UnitUserListService extends OrganizationSubListService<B2BUser> {
  protected tableType = OrganizationTableType.UNIT_USERS;
  protected _domainType = OrganizationTableType.USER;

  constructor(
    protected tableService: TableService,
    protected unitService: OrgUnitService
  ) {
    super(tableService);
  }

  protected load(
    pagination: PaginationModel,
    code: string
  ): Observable<EntitiesModel<B2BUser>> {
    return this.unitService.getUsers(
      code,
      B2BUserGroup.B2B_CUSTOMER_GROUP,
      pagination
    );
  }
}
