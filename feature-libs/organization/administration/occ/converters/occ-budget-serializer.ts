/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Converter, Occ, TimeUtils } from '@commerce-storefront-toolset/core';
import { Budget } from '@commerce-storefront-toolset/organization/administration/core';

@Injectable({ providedIn: 'root' })
export class OccBudgetSerializer implements Converter<Budget, Occ.Budget> {
  constructor() {
    // Intentional empty constructor
  }

  convert(source: Budget, target?: Occ.Budget): Occ.Budget {
    if (target === undefined) {
      target = { ...(source as any) } as Occ.Budget;
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
