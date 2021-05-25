import { Injectable } from '@angular/core';
import { Address, EntitiesModel, PaginationModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { SubListService } from '../../../../shared/sub-list/sub-list.service';
import { OrganizationTableType } from '../../../../shared/organization.model';

@Injectable({
  providedIn: 'root',
})
export class UnitAddressListService extends SubListService<Address> {
  protected tableType = OrganizationTableType.UNIT_ADDRESS;
  protected _domainType = OrganizationTableType.UNIT_ADDRESS;

  constructor(
    protected tableService: TableService,
    protected orgUnitService: OrgUnitService
  ) {
    super(tableService);
  }

  protected load(
    _pagination: PaginationModel,
    code: string
  ): Observable<EntitiesModel<Address>> {
    return this.orgUnitService.getAddresses(code);
  }
}
