import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {
  ConverterService,
  CostCenter,
  EntitiesModel,
  Occ,
  OccEndpointsService,
} from '@spartacus/core';
import {
  B2BSearchConfig,
  Budget,
  BUDGETS_NORMALIZER,
  COST_CENTER_NORMALIZER,
  COST_CENTERS_NORMALIZER,
  CostCenterAdapter,
} from '@spartacus/my-account/organization/core';

@Injectable()
export class OccCostCenterAdapter implements CostCenterAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(userId: string, costCenterCode: string): Observable<CostCenter> {
    return this.http
      .get<Occ.CostCenter>(this.getCostCenterEndpoint(userId, costCenterCode))
      .pipe(this.converter.pipeable(COST_CENTER_NORMALIZER));
  }

  loadList(
    userId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<CostCenter>> {
    return this.http
      .get<Occ.CostCentersList>(this.getAllCostCentersEndpoint(userId, params))
      .pipe(this.converter.pipeable(COST_CENTERS_NORMALIZER));
  }

  create(userId: string, costCenter: CostCenter): Observable<CostCenter> {
    return this.http
      .post<Occ.CostCenter>(this.getCostCentersEndpoint(userId), costCenter)
      .pipe(this.converter.pipeable(COST_CENTER_NORMALIZER));
  }

  update(
    userId: string,
    costCenterCode: string,
    costCenter: CostCenter
  ): Observable<CostCenter> {
    return this.http
      .patch<Occ.CostCenter>(
        this.getCostCenterEndpoint(userId, costCenterCode),
        costCenter
      )
      .pipe(this.converter.pipeable(COST_CENTER_NORMALIZER));
  }

  loadBudgets(
    userId: string,
    costCenterCode: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<Budget>> {
    return this.http
      .get<Occ.BudgetsList>(
        this.getBudgetsEndpoint(userId, costCenterCode, params)
      )
      .pipe(this.converter.pipeable(BUDGETS_NORMALIZER));
  }

  assignBudget(
    userId: string,
    costCenterCode: string,
    budgetCode: string
  ): Observable<any> {
    return this.http.post<any>(
      this.getBudgetsEndpoint(userId, costCenterCode, { budgetCode }),
      null
    );
  }

  unassignBudget(
    userId: string,
    costCenterCode: string,
    budgetCode: string
  ): Observable<any> {
    return this.http.delete<any>(
      this.getBudgetEndpoint(userId, costCenterCode, budgetCode)
    );
  }

  protected getCostCenterEndpoint(
    userId: string,
    costCenterCode: string
  ): string {
    return this.occEndpoints.getUrl('costCenter', { userId, costCenterCode });
  }

  protected getCostCentersEndpoint(
    userId: string,
    params?: B2BSearchConfig
  ): string {
    return this.occEndpoints.getUrl('costCenters', { userId }, params);
  }

  protected getAllCostCentersEndpoint(
    userId: string,
    params?: B2BSearchConfig
  ): string {
    return this.occEndpoints.getUrl('costCentersAll', { userId }, params);
  }

  protected getBudgetsEndpoint(
    userId: string,
    costCenterCode: string,
    params?: B2BSearchConfig | { budgetCode: string }
  ): string {
    return this.occEndpoints.getUrl(
      'costCenterBudgets',
      { userId, costCenterCode },
      params
    );
  }

  protected getBudgetEndpoint(
    userId: string,
    costCenterCode: string,
    budgetCode: string
  ): string {
    return this.occEndpoints.getUrl('costCenterBudget', {
      userId,
      costCenterCode,
      budgetCode,
    });
  }
}
