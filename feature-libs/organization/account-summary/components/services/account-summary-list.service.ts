import { Injectable } from '@angular/core';
import {
  OrganizationTableType,
  UnitItemService,
  UnitListService,
} from '@spartacus/organization/administration/components';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { UnitTreeService } from '@spartacus/organization/administration/components';
@Injectable({
  providedIn: 'root',
})
export class AccountSummaryListService extends UnitListService {
  protected tableType = OrganizationTableType.ACCOUNT_SUMMARY_UNIT;

  constructor(
    protected tableService: TableService,
    protected unitService: OrgUnitService,
    protected unitItemService: UnitItemService,
    protected unitTreeService: UnitTreeService
  ) {
    super(tableService, unitService, unitItemService, unitTreeService);
  }
}
