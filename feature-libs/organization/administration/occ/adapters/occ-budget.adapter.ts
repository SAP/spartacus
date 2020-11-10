import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  EntitiesModel,
  Occ,
  OccEndpointsService,
  SearchConfig,
} from '@spartacus/core';
import {
  Budget,
  BudgetAdapter,
  BUDGETS_NORMALIZER,
  BUDGET_NORMALIZER,
  BUDGET_SERIALIZER,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';

@Injectable()
export class OccBudgetAdapter implements BudgetAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(userId: string, budgetCode: string): Observable<Budget> {
    return this.http
      .get<Occ.Budget>(this.getBudgetEndpoint(userId, budgetCode))
      .pipe(this.converter.pipeable(BUDGET_NORMALIZER));
  }

  loadList(
    userId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<Budget>> {
    return this.http
      .get<Occ.BudgetsList>(this.getBudgetsEndpoint(userId, params))
      .pipe(this.converter.pipeable(BUDGETS_NORMALIZER));
  }

  create(userId: string, budget: Budget): Observable<Budget> {
    budget = (this.converter.convert(
      budget,
      BUDGET_SERIALIZER
    ) as unknown) as Budget;
    return this.http
      .post<Occ.Budget>(this.getBudgetsEndpoint(userId), budget)
      .pipe(this.converter.pipeable(BUDGET_NORMALIZER));
  }

  update(
    userId: string,
    budgetCode: string,
    budget: Budget
  ): Observable<Budget> {
    budget = (this.converter.convert(
      budget,
      BUDGET_SERIALIZER
    ) as unknown) as Budget;
    return this.http
      .patch<Occ.Budget>(this.getBudgetEndpoint(userId, budgetCode), budget)
      .pipe(this.converter.pipeable(BUDGET_NORMALIZER));
  }

  protected getBudgetEndpoint(userId: string, budgetCode: string): string {
    return this.occEndpoints.getUrl('budget', { userId, budgetCode });
  }

  protected getBudgetsEndpoint(userId: string, params?: SearchConfig): string {
    return this.occEndpoints.getUrl('budgets', { userId }, params);
  }
}
