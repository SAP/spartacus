import { Injectable } from '@angular/core';
import { BudgetAdapter } from '../../../organization/connectors/budget/budget.adapter';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { ConverterService } from '../../../util/converter.service';
import { BUDGET_NORMALIZER } from '../../../organization/connectors/budget/converters';
import { Budget } from '../../../model/budget.model';

@Injectable()
export class OccBudgetAdapter implements BudgetAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(userId: string, budgetCode: string): Observable<Budget> {
    return this.http
      .get(this.getEndpoint(userId,budgetCode))
      .pipe(this.converter.pipeable(BUDGET_NORMALIZER));
  }

  loadBudgets(): Observable<Budget[]> {
    return this.http
      .get(this.getEndpoint())
      .pipe(this.converter.pipeable(BUDGET_NORMALIZER));
  }

  protected getEndpoint(userId: string, budgetCode?: string): string {
    return this.occEndpoints.getUrl('budgets', {
      userId,
      budgetCode,
    });
  }

}
