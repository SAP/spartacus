import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { BUDGET_NORMALIZER } from '../../../../organization/connectors/budget/converters';
import { EntitiesModel } from '../../../../model/misc.model';
import { Budget } from '../../../../model/budget.model';

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
