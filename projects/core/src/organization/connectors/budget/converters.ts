import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Budget } from '../../../model/budget.model';

export const BUDGET_NORMALIZER = new InjectionToken<Converter<any, Budget>>(
  'BudgetNormalizer'
);
