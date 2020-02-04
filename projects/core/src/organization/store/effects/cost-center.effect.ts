import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CostCenter } from '../../../model/cost-center.model';
import { EntitiesModel } from '../../../model/misc.model';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { CostCenterConnector } from '../../connectors/cost-center/cost-center.connector';
import { CostCenterActions } from '../actions/index';
import { normalizeListPage } from '../../utils/serializer';

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
        catchError(error =>
          of(
            new CostCenterActions.LoadCostCenterFail({
              costCenterCode,
              error: makeErrorSerializable(error),
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
    switchMap(payload =>
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
        catchError(error =>
          of(
            new CostCenterActions.LoadCostCentersFail({
              params: payload.params,
              error: makeErrorSerializable(error),
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
    switchMap(payload =>
      this.costCenterConnector.create(payload.userId, payload.costCenter).pipe(
        map(data => new CostCenterActions.CreateCostCenterSuccess(data)),
        catchError(error =>
          of(
            new CostCenterActions.CreateCostCenterFail({
              costCenterCode: payload.costCenter.code,
              error: makeErrorSerializable(error),
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
    switchMap(payload =>
      this.costCenterConnector
        .update(payload.userId, payload.costCenterCode, payload.costCenter)
        .pipe(
          map(data => new CostCenterActions.UpdateCostCenterSuccess(data)),
          catchError(error =>
            of(
              new CostCenterActions.UpdateCostCenterFail({
                costCenterCode: payload.costCenter.code,
                error: makeErrorSerializable(error),
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
