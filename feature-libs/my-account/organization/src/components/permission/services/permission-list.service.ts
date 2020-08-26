import { Injectable } from '@angular/core';
import { EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserGroup } from '../../../core/model/user-group.model';
import { PermissionService } from '../../../core/services/permission.service';
import { OrganizationListService } from '../../shared/organization-list/organization-list.service';
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
export class PermissionListService extends OrganizationListService<
  PermissionModel
> {
  protected tableType = OrganizationTableType.PERMISSION;

  constructor(
    protected tableService: TableService,
    protected permissionsService: PermissionService
  ) {
    super(tableService);
  }

  protected load(
    structure: TableStructure,
    _params?
  ): Observable<EntitiesModel<PermissionModel>> {
    const paginationConfig = structure.options?.pagination;
    return this.permissionsService
      .getList(paginationConfig)
      .pipe(map((raw) => this.convertPermissions(raw)));
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
