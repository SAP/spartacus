import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../../shared/organization.model';
import { UserApproverListService } from '../user-approver-list.service';
import * as i0 from "@angular/core";
export declare class UserAssignedApproverListService extends UserApproverListService {
    protected tableType: OrganizationTableType;
    protected load(pagination: PaginationModel, code: string): Observable<EntitiesModel<B2BUser> | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserAssignedApproverListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserAssignedApproverListService>;
}
