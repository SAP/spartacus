import { Injectable } from '@angular/core';
import { Converter, Occ, Budget, TimeUtils } from '@spartacus/core';

@Injectable()
export class OccBudgetNormalizer implements Converter<Occ.Budget, Budget> {
  convert(source: Occ.Budget, target?: Budget): Budget {
    if (target === undefined) {
      target = {
        ...(source as any),
      };
    }

    if (source.startDate) {
      target.startDate = TimeUtils.convertDatetimeToDate(source.startDate);
    }

    if (source.endDate) {
      target.endDate = TimeUtils.convertDatetimeToDate(source.endDate);
    }

    return target;
  }
}
