/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  DefaultRoutePageMetaResolver,
  TranslationService,
} from '@commerce-storefront-toolset/core';
import { Budget } from '@commerce-storefront-toolset/organization/administration/core';
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
