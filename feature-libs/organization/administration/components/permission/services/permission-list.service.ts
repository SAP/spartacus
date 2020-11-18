import { Injectable } from '@angular/core';
import { EntitiesModel, PaginationModel } from '@spartacus/core';
import {
  PermissionService,
  UserGroup,
} from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ListService } from '../../shared/list/list.service';
import { OrganizationTableType } from '../../shared/organization.model';

/**
 * The UI model for the permission, which is a slightly flattened version
 * of the permission model.
 */
export interface PermissionModel {
  code?: string;
  orderApprovalPermissionType?: { name: string };
  threshold?: any;
  periodRange?: any;
  orgUnit?: any;
  currency?: { symbol: string };
}

/**
 * Service to populate permission data to `Table` data. The permission
 * data is driven by the table configuration, using the `OrganizationTables.PERMISSION`.
 */
@Injectable({
  providedIn: 'root',
})
export class PermissionListService extends ListService<PermissionModel> {
  protected tableType = OrganizationTableType.PERMISSION;

  constructor(
    protected tableService: TableService,
    protected permissionsService: PermissionService
  ) {
    super(tableService);
  }

  protected load(
    pagination: PaginationModel
  ): Observable<EntitiesModel<PermissionModel>> {
    return this.permissionsService.getList(pagination).pipe(
      filter((list) => Boolean(list)),
      map((raw) => this.convertPermissions(raw))
    );
  }

  /**
   * Populates the permission data to a convenient table data model, so that we
   * can skip specific conversion in the view logic where possible.
   */
  protected convertPermissions({
    pagination,
    sorts,
    values,
  }: EntitiesModel<UserGroup>): EntitiesModel<PermissionModel> {
    const permissionGroupModels: EntitiesModel<PermissionModel> = {
      pagination,
      sorts,
      values: values.map((value: any) => ({
        ...value,
        unit: value.orgUnit,
      })),
    };
    return permissionGroupModels;
  }
}
