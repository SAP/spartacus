import { Converter, Occ } from '@spartacus/core';
import { Budget } from '@spartacus/organization/administration/core';
import * as i0 from "@angular/core";
export declare class OccBudgetSerializer implements Converter<Budget, Occ.Budget> {
    constructor();
    convert(source: Budget, target?: Occ.Budget): Occ.Budget;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccBudgetSerializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccBudgetSerializer>;
}
