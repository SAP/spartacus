import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StateWithOrganization } from '../store/organization-state';
import { Budget } from '../../model/budget.model';
import { UserService } from '../../user/facade/user.service';
import { BudgetActions } from '../store/actions/index';

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

  get() {
    this.store.select();
  }
}
