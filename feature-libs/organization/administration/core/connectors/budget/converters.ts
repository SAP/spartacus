import { InjectionToken } from '@angular/core';
import { Budget } from '../../model/budget.model';
import { Converter, EntitiesModel } from '@spartacus/core';

export const BUDGET_NORMALIZER = new InjectionToken<Converter<any, Budget>>(
  'BudgetNormalizer'
);
export const BUDGETS_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<Budget>>
>('BudgetsListNormalizer');

export const BUDGET_SERIALIZER = new InjectionToken<Converter<Budget, any>>(
  'BudgetSerializer'
);
