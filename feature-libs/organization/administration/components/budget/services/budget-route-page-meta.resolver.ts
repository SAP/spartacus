/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  DefaultRoutePageMetaResolver,
  TranslationService,
} from '@spartacus/core';
import { Budget } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CurrentBudgetService } from './current-budget.service';

@Injectable({ providedIn: 'root' })
export class BudgetRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  protected currentItemService = inject(CurrentBudgetService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const translation = inject(TranslationService);

    super(translation);
  }

  protected getParams(): Observable<Budget | undefined> {
    return this.currentItemService.item$;
  }
}
