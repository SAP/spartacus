import { Converter, ConverterService, EntitiesModel, Occ } from '@spartacus/core';
import { Budget } from '@spartacus/organization/administration/core';
import * as i0 from "@angular/core";
export declare class OccBudgetListNormalizer implements Converter<Occ.BudgetsList, EntitiesModel<Budget>> {
    private converter;
    constructor(converter: ConverterService);
    convert(source: Occ.BudgetsList, target?: EntitiesModel<Budget>): EntitiesModel<Budget>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccBudgetListNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccBudgetListNormalizer>;
}
