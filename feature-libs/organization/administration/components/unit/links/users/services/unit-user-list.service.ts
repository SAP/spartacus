/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  B2BUser,
  B2BUserRole,
  EntitiesModel,
  PaginationModel,
} from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../../../shared/organization.model';
import { SubListService } from '../../../../shared/sub-list/sub-list.service';

@Injectable({
  providedIn: 'root',
})
export class UnitUserListService extends SubListService<B2BUser> {
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
  ): Observable<EntitiesModel<B2BUser> | undefined> {
    return this.unitService.getUsers(code, B2BUserRole.CUSTOMER, pagination);
  }
}
