import { EntitiesModel, PaginationModel } from '@spartacus/core';
import { Permission } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../../shared/organization.model';
import { UserGroupPermissionListService } from '../user-group-permission-list.service';
import * as i0 from "@angular/core";
export declare class UserGroupAssignedPermissionsListService extends UserGroupPermissionListService {
    protected tableType: OrganizationTableType;
    /**
     * @override
     * Load all b2b users assigned to the given user group
     */
    protected load(pagination: PaginationModel, code: string): Observable<EntitiesModel<Permission> | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserGroupAssignedPermissionsListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserGroupAssignedPermissionsListService>;
}
