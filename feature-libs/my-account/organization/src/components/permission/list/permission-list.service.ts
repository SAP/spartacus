import { Injectable } from '@angular/core';
import { UserGroup, EntitiesModel, PermissionService } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseOrganizationListService } from '../../shared/base-organization-list.service';
import { OrganizationTableType } from '../../shared/organization.model';

/**
 * The UI model for the cost center, which is a slightly flattened version
 * of the core cost center model.
 */
export interface PermissionModel {
  code?: string;
  orderApprovalPermissionType?: string;
  threshold?: any;
  periodRange?: any;
  orgUnit?: any;
}

/**
 * Service to populate Cost Center data to `Table` data. The cost center
 * data is driven by the table configuration, using the `OrganizationTables.COST_CENTER`.
 */
@Injectable({
  providedIn: 'root',
})
export class PermissionListService extends BaseOrganizationListService<
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
    const paginationConfig = structure.pagination;
    return this.permissionsService
      .getList(paginationConfig)
      .pipe(map((raw) => this.convertPermissions(raw)));
  }

  /**
   * Populates the cost center data to a convenient table data model, so that we
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
      })),
    };
    return permissionGroupModels;
  }
}
