import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Budget, BudgetService } from '../../core/index';
import { ROUTE_PARAMS } from '../constants';
import { CurrentItemService } from '../shared/current-item.service';

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

  protected getParam() {
    return ROUTE_PARAMS.budgetCode;
  }

  protected getModel(code: string): Observable<Budget> {
    return this.budgetService.get(code);
  }
}
