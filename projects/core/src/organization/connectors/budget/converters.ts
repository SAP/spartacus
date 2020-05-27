import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Budget } from '../../../model/budget.model';
import { EntitiesModel } from '../../../model/misc.model';

export const BUDGET_NORMALIZER = new InjectionToken<Converter<any, Budget>>(
  'BudgetNormalizer'
);
export const BUDGETS_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<Budget>>
>('BudgetsListNormalizer');
