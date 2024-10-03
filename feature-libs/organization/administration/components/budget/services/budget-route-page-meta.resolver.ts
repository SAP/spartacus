/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  DefaultRoutePageMetaResolver,
  TranslationService,
} from '@spartacus/core';
import { Budget } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CurrentBudgetService } from './current-budget.service';

@Injectable({ providedIn: 'root' })
export class BudgetRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  constructor(
    translation: TranslationService,
    protected currentItemService: CurrentBudgetService
  ) {
    super(translation);
  }

  protected getParams(): Observable<Budget | undefined> {
    return this.currentItemService.item$;
  }
}
