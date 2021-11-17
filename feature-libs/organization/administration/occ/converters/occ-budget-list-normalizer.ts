import { Injectable } from '@angular/core';
import {
  Converter,
  ConverterService,
  EntitiesModel,
  Occ,
} from '@spartacus/core';
import {
  Budget,
  BUDGET_NORMALIZER,
} from '@spartacus/organization/administration/core';

@Injectable({
  providedIn: 'root',
})
export class OccBudgetListNormalizer
  implements Converter<Occ.BudgetsList, EntitiesModel<Budget>>
{
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.BudgetsList,
    target?: EntitiesModel<Budget>
  ): EntitiesModel<Budget> {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    target.values = source.budgets.map((budget) => ({
      ...this.converter.convert(budget, BUDGET_NORMALIZER),
    }));
    return target;
  }
}
