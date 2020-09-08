import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Budget, BudgetService } from '@spartacus/my-account/organization/core';
import { ROUTE_PARAMS } from '../constants';
import { CurrentOrganizationItemService } from '../shared/current-organization-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentBudgetService extends CurrentOrganizationItemService<
  Budget
> {
  constructor(
    protected routingService: RoutingService,
    protected budgetService: BudgetService
  ) {
    super(routingService);
  }

  protected getParamKey() {
    return ROUTE_PARAMS.budgetCode;
  }

  protected getItem(code: string): Observable<Budget> {
    return this.budgetService.get(code);
  }
}
