import { Injectable } from '@angular/core';
import {
  OrganizationTableType,
  UnitListService,
} from '@spartacus/organization/administration/components';
@Injectable({
  providedIn: 'root',
})
export class AccountSummaryUnitListService extends UnitListService {
  protected tableType = OrganizationTableType.ACCOUNT_SUMMARY_UNIT as any;
}
