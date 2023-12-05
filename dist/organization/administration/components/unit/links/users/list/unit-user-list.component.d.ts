import { B2BUnit } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentUnitService } from '../../../services/current-unit.service';
import { B2BUserService } from '@spartacus/organization/administration/core';
import * as i0 from "@angular/core";
export declare class UnitUserListComponent {
    protected currentUnitService: CurrentUnitService;
    protected b2bUserService: B2BUserService;
    routerKey: string;
    unit$: Observable<B2BUnit | undefined>;
    isUpdatingUserAllowed: boolean;
    constructor(currentUnitService: CurrentUnitService, b2bUserService: B2BUserService);
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitUserListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UnitUserListComponent, "cx-org-unit-user-list", never, {}, {}, never, never, false, never>;
}
