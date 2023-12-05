import { EntitiesModel, PaginationModel } from '@spartacus/core';
import { PermissionService, UserGroup } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ListService } from '../../shared/list/list.service';
import { OrganizationTableType } from '../../shared/organization.model';
import * as i0 from "@angular/core";
/**
 * The UI model for the permission, which is a slightly flattened version
 * of the permission model.
 */
export interface PermissionModel {
    code?: string;
    orderApprovalPermissionType?: {
        name: string;
    };
    threshold?: any;
    periodRange?: any;
    orgUnit?: any;
    currency?: {
        symbol: string;
    };
}
/**
 * Service to populate permission data to `Table` data. The permission
 * data is driven by the table configuration, using the `OrganizationTables.PERMISSION`.
 */
export declare class PermissionListService extends ListService<PermissionModel> {
    protected tableService: TableService;
    protected permissionsService: PermissionService;
    protected tableType: OrganizationTableType;
    constructor(tableService: TableService, permissionsService: PermissionService);
    protected load(pagination: PaginationModel): Observable<EntitiesModel<PermissionModel>>;
    /**
     * Populates the permission data to a convenient table data model, so that we
     * can skip specific conversion in the view logic where possible.
     */
    protected convertPermissions({ pagination, sorts, values, }: EntitiesModel<UserGroup>): EntitiesModel<PermissionModel>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PermissionListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PermissionListService>;
}
