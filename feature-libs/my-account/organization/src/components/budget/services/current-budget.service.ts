import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Budget, BudgetService } from '../../../core/index';
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

  load(code: string): Observable<Budget> {
    this.budgetService.loadBudget(code);
    return this.budgetService.get(code);
  }

  protected update(code, value: Budget) {
    this.budgetService.update(code, value);
  }

  protected create(value: Budget) {
    this.budgetService.create(value);
  }

  protected getDetailsRoute(): string {
    return 'budgetDetails';
  }

  protected getParamKey() {
    return ROUTE_PARAMS.budgetCode;
  }

  protected getItem(code: string): Observable<Budget> {
    return <any>(<Budget>this.budgetService.get(code));
  }
}
