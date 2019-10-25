import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import {
  Converter,
  // ConverterService,
} from '../../../../util/converter.service';
// import { BUDGET_NORMALIZER } from '../../../../organization/connectors/budget/converters';
import { Budget } from '../../../../model/budget.model';

@Injectable()
export class OccBudgetNormalizer implements Converter<Occ.Budget, Budget> {
  // constructor(private converter: ConverterService) {}
  constructor() {}

  convert(source: Occ.Budget, target?: Budget): Budget {
    if (target === undefined) {
      target = { ...(source as any) };
    }

    // if (source && source.costCenters) {
    //   target.costCenters = source.costCenters.map(entry => ({
    //     ...entry,
    //     product: this.converter.convert(entry, COST_CENTER_NORMALIZER),
    //   }));
    // }
    return target;
  }

}
