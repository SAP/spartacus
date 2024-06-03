/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Converter, Occ, TimeUtils } from '@spartacus/core';
import { Budget } from '@spartacus/organization/administration/core';

@Injectable({
  providedIn: 'root',
})
export class OccBudgetNormalizer implements Converter<Occ.Budget, Budget> {
  convert(source: Occ.Budget, target?: Budget): Budget {
    if (target === undefined) {
      target = { ...(source as any) } as Budget;
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
