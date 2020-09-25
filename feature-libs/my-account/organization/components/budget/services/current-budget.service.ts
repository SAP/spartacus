import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Budget, BudgetService } from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { ROUTE_PARAMS } from '../../constants';
import { CurrentOrganizationItemService } from '../../shared/current-organization-item.service';

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

  protected getDetailsRoute(): string {
    return 'budgetDetails';
  }

  protected getParamKey(): string {
    return ROUTE_PARAMS.budgetCode;
  }

  protected getItem(code: string): Observable<Budget> {
    return <any>(<Budget>this.budgetService.get(code));
  }
}
