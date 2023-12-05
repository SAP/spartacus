import { Observable } from 'rxjs';
import { CurrentUnitService } from '../../../services/current-unit.service';
import * as i0 from "@angular/core";
export declare class UnitCostCenterCreateComponent {
    protected unitService: CurrentUnitService;
    unitKey$: Observable<string>;
    constructor(unitService: CurrentUnitService);
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitCostCenterCreateComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UnitCostCenterCreateComponent, "cx-org-unit-cost-center-create", never, {}, {}, never, never, false, never>;
}
