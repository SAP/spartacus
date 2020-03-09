import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EntitiesModel } from '../../../model/misc.model';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { OrgUnitUserGroupActions, PermissionActions } from '../actions/index';
import { normalizeListPage } from '../../utils/serializer';
import { OrgUnitUserGroup, Permission } from '../../../model';
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
    switchMap(({ userId, orgUnitUserGroupUid }) => {
      return this.orgUnitUserGroupConnector
        .get(userId, orgUnitUserGroupUid)
        .pipe(
          map((orgUnitUserGroup: OrgUnitUserGroup) => {
            return new OrgUnitUserGroupActions.LoadOrgUnitUserGroupSuccess([
              orgUnitUserGroup,
            ]);
          }),
          catchError(error =>
            of(
              new OrgUnitUserGroupActions.LoadOrgUnitUserGroupFail({
                orgUnitUserGroupUid,
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
  loadOrgUnitUserGroupAvailableOrderApprovalPermissions$: Observable<
    | OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissionsSuccess
    | PermissionActions.LoadPermissionSuccess
    | OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissionsFail
  > = this.actions$.pipe(
    ofType(
      OrgUnitUserGroupActions.LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS
    ),
    map(
      (
        action: OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissions
      ) => action.payload
    ),
    switchMap(payload =>
      this.orgUnitUserGroupConnector
        .getAvailableOrderApprovalPermissions(
          payload.userId,
          payload.orgUnitUserGroupUid,
          payload.params
        )
        .pipe(
          switchMap((permissions: EntitiesModel<Permission>) => {
            const { values, page } = normalizeListPage(permissions, 'code');
            return [
              new PermissionActions.LoadPermissionSuccess(values),
              new OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissionsSuccess(
                {
                  orgUnitUserGroupUid: payload.orgUnitUserGroupUid,
                  page,
                  params: payload.params,
                }
              ),
            ];
          }),
          catchError(error =>
            of(
              new OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissionsFail(
                {
                  orgUnitUserGroupUid: payload.orgUnitUserGroupUid,
                  params: payload.params,
                  error: makeErrorSerializable(error),
                }
              )
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
                orgUnitUserGroupUid: payload.orgUnitUserGroup.uid,
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
          payload.orgUnitUserGroupUid,
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
                orgUnitUserGroupUid: payload.orgUnitUserGroup.uid,
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
