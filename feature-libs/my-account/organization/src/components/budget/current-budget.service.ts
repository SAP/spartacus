import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { BudgetService } from '../../core/index';
import { ROUTE_PARAMS } from '../constants';
import { CurrentOrganizationItemService } from '../shared/current-organization-item.service';
import { BudgetModel } from './list/budget-list.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentBudgetService extends CurrentOrganizationItemService<
  BudgetModel
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

  protected getItem(code: string): Observable<BudgetModel> {
    return <any>(<BudgetModel>this.budgetService.get(code));
  }
}
