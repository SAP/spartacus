import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EntitiesModel, CostCenter, normalizeHttpError } from '@spartacus/core';
import { CostCenterActions, BudgetActions } from '../actions/index';
import { normalizeListPage } from '../../utils/serializer';
import { Budget } from '../../model/budget.model';
import { CostCenterConnector } from '../../connectors/cost-center/cost-center.connector';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CostCenterEffects {
  @Effect()
  loadCostCenter$: Observable<
    | CostCenterActions.LoadCostCenterSuccess
    | CostCenterActions.LoadCostCenterFail
  > = this.actions$.pipe(
    ofType(CostCenterActions.LOAD_COST_CENTER),
    map((action: CostCenterActions.LoadCostCenter) => action.payload),
    switchMap(({ userId, costCenterCode }) => {
      return this.costCenterConnector.get(userId, costCenterCode).pipe(
        map((costCenter: CostCenter) => {
          return new CostCenterActions.LoadCostCenterSuccess([costCenter]);
        }),
        catchError((error: HttpErrorResponse) =>
          of(
            new CostCenterActions.LoadCostCenterFail({
              costCenterCode,
              error: normalizeHttpError(error),
            })
          )
        )
      );
    })
  );

  @Effect()
  loadCostCenters$: Observable<
    | CostCenterActions.LoadCostCentersSuccess
    | CostCenterActions.LoadCostCenterSuccess
    | CostCenterActions.LoadCostCentersFail
  > = this.actions$.pipe(
    ofType(CostCenterActions.LOAD_COST_CENTERS),
    map((action: CostCenterActions.LoadCostCenters) => action.payload),
    switchMap((payload) =>
      this.costCenterConnector.getList(payload.userId, payload.params).pipe(
        switchMap((costCenters: EntitiesModel<CostCenter>) => {
          const { values, page } = normalizeListPage(costCenters, 'code');
          return [
            new CostCenterActions.LoadCostCenterSuccess(values),
            new CostCenterActions.LoadCostCentersSuccess({
              page,
              params: payload.params,
            }),
          ];
        }),
        catchError((error: HttpErrorResponse) =>
          of(
            new CostCenterActions.LoadCostCentersFail({
              params: payload.params,
              error: normalizeHttpError(error),
            })
          )
        )
      )
    )
  );

  @Effect()
  createCostCenter$: Observable<
    | CostCenterActions.CreateCostCenterSuccess
    | CostCenterActions.CreateCostCenterFail
  > = this.actions$.pipe(
    ofType(CostCenterActions.CREATE_COST_CENTER),
    map((action: CostCenterActions.CreateCostCenter) => action.payload),
    switchMap((payload) =>
      this.costCenterConnector.create(payload.userId, payload.costCenter).pipe(
        map((data) => new CostCenterActions.CreateCostCenterSuccess(data)),
        catchError((error: HttpErrorResponse) =>
          of(
            new CostCenterActions.CreateCostCenterFail({
              costCenterCode: payload.costCenter.code,
              error: normalizeHttpError(error),
            })
          )
        )
      )
    )
  );

  @Effect()
  updateCostCenter$: Observable<
    | CostCenterActions.UpdateCostCenterSuccess
    | CostCenterActions.UpdateCostCenterFail
  > = this.actions$.pipe(
    ofType(CostCenterActions.UPDATE_COST_CENTER),
    map((action: CostCenterActions.UpdateCostCenter) => action.payload),
    switchMap((payload) =>
      this.costCenterConnector
        .update(payload.userId, payload.costCenterCode, payload.costCenter)
        .pipe(
          map((data) => new CostCenterActions.UpdateCostCenterSuccess(data)),
          catchError((error: HttpErrorResponse) =>
            of(
              new CostCenterActions.UpdateCostCenterFail({
                costCenterCode: payload.costCenter.code,
                error: normalizeHttpError(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  loadAssignedBudgets$: Observable<
    | CostCenterActions.LoadAssignedBudgetsSuccess
    | BudgetActions.LoadBudgetSuccess
    | CostCenterActions.LoadAssignedBudgetsFail
  > = this.actions$.pipe(
    ofType(CostCenterActions.LOAD_ASSIGNED_BUDGETS),
    map((action: CostCenterActions.LoadAssignedBudgets) => action.payload),
    switchMap(({ userId, costCenterCode, params }) =>
      this.costCenterConnector.getBudgets(userId, costCenterCode, params).pipe(
        switchMap((budgets: EntitiesModel<Budget>) => {
          const { values, page } = normalizeListPage(budgets, 'code');
          return [
            new BudgetActions.LoadBudgetSuccess(values),
            new CostCenterActions.LoadAssignedBudgetsSuccess({
              costCenterCode,
              page,
              params,
            }),
          ];
        }),
        catchError((error: HttpErrorResponse) =>
          of(
            new CostCenterActions.LoadAssignedBudgetsFail({
              costCenterCode,
              params,
              error: normalizeHttpError(error),
            })
          )
        )
      )
    )
  );

  @Effect()
  assignBudgetToCostCenter$: Observable<
    CostCenterActions.AssignBudgetSuccess | CostCenterActions.AssignBudgetFail
  > = this.actions$.pipe(
    ofType(CostCenterActions.ASSIGN_BUDGET),
    map((action: CostCenterActions.AssignBudget) => action.payload),
    switchMap(({ userId, costCenterCode, budgetCode }) =>
      this.costCenterConnector
        .assignBudget(userId, costCenterCode, budgetCode)
        .pipe(
          map(
            () =>
              new CostCenterActions.AssignBudgetSuccess({
                code: budgetCode,
                selected: true,
              })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              new CostCenterActions.AssignBudgetFail({
                budgetCode,
                error: normalizeHttpError(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  unassignBudgetToCostCenter$: Observable<
    | CostCenterActions.UnassignBudgetSuccess
    | CostCenterActions.UnassignBudgetFail
  > = this.actions$.pipe(
    ofType(CostCenterActions.UNASSIGN_BUDGET),
    map((action: CostCenterActions.UnassignBudget) => action.payload),
    switchMap(({ userId, costCenterCode, budgetCode }) =>
      this.costCenterConnector
        .unassignBudget(userId, costCenterCode, budgetCode)
        .pipe(
          map(
            () =>
              new CostCenterActions.UnassignBudgetSuccess({
                code: budgetCode,
                selected: false,
              })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              new CostCenterActions.UnassignBudgetFail({
                budgetCode,
                error: normalizeHttpError(error),
              })
            )
          )
        )
    )
  );

  constructor(
    private actions$: Actions,
    private costCenterConnector: CostCenterConnector
  ) {}
}
