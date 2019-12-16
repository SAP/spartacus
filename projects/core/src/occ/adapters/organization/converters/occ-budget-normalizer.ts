import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import {
  Converter,
} from '../../../../util/converter.service';
import { Budget } from '../../../../model/budget.model';

@Injectable()
export class OccBudgetNormalizer implements Converter<Occ.Budget, Budget> {
  constructor() {}

  convert(source: Occ.Budget, target?: Budget): Budget {
    if (target === undefined) {
      target = {
        ...(source as any),
        // startDate: source.startDate.split('T')[0],
        // endDate: source.endDate.split('T')[0],
      };
    }
    return target;
  }
}
