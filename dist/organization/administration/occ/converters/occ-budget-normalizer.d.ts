import { Converter, Occ } from '@spartacus/core';
import { Budget } from '@spartacus/organization/administration/core';
import * as i0 from "@angular/core";
export declare class OccBudgetNormalizer implements Converter<Occ.Budget, Budget> {
    convert(source: Occ.Budget, target?: Budget): Budget;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccBudgetNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccBudgetNormalizer>;
}
