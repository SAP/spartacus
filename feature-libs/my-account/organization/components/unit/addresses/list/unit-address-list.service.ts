import { Injectable } from '@angular/core';
import { B2BAddress, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import {
  OrganizationListService,
  OrganizationTableType,
} from '../../../shared/index';

@Injectable({
  providedIn: 'root',
})
export class UnitAddressListService extends OrganizationListService<
  B2BAddress
> {
  protected tableType = OrganizationTableType.UNIT_MANAGE_ADDRESSES;

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
