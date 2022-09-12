/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { RoutingService } from '@commerce-storefront-toolset/core';
import {
  Budget,
  BudgetService,
} from '@commerce-storefront-toolset/organization/administration/core';
import { ROUTE_PARAMS } from '@commerce-storefront-toolset/organization/administration/root';
import { Observable } from 'rxjs';
import { CurrentItemService } from '../../shared/current-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentBudgetService extends CurrentItemService<Budget> {
  constructor(
    protected routingService: RoutingService,
    protected budgetService: BudgetService
  ) {
    super(routingService);
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
