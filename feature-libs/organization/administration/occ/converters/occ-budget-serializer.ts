import { Injectable } from '@angular/core';
import { Converter, Occ, TimeUtils } from '@spartacus/core';
import { Budget } from '@spartacus/organization/administration/core';

@Injectable({ providedIn: 'root' })
export class OccBudgetSerializer implements Converter<Budget, Occ.Budget> {
  constructor() {}

  convert(source: Budget, target?: Occ.Budget): Occ.Budget {
    if (target === undefined) {
      target = { ...(source as any) };
    }

    if (source.startDate) {
      target.startDate = TimeUtils.convertDateToDatetime(source.startDate);
    }

    if (source.endDate) {
      target.endDate = TimeUtils.convertDateToDatetime(source.endDate, true);
    }

    return target;
  }
}
