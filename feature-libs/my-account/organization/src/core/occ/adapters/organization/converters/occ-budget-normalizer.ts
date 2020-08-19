import { Injectable } from '@angular/core';
import { Budget } from '../../../../model/budget.model';
import { Converter, Occ } from '@spartacus/core';

@Injectable()
export class OccBudgetNormalizer implements Converter<Occ.Budget, Budget> {
  convert(source: Occ.Budget, target?: Budget): Budget {
    if (target === undefined) {
      target = {
        ...(source as any),
      };
    }
    return target;
  }
}
