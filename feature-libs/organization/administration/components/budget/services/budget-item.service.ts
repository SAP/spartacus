import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import {
  Budget,
  BudgetService,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import { BudgetFormService } from '../form/budget-form.service';
import { CurrentBudgetService } from './current-budget.service';

@Injectable({
  providedIn: 'root',
})
export class BudgetItemService extends ItemService<Budget> {
  constructor(
    protected currentItemService: CurrentBudgetService,
    protected routingService: RoutingService,
    protected formService: BudgetFormService,
    protected budgetService: BudgetService
  ) {
    super(currentItemService, routingService, formService);
  }

  /**
   * @override
   * Returns the budget for the given code.
   *
   * Loads the budget each time, to ensure accurate data is resolved.
   */
  load(code: string): Observable<Budget> {
    this.budgetService.loadBudget(code);
    return this.budgetService.get(code);
  }

  update(code, value: Budget): Observable<OrganizationItemStatus<Budget>> {
    this.budgetService.update(code, value);
    return this.budgetService.getLoadingStatus(value.code);
  }

  protected create(value: Budget): Observable<OrganizationItemStatus<Budget>> {
    this.budgetService.create(value);
    return this.budgetService.getLoadingStatus(value.code);
  }

  /**
   * @override
   * Returns 'budgetDetails'
   */
  protected getDetailsRoute(): string {
    return 'orgBudgetDetails';
  }
}
