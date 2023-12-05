import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../../shared/organization.model';
import { UserPermissionListService } from '../user-permission-list.service';
import * as i0 from "@angular/core";
export declare class UserAssignedPermissionListService extends UserPermissionListService {
    protected tableType: OrganizationTableType;
    protected load(pagination: PaginationModel, code: string): Observable<EntitiesModel<B2BUser> | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserAssignedPermissionListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserAssignedPermissionListService>;
}
