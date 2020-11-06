import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationSubListService } from '../../../../shared/organization-sub-list/organization-sub-list.service';
import { OrganizationTableType } from '../../../../shared/organization.model';
import { map } from 'rxjs/operators';

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
    _pagination: PaginationModel,
    code: string
  ): Observable<EntitiesModel<B2BUser>> {
    return this.unitService.getAssociatedUsers(code).pipe(
      map((wrapper) => {
        return {
          // forcing to override `selected` prop in objects coming from backend to avoid breaking UI
          // this is dictated by change of information source from store to specific entity object
          values: wrapper.values.map((customer) => {
            return { ...customer, selected: true };
          }),
        };
      })
    );
  }
}
