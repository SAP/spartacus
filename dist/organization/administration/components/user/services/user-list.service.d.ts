import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ListService } from '../../shared/list/list.service';
import { OrganizationTableType } from '../../shared/organization.model';
import * as i0 from "@angular/core";
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
export declare class UserListService extends ListService<UserModel> {
    protected tableService: TableService;
    protected userService: B2BUserService;
    protected tableType: OrganizationTableType;
    constructor(tableService: TableService, userService: B2BUserService);
    key(): string;
    protected load(pagination: PaginationModel): Observable<EntitiesModel<UserModel>>;
    /**
     * Populates the cost center data to a convenient table data model, so that we
     * can skip specific conversion in the view logic where possible.
     */
    protected convertUsers({ pagination, sorts, values, }: EntitiesModel<B2BUser>): EntitiesModel<UserModel>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserListService>;
}
