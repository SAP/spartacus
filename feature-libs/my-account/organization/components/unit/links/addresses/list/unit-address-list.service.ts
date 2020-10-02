import { Injectable } from '@angular/core';
import { Address, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationSubListService } from '../../../../shared/organization-sub-list/organization-sub-list.service';
import { OrganizationTableType } from '../../../../shared/organization.model';

@Injectable({
  providedIn: 'root',
})
export class UnitAddressListService extends OrganizationSubListService<
  Address
> {
  protected tableType = OrganizationTableType.UNIT_ADDRESS;
  protected domainType = OrganizationTableType.UNIT_ADDRESS;

  constructor(
    protected tableService: TableService,
    protected orgUnitService: OrgUnitService
  ) {
    super(tableService);
  }

  protected load(_, code: string): Observable<EntitiesModel<Address>> {
    return this.orgUnitService.getAddresses(code);
  }
}
