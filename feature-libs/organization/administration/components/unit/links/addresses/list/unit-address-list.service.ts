/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Address, EntitiesModel, PaginationModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../../../shared/organization.model';
import { SubListService } from '../../../../shared/sub-list/sub-list.service';

@Injectable({
  providedIn: 'root',
})
export class UnitAddressListService extends SubListService<Address> {
  protected tableService: TableService;
  protected orgUnitService = inject(OrgUnitService);

  protected tableType = OrganizationTableType.UNIT_ADDRESS;
  protected _domainType = OrganizationTableType.UNIT_ADDRESS;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const tableService = inject(TableService);

    super(tableService);
  
    this.tableService = tableService;
  }

  protected load(
    _pagination: PaginationModel,
    code: string
  ): Observable<EntitiesModel<Address> | undefined> {
    return this.orgUnitService.getAddresses(code);
  }
}
