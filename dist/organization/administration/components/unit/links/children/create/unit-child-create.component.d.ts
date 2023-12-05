import { Observable } from 'rxjs';
import { CurrentUnitService } from '../../../services/current-unit.service';
import * as i0 from "@angular/core";
export declare class UnitChildCreateComponent {
    protected unitService: CurrentUnitService;
    unitKey$: Observable<string>;
    constructor(unitService: CurrentUnitService);
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitChildCreateComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UnitChildCreateComponent, "cx-org-unit-child-create", never, {}, {}, never, never, false, never>;
}
