import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CostCenter } from '../../../model/org-unit.model';
import { EntitiesModel } from '../../../model/misc.model';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserActions } from '../actions/index';
import { UserCostCenterConnector } from '../../connectors/cost-center/user-cost-center.connector';

@Injectable()
export class UserCostCenterEffects {
  @Effect()
  loadActiveCostCenters$: Observable<
    UserActions.UserCostCenterAction
  > = this.actions$.pipe(
    ofType(UserActions.LOAD_ACTIVE_COST_CENTERS),
    map((action: UserActions.LoadActiveCostCenters) => action.payload),
    switchMap((payload) =>
      this.userCostCenterConnector.getActiveList(payload).pipe(
        map(
          (data: EntitiesModel<CostCenter>) =>
            new UserActions.LoadActiveCostCentersSuccess(data.values)
        ),
        catchError((error) =>
          of(
            new UserActions.LoadActiveCostCentersFail(
              makeErrorSerializable(error)
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userCostCenterConnector: UserCostCenterConnector
  ) {}
}
