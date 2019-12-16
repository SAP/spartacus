import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { BUDGET_NORMALIZER } from '../../../../organization/connectors/budget/converters';
import { BudgetListModel } from '../../../../model/budget.model';

@Injectable()
export class OccBudgetListNormalizer
  implements Converter<Occ.BudgetsList, BudgetListModel> {
  constructor(private converter: ConverterService) {}

  convert(source: Occ.BudgetsList, target?: BudgetListModel): BudgetListModel {
    if (target === undefined) {
      target = {
        ...(source as any),
        budgets: source.budgets.map(budget => ({
          ...this.converter.convert(budget, BUDGET_NORMALIZER),
        })),
      };
    }
    return target;
  }
}
