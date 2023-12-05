import { Observable } from 'rxjs';
import { CurrentUnitService } from '../../../services/current-unit.service';
import * as i0 from "@angular/core";
export declare class UnitUserCreateComponent {
    protected unitService: CurrentUnitService;
    unitKey$: Observable<string>;
    constructor(unitService: CurrentUnitService);
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitUserCreateComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UnitUserCreateComponent, "cx-org-unit-user-create", never, {}, {}, never, never, false, never>;
}
