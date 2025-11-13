/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import {
  Budget,
  BudgetService,
} from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { Observable } from 'rxjs';
import { CurrentItemService } from '../../shared/current-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentBudgetService extends CurrentItemService<Budget> {
  protected routingService: RoutingService;
  protected budgetService = inject(BudgetService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const routingService = inject(RoutingService);

    super(routingService);
  
    this.routingService = routingService;
  }

  protected getDetailsRoute(): string {
    return 'orgBudgetDetails';
  }

  protected getParamKey() {
    return ROUTE_PARAMS.budgetCode;
  }

  protected getItem(code: string): Observable<Budget> {
    return this.budgetService.get(code);
  }

  getError(code: string): Observable<boolean> {
    return this.budgetService.getErrorState(code);
  }
}
