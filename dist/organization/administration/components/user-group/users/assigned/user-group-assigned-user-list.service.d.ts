import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../../shared/organization.model';
import { UserGroupUserListService } from '../user-group-user-list.service';
import * as i0 from "@angular/core";
export declare class UserGroupAssignedUserListService extends UserGroupUserListService {
    protected tableType: OrganizationTableType;
    /**
     * @override
     * Load all b2b users assigned to the given user group
     */
    protected load(pagination: PaginationModel, code: string): Observable<EntitiesModel<B2BUser> | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserGroupAssignedUserListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserGroupAssignedUserListService>;
}
