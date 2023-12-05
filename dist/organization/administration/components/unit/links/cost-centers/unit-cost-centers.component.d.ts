import { B2BUnit } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentUnitService } from '../../services/current-unit.service';
import * as i0 from "@angular/core";
export declare class UnitCostCenterListComponent {
    protected currentUnitService: CurrentUnitService;
    unit$: Observable<B2BUnit | undefined>;
    constructor(currentUnitService: CurrentUnitService);
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitCostCenterListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UnitCostCenterListComponent, "cx-org-unit-cost-centers", never, {}, {}, never, never, false, never>;
}
