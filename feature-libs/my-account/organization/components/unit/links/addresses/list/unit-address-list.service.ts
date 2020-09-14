import { Injectable } from '@angular/core';
import { B2BAddress, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { TableService } from '@spartacus/storefront';
import { OrganizationSubListService } from 'feature-libs/my-account/organization/components/shared';
import { OrganizationTableType } from 'feature-libs/my-account/organization/components/shared/organization.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnitAddressListService extends OrganizationSubListService<
  B2BAddress
> {
  protected tableType = OrganizationTableType.UNIT_ADDRESS;
  protected domainType = OrganizationTableType.UNIT_ADDRESS;

  constructor(
    protected tableService: TableService,
    protected orgUnitService: OrgUnitService
  ) {
    super(tableService);
  }

  protected load(_, code: string): Observable<EntitiesModel<B2BAddress>> {
    return this.orgUnitService.getAddresses(code);
  }
}
