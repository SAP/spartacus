import { Injectable } from '@angular/core';
import { EntitiesModel, PaginationModel } from '@spartacus/core';
import {
  UserGroup,
  UserGroupService,
} from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ListService } from '../../shared/list/list.service';
import { OrganizationTableType } from '../../shared/organization.model';
/**
 * The UI model for the cost center, which is a slightly flattened version
 * of the core cost center model.
 */
export interface UserGroupModel {
  uid?: string;
  name?: string;
  orgUnit?: any;
}

/**
 * Service to populate Cost Center data to `Table` data. The cost center
 * data is driven by the table configuration, using the `OrganizationTables.COST_CENTER`.
 */
@Injectable({
  providedIn: 'root',
})
export class UserGroupListService extends ListService<UserGroupModel> {
  protected tableType = OrganizationTableType.USER_GROUP;

  constructor(
    protected tableService: TableService,
    protected userGroupService: UserGroupService
  ) {
    super(tableService);
  }

  key(): string {
    return 'uid';
  }

  protected load(
    pagination: PaginationModel
  ): Observable<EntitiesModel<UserGroupModel>> {
    return this.userGroupService.getList(pagination).pipe(
      filter((list) => Boolean(list)),
      map((raw) => this.convertUserGroups(raw))
    );
  }

  /**
   * Populates the cost center data to a convenient table data model, so that we
   * can skip specific conversion in the view logic where possible.
   */
  protected convertUserGroups({
    pagination,
    sorts,
    values,
  }: EntitiesModel<UserGroup>): EntitiesModel<UserGroupModel> {
    const userGroupModels: EntitiesModel<UserGroupModel> = {
      pagination,
      sorts,
      values: values.map((value: any) => ({
        ...value,
        unit: value.orgUnit,
      })),
    };
    return userGroupModels;
  }
}
