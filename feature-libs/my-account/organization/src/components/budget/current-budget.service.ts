import { Injectable } from '@angular/core';
import { Budget, BudgetService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ROUTE_PARAMS } from '../constants';
import { CurrentOrganizationService } from '../shared/base-current.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentBudgetService extends CurrentOrganizationService<Budget> {
  constructor(
    protected routingService: RoutingService,
    protected budgetService: BudgetService
  ) {
    super(routingService);
  }

  protected getParam() {
    return ROUTE_PARAMS.budgetCode;
  }

  protected getModel(code: string): Observable<Budget> {
    return this.budgetService.get(code);
  }
}
