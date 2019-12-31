import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Budget } from '../../../model/budget.model';
import { BudgetAdapter } from './budget.adapter';
import { BudgetSearchConfig } from '../../model/search-config';
import { Occ } from '../../../occ/occ-models/occ.models';
import BudgetsList = Occ.BudgetsList;

@Injectable({
  providedIn: 'root',
})
export class BudgetConnector {
  constructor(protected adapter: BudgetAdapter) {}

  get(userId: string, budgetCode: string): Observable<Budget> {
    return this.adapter.load(userId, budgetCode);
  }

  getList(
    userId: string,
    params?: BudgetSearchConfig
  ): Observable<BudgetsList> {
    return this.adapter.loadList(userId, params);
  }

  create(userId: string, budget: Budget): Observable<Budget> {
    return this.adapter.create(userId, budget);
  }

  update(
    userId: string,
    budgetCode: string,
    budget: Budget
  ): Observable<Budget> {
    return this.adapter.update(userId, budgetCode, budget);
  }
}
