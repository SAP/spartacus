import { Injectable } from '@angular/core';
import { Budget, BudgetService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ROUTE_PARAMS } from '../constants';
import { BaseCurrentService } from '../shared/base-current.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentBudgetService extends BaseCurrentService<Budget> {
  paramCode = ROUTE_PARAMS.budgetCode;

  constructor(
    protected routingService: RoutingService,
    protected budgetService: BudgetService
  ) {
    super(routingService);
  }

  getModel(code: string): Observable<Budget> {
    return this.budgetService.get(code);
  }
}
