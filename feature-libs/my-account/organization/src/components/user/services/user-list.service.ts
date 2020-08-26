import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { B2BUserService } from '../../../core/services/b2b-user.service';
import { OrganizationListService } from '../../shared/organization-list/organization-list.service';
import { OrganizationTableType } from '../../shared/organization.model';

/**
 * The UI model for the cost center, which is a slightly flattened version
 * of the core cost center model.
 */
export interface UserModel {
  uid?: string;
  name?: string;
  orgUnit?: any;
  roles?: string[];
}

/**
 * Service to populate Cost Center data to `Table` data. The cost center
 * data is driven by the table configuration, using the `OrganizationTables.COST_CENTER`.
 */
@Injectable({
  providedIn: 'root',
})
export class UserListService extends OrganizationListService<UserModel> {
  protected tableType = OrganizationTableType.USER;

  constructor(
    protected tableService: TableService,
    protected userService: B2BUserService
  ) {
    super(tableService);
  }

  protected load(
    structure: TableStructure,
    _params?
  ): Observable<EntitiesModel<UserModel>> {
    const paginationConfig = structure.options?.pagination;
    return this.userService
      .getList(paginationConfig)
      .pipe(map((raw) => this.convertUsers(raw)));
  }

  /**
   * Populates the cost center data to a convenient table data model, so that we
   * can skip specific conversion in the view logic where possible.
   */
  protected convertUsers({
    pagination,
    sorts,
    values,
  }: EntitiesModel<B2BUser>): EntitiesModel<UserModel> {
    const userModels: EntitiesModel<UserModel> = {
      pagination,
      sorts,
      values: values.map((value: any) => ({
        ...value,
        unit: value.orgUnit,
      })),
    };
    return userModels;
  }
}
