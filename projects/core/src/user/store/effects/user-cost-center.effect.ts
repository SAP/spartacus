import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EntitiesModel } from '../../../model/misc.model';
import { CostCenter } from '../../../model/org-unit.model';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { UserCostCenterConnector } from '../../connectors/cost-center/user-cost-center.connector';
import { UserActions } from '../actions/index';

@Injectable()
export class UserCostCenterEffects {
  @Effect()
  loadActiveCostCenters$: Observable<UserActions.UserCostCenterAction> = this.actions$.pipe(
    ofType(UserActions.LOAD_ACTIVE_COST_CENTERS),
    map((action: UserActions.LoadActiveCostCenters) => action.payload),
    switchMap((payload) =>
      this.userCostCenterConnector.getActiveList(payload).pipe(
        // TODO(#8875): Should we use here serialize utils?
        map(
          (data: EntitiesModel<CostCenter>) =>
            new UserActions.LoadActiveCostCentersSuccess(data.values)
        ),
        catchError((error) =>
          of(
            new UserActions.LoadActiveCostCentersFail(normalizeHttpError(error))
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
