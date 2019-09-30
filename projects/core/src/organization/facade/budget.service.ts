import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StateWithOrganization } from '../store/organization-state';
import { UserService } from '../../user/facade/user.service';
import { BudgetActions } from '../store/actions/index';
import { getBudgetsState, getBudgetState } from '../store/selectors/budget.selector';

@Injectable()
export class BudgetService {
  constructor(
    protected store: Store<StateWithOrganization>,
    protected userService: UserService
  ) {}

  // private budgetManagment: { [code: string]: Observable<Budget> } = {};

  loadBudget(budgetId: string) {
    this.store.dispatch(
      new BudgetActions.LoadBudget({ uid: this.userService.uid, code: budgetId })
    );
  }

  loadBudgets() {
    this.store.dispatch(new BudgetActions.LoadBudgets(this.userService.uid));
  }

  getBudgets() {
    this.store.select(getBudgetsState);
  }

  getBudget(budgetCode: string) {
    this.store.select(getBudgetState(budgetCode));
  }
}
