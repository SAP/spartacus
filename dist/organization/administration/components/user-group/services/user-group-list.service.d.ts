import { EntitiesModel, PaginationModel } from '@spartacus/core';
import { UserGroup, UserGroupService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ListService } from '../../shared/list/list.service';
import { OrganizationTableType } from '../../shared/organization.model';
import * as i0 from "@angular/core";
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
export declare class UserGroupListService extends ListService<UserGroupModel> {
    protected tableService: TableService;
    protected userGroupService: UserGroupService;
    protected tableType: OrganizationTableType;
    constructor(tableService: TableService, userGroupService: UserGroupService);
    key(): string;
    protected load(pagination: PaginationModel): Observable<EntitiesModel<UserGroupModel>>;
    /**
     * Populates the cost center data to a convenient table data model, so that we
     * can skip specific conversion in the view logic where possible.
     */
    protected convertUserGroups({ pagination, sorts, values, }: EntitiesModel<UserGroup>): EntitiesModel<UserGroupModel>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserGroupListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserGroupListService>;
}
