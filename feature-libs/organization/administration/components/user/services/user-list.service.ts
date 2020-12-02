import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ListService } from '../../shared/list/list.service';
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
 * Service to populate User data to `Table` data. The user
 * data is driven by the table configuration, using the `OrganizationTables.USER`.
 */
@Injectable({
  providedIn: 'root',
})
export class UserListService extends ListService<UserModel> {
  protected tableType = OrganizationTableType.USER;

  constructor(
    protected tableService: TableService,
    protected userService: B2BUserService
  ) {
    super(tableService);
  }

  key(): string {
    return 'customerId';
  }

  protected load(
    pagination: PaginationModel
  ): Observable<EntitiesModel<UserModel>> {
    return this.userService.getList(pagination).pipe(
      filter((list) => Boolean(list)),
      map((raw) => this.convertUsers(raw))
    );
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
