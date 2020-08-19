import { Injectable } from '@angular/core';
import { BUDGET_NORMALIZER } from '../../../../connectors/budget/converters';
import { Budget } from '../../../../model/budget.model';
import {
  EntitiesModel,
  Converter,
  Occ,
  ConverterService,
} from '@spartacus/core';

@Injectable()
export class OccBudgetListNormalizer
  implements Converter<Occ.BudgetsList, EntitiesModel<Budget>> {
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.BudgetsList,
    target?: EntitiesModel<Budget>
  ): EntitiesModel<Budget> {
    if (target === undefined) {
      target = {
        ...(source as any),
        values: source.budgets.map((budget) => ({
          ...this.converter.convert(budget, BUDGET_NORMALIZER),
        })),
      };
    }
    return target;
  }
}
