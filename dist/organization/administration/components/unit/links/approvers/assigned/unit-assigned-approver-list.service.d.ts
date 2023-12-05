import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../../../shared/index';
import { UnitApproverListService } from '../unit-approver-list.service';
import * as i0 from "@angular/core";
export declare class UnitAssignedApproverListService extends UnitApproverListService {
    protected tableType: OrganizationTableType;
    protected load(pagination: PaginationModel, code: string): Observable<EntitiesModel<B2BUser> | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitAssignedApproverListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitAssignedApproverListService>;
}
