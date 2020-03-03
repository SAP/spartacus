import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EntitiesModel } from '../../../model/misc.model';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { OrgUnitUserGroupActions } from '../actions/index';
import { normalizeListPage } from '../../utils/serializer';
import { OrgUnitUserGroup } from '../../../model';
import { OrgUnitUserGroupConnector } from '../../connectors';

@Injectable()
export class OrgUnitUserGroupEffects {
  @Effect()
  loadOrgUnitUserGroup$: Observable<
    | OrgUnitUserGroupActions.LoadOrgUnitUserGroupSuccess
    | OrgUnitUserGroupActions.LoadOrgUnitUserGroupFail
  > = this.actions$.pipe(
    ofType(OrgUnitUserGroupActions.LOAD_ORG_UNIT_USER_GROUP),
    map(
      (action: OrgUnitUserGroupActions.LoadOrgUnitUserGroup) => action.payload
    ),
    switchMap(({ userId, orgUnitUserGroupCode }) => {
      return this.orgUnitUserGroupConnector
        .get(userId, orgUnitUserGroupCode)
        .pipe(
          map((orgUnitUserGroup: OrgUnitUserGroup) => {
            return new OrgUnitUserGroupActions.LoadOrgUnitUserGroupSuccess([
              orgUnitUserGroup,
            ]);
          }),
          catchError(error =>
            of(
              new OrgUnitUserGroupActions.LoadOrgUnitUserGroupFail({
                orgUnitUserGroupCode,
                error: makeErrorSerializable(error),
              })
            )
          )
        );
    })
  );

  @Effect()
  loadOrgUnitUserGroups$: Observable<
    | OrgUnitUserGroupActions.LoadOrgUnitUserGroupsSuccess
    | OrgUnitUserGroupActions.LoadOrgUnitUserGroupSuccess
    | OrgUnitUserGroupActions.LoadOrgUnitUserGroupsFail
  > = this.actions$.pipe(
    ofType(OrgUnitUserGroupActions.LOAD_ORG_UNIT_USER_GROUPS),
    map(
      (action: OrgUnitUserGroupActions.LoadOrgUnitUserGroups) => action.payload
    ),
    switchMap(payload =>
      this.orgUnitUserGroupConnector
        .getList(payload.userId, payload.params)
        .pipe(
          switchMap((orgUnitUserGroups: EntitiesModel<OrgUnitUserGroup>) => {
            const { values, page } = normalizeListPage(
              orgUnitUserGroups,
              'code'
            );
            return [
              new OrgUnitUserGroupActions.LoadOrgUnitUserGroupSuccess(values),
              new OrgUnitUserGroupActions.LoadOrgUnitUserGroupsSuccess({
                page,
                params: payload.params,
              }),
            ];
          }),
          catchError(error =>
            of(
              new OrgUnitUserGroupActions.LoadOrgUnitUserGroupsFail({
                params: payload.params,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  createOrgUnitUserGroup$: Observable<
    | OrgUnitUserGroupActions.CreateOrgUnitUserGroupSuccess
    | OrgUnitUserGroupActions.CreateOrgUnitUserGroupFail
  > = this.actions$.pipe(
    ofType(OrgUnitUserGroupActions.CREATE_ORG_UNIT_USER_GROUP),
    map(
      (action: OrgUnitUserGroupActions.CreateOrgUnitUserGroup) => action.payload
    ),
    switchMap(payload =>
      this.orgUnitUserGroupConnector
        .create(payload.userId, payload.orgUnitUserGroup)
        .pipe(
          map(
            data =>
              new OrgUnitUserGroupActions.CreateOrgUnitUserGroupSuccess(data)
          ),
          catchError(error =>
            of(
              new OrgUnitUserGroupActions.CreateOrgUnitUserGroupFail({
                orgUnitUserGroupCode: payload.orgUnitUserGroup.code,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  updateOrgUnitUserGroup$: Observable<
    | OrgUnitUserGroupActions.UpdateOrgUnitUserGroupSuccess
    | OrgUnitUserGroupActions.UpdateOrgUnitUserGroupFail
  > = this.actions$.pipe(
    ofType(OrgUnitUserGroupActions.UPDATE_ORG_UNIT_USER_GROUP),
    map(
      (action: OrgUnitUserGroupActions.UpdateOrgUnitUserGroup) => action.payload
    ),
    switchMap(payload =>
      this.orgUnitUserGroupConnector
        .update(
          payload.userId,
          payload.orgUnitUserGroupCode,
          payload.orgUnitUserGroup
        )
        .pipe(
          map(
            data =>
              new OrgUnitUserGroupActions.UpdateOrgUnitUserGroupSuccess(data)
          ),
          catchError(error =>
            of(
              new OrgUnitUserGroupActions.UpdateOrgUnitUserGroupFail({
                orgUnitUserGroupCode: payload.orgUnitUserGroup.code,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  constructor(
    private actions$: Actions,
    private orgUnitUserGroupConnector: OrgUnitUserGroupConnector
  ) {}
}
