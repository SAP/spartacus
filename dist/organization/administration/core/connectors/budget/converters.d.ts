import { InjectionToken } from '@angular/core';
import { Budget } from '../../model/budget.model';
import { Converter, EntitiesModel } from '@spartacus/core';
export declare const BUDGET_NORMALIZER: InjectionToken<Converter<any, Budget>>;
export declare const BUDGETS_NORMALIZER: InjectionToken<Converter<any, EntitiesModel<Budget>>>;
export declare const BUDGET_SERIALIZER: InjectionToken<Converter<Budget, any>>;
