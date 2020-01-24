import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { BudgetAdapter } from '../../../organization/connectors/budget/budget.adapter';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { ConverterService } from '../../../util/converter.service';
import {
  BUDGET_NORMALIZER,
  BUDGETS_NORMALIZER,
} from '../../../organization/connectors/budget/converters';
import { B2BSearchConfig } from '../../../organization/model/search-config';
import { Occ } from '../../occ-models/occ.models';
import { Budget } from '../../../model/budget.model';
import BudgetsList = Occ.BudgetsList;

@Injectable()
export class OccBudgetAdapter implements BudgetAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(userId: string, budgetCode: string): Observable<Budget> {
    return this.http
      .get(this.getBudgetEndpoint(userId, budgetCode))
      .pipe(this.converter.pipeable(BUDGET_NORMALIZER));
  }

  loadList(userId: string, params?: B2BSearchConfig): Observable<BudgetsList> {
    return this.http
      .get<BudgetsList>(this.getBudgetsEndpoint(userId, params))
      .pipe(this.converter.pipeable(BUDGETS_NORMALIZER));
  }

  create(userId: string, budget: Budget): Observable<Budget> {
    return this.http
      .post<Budget>(this.getBudgetsEndpoint(userId), budget)
      .pipe(this.converter.pipeable(BUDGET_NORMALIZER));
  }

  update(
    userId: string,
    budgetCode: string,
    budget: Budget
  ): Observable<Budget> {
    return this.http
      .patch<Budget>(this.getBudgetEndpoint(userId, budgetCode), budget)
      .pipe(this.converter.pipeable(BUDGET_NORMALIZER));
  }

  protected getBudgetEndpoint(userId: string, budgetCode: string): string {
    return this.occEndpoints.getUrl('budget', { userId, budgetCode });
  }

  protected getBudgetsEndpoint(
    userId: string,
    params?: B2BSearchConfig
  ): string {
    return this.occEndpoints.getUrl('budgets', { userId }, params);
  }
}
