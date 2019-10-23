import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Budget } from '../../../model/budget.model';
import { BudgetAdapter } from './budget.adapter';
import { BudgetSearchConfig } from '../../model/search-config';

@Injectable({
  providedIn: 'root',
})
export class BudgetConnector {
  constructor(protected adapter: BudgetAdapter) {}

  get(userId: string, budgetCode: string): Observable<Budget> {
    return this.adapter.load(userId, budgetCode);
  }

  getMany(
    userId: string,
    params?: BudgetSearchConfig
  ): Observable<Budget[]> {
    return this.adapter.loadMany(userId, params);
  }

  create(userId: string, budget: Budget): Observable<Budget> {
    return this.adapter.create(userId, budget);
  }

  update(userId: string, budget: Budget): Observable<Budget> {
    return this.adapter.update(userId, budget);
  }
}
