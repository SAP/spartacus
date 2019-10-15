import { Injectable } from '@angular/core';
import { BudgetAdapter } from '../../../organization/connectors/budget/budget.adapter';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { ConverterService } from '../../../util/converter.service';
import { BUDGET_NORMALIZER } from '../../../organization/connectors/budget/converters';
import { Budget } from '../../../model/budget.model';
import { pluck } from 'rxjs/operators';

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

  loadMany(
    userId: string,
    pageSize: number,
    currentPage: number,
    sort: string,
    fields: string
  ): Observable<Budget[]> {
    return this.http
      .get(
        this.getBudgetsEndpoint(userId, { pageSize, currentPage, sort, fields })
      )
      .pipe(
        pluck('budgets'),
        this.converter.pipeableMany(BUDGET_NORMALIZER)
      );
  }

  post(userId: string, budget: Budget): Observable<Budget> {
    return this.http
      .post<Budget>(this.getBudgetsEndpoint(userId), budget)
      .pipe(this.converter.pipeable(BUDGET_NORMALIZER));
  }

  patch(userId: string, budget: Budget): Observable<Budget> {
    return this.http
      .patch<Budget>(this.getBudgetEndpoint(userId, budget.code), budget)
      .pipe(this.converter.pipeable(BUDGET_NORMALIZER));
  }

  protected getBudgetEndpoint(userId: string, budgetCode: string): string {
    return this.occEndpoints.getUrl('budget', { userId, budgetCode });
  }

  protected getBudgetsEndpoint(userId: string, params?): string {
    return this.occEndpoints.getUrl('budgets', { userId }, params);
  }
}
