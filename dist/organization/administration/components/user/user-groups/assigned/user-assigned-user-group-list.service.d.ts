import { EntitiesModel, PaginationModel } from '@spartacus/core';
import { UserGroup } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../../shared/organization.model';
import { UserUserGroupListService } from '../user-user-group-list.service';
import * as i0 from "@angular/core";
export declare class UserAssignedUserGroupListService extends UserUserGroupListService {
    protected tableType: OrganizationTableType;
    protected load(pagination: PaginationModel, code: string): Observable<EntitiesModel<UserGroup> | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserAssignedUserGroupListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserAssignedUserGroupListService>;
}
