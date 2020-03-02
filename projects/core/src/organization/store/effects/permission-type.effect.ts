import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { PermissionTypeActions } from '../actions/index';
import { makeErrorSerializable } from 'projects/core/src/util/serialization-utils';
import { EntitiesModel } from 'projects/core/src/model/misc.model';
import { PermissionTypeConnector } from './../../connectors/permission-type/permission-type.connector';
import { OrderApprovalPermissionType } from 'projects/core/src/model/permission.model';
import { normalizeListPage } from '../../utils/serializer';

@Injectable()
export class PermissionTypeEffects {
  @Effect()
  loadPermissionTypes$: Observable<
    | PermissionTypeActions.LoadPermissionTypesSuccess
    | PermissionTypeActions.LoadPermissionTypeSuccess
    | PermissionTypeActions.LoadPermissionTypesFail
  > = this.actions$.pipe(
    ofType(PermissionTypeActions.LOAD_PERMISSION_TYPES),
    map((action: PermissionTypeActions.LoadPermissionTypes) => action),
    switchMap(() =>
      this.permissionTypeConnector.getList().pipe(
        switchMap(
          (permissionTypeList: EntitiesModel<OrderApprovalPermissionType>) => {
            const { values, page } = normalizeListPage(
              permissionTypeList,
              'code'
            );
            return [
              new PermissionTypeActions.LoadPermissionTypeSuccess(values),
              new PermissionTypeActions.LoadPermissionTypesSuccess({
                page,
              }),
            ];
          }
        ),
        catchError(error =>
          of(
            new PermissionTypeActions.LoadPermissionTypesFail({
              error: makeErrorSerializable(error),
            })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private permissionTypeConnector: PermissionTypeConnector
  ) {}
}
