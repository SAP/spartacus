import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StateWithOrganization } from '../store/organization-state';
import { BudgetActions } from '../store/actions/index';
import {
  getBudgetsState,
  getBudgetState,
} from '../store/selectors/budget.selector';
import { take } from 'rxjs/operators';
import { AuthService } from '../../auth/facade/auth.service';

@Injectable()
export class BudgetService {
  private user$ = this.authService.getOccUserId();

  constructor(
    protected store: Store<StateWithOrganization>,
    protected authService: AuthService
  ) {}

  loadBudget(budgetCode: string) {
    this.user$.pipe(take(1)).subscribe(uid =>
      this.store.dispatch(new BudgetActions.LoadBudget({ uid, budgetCode }))
    );
  }

  loadBudgets() {
    this.user$.pipe(take(1)).subscribe(uid =>
      this.store.dispatch(new BudgetActions.LoadBudgets(uid))
    );
  }

  getBudgets() {
    this.store.select(getBudgetsState);
  }

  getBudget(budgetCode: string) {
    this.store.select(getBudgetState(budgetCode));
  }
}
