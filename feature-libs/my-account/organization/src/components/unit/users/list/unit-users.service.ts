import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrgUnitService } from '../../../../core/services/org-unit.service';
import {
  BaseOrganizationListService,
  OrganizationTableType,
} from '../../../shared/index';

@Injectable({
  providedIn: 'root',
})
export class UnitUsersService extends BaseOrganizationListService<B2BUser> {
  protected tableType = OrganizationTableType.UNIT_USERS;

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
    return this.orgUnitService.getUsers(code, roleId, config);
  }
}
