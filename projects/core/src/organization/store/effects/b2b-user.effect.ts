import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EntitiesModel } from '../../../model/misc.model';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { B2BUserActions, PermissionActions } from '../actions/index';
import { normalizeListPage } from '../../utils/serializer';
import { B2BUser } from '../../../model/org-unit.model';
import { B2BUserConnector } from '../../connectors/b2b-user/b2b-user.connector';
import { Permission } from '../../../model/permission.model';

@Injectable()
export class B2BUserEffects {
  @Effect()
  loadB2BUser$: Observable<
    B2BUserActions.LoadB2BUserSuccess | B2BUserActions.LoadB2BUserFail
  > = this.actions$.pipe(
    ofType(B2BUserActions.LOAD_B2B_USER),
    map((action: B2BUserActions.LoadB2BUser) => action.payload),
    switchMap(({ userId, orgCustomerId }) => {
      return this.b2bUserConnector.get(userId, orgCustomerId).pipe(
        map((b2bUser: B2BUser) => {
          return new B2BUserActions.LoadB2BUserSuccess([b2bUser]);
        }),
        catchError(error =>
          of(
            new B2BUserActions.LoadB2BUserFail({
              orgCustomerId,
              error: makeErrorSerializable(error),
            })
          )
        )
      );
    })
  );

  @Effect()
  createB2BUser$: Observable<
    B2BUserActions.CreateB2BUserSuccess | B2BUserActions.CreateB2BUserFail
  > = this.actions$.pipe(
    ofType(B2BUserActions.CREATE_B2B_USER),
    map((action: B2BUserActions.CreateB2BUser) => action.payload),
    switchMap(payload =>
      this.b2bUserConnector.create(payload.userId, payload.orgCustomer).pipe(
        map(data => new B2BUserActions.CreateB2BUserSuccess(data)),
        catchError(error =>
          of(
            new B2BUserActions.CreateB2BUserFail({
              orgCustomerId: payload.orgCustomer.uid,
              error: makeErrorSerializable(error),
            })
          )
        )
      )
    )
  );

  @Effect()
  updateB2BUser$: Observable<
    B2BUserActions.UpdateB2BUserSuccess | B2BUserActions.UpdateB2BUserFail
  > = this.actions$.pipe(
    ofType(B2BUserActions.UPDATE_B2B_USER),
    map((action: B2BUserActions.UpdateB2BUser) => action.payload),
    switchMap(payload =>
      this.b2bUserConnector
        .update(payload.userId, payload.orgCustomerId, payload.orgCustomer)
        .pipe(
          map(data => new B2BUserActions.UpdateB2BUserSuccess(data)),
          catchError(error =>
            of(
              new B2BUserActions.UpdateB2BUserFail({
                orgCustomerId: payload.orgCustomer.uid,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  loadB2BUsers$: Observable<
    | B2BUserActions.LoadB2BUsersSuccess
    | B2BUserActions.LoadB2BUserSuccess
    | B2BUserActions.LoadB2BUsersFail
  > = this.actions$.pipe(
    ofType(B2BUserActions.LOAD_B2B_USERS),
    map((action: B2BUserActions.LoadB2BUsers) => action.payload),
    switchMap(payload =>
      this.b2bUserConnector.getList(payload.userId, payload.params).pipe(
        switchMap((b2bUsers: EntitiesModel<B2BUser>) => {
          const { values, page } = normalizeListPage(b2bUsers, 'uid');
          return [
            new B2BUserActions.LoadB2BUserSuccess(values),
            new B2BUserActions.LoadB2BUsersSuccess({
              page,
              params: payload.params,
            }),
          ];
        }),
        catchError(error =>
          of(
            new B2BUserActions.LoadB2BUsersFail({
              params: payload.params,
              error: makeErrorSerializable(error),
            })
          )
        )
      )
    )
  );

  @Effect()
  loadB2BUserApprovers$: Observable<
    | B2BUserActions.LoadB2BUserApproversSuccess
    | B2BUserActions.LoadB2BUserApproversFail
    | B2BUserActions.LoadB2BUserSuccess
  > = this.actions$.pipe(
    ofType(B2BUserActions.LOAD_B2B_USER_APPROVERS),
    map((action: B2BUserActions.LoadB2BUserApprovers) => action.payload),
    switchMap(payload =>
      this.b2bUserConnector
        .getApprovers(payload.userId, payload.orgCustomerId, payload.params)
        .pipe(
          switchMap((approvers: EntitiesModel<B2BUser>) => {
            const { values, page } = normalizeListPage(approvers, 'code');
            return [
              new B2BUserActions.LoadB2BUserSuccess(values),
              new B2BUserActions.LoadB2BUserApproversSuccess({
                orgCustomerId: payload.orgCustomerId,
                page,
                params: payload.params,
              }),
            ];
          }),
          catchError(error =>
            of(
              new B2BUserActions.LoadB2BUserApproversFail({
                orgCustomerId: payload.orgCustomerId,
                params: payload.params,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  loadB2BUserPermissions$: Observable<
    | B2BUserActions.LoadB2BUserApproversSuccess
    | B2BUserActions.LoadB2BUserApproversFail
    | PermissionActions.LoadPermissionSuccess
  > = this.actions$.pipe(
    ofType(B2BUserActions.LOAD_B2B_USER_PERMISSIONS),
    map((action: B2BUserActions.LoadB2BUserPermissions) => action.payload),
    switchMap(payload =>
      this.b2bUserConnector
        .getPermissions(payload.userId, payload.orgCustomerId, payload.params)
        .pipe(
          switchMap((permissions: EntitiesModel<Permission>) => {
            const { values, page } = normalizeListPage(permissions, 'code');
            return [
              new PermissionActions.LoadPermissionSuccess(values),
              new B2BUserActions.LoadB2BUserApproversSuccess({
                orgCustomerId: payload.orgCustomerId,
                page,
                params: payload.params,
              }),
            ];
          }),
          catchError(error =>
            of(
              new B2BUserActions.LoadB2BUserApproversFail({
                orgCustomerId: payload.orgCustomerId,
                params: payload.params,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  assignApproverToB2BUser$: Observable<
    | B2BUserActions.CreateB2BUserApproverSuccess
    | B2BUserActions.CreateB2BUserApproverFail
  > = this.actions$.pipe(
    ofType(B2BUserActions.CREATE_B2B_USER_APPROVER),
    map((action: B2BUserActions.CreateB2BUserApprover) => action.payload),
    switchMap(payload =>
      this.b2bUserConnector
        .assignApprover(
          payload.userId,
          payload.orgCustomerId,
          payload.approverId
        )
        .pipe(
          map(
            () =>
              new B2BUserActions.CreateB2BUserApproverSuccess({
                approverId: payload.approverId,
                selected: true,
              })
          ),
          catchError(error =>
            of(
              new B2BUserActions.CreateB2BUserApproverFail({
                orgCustomerId: payload.orgCustomerId,
                approverId: payload.approverId,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  unassignApproverFromB2BUser$: Observable<
    | B2BUserActions.DeleteB2BUserApproverSuccess
    | B2BUserActions.DeleteB2BUserApproverFail
  > = this.actions$.pipe(
    ofType(B2BUserActions.DELETE_B2B_USER_APPROVER),
    map((action: B2BUserActions.DeleteB2BUserApprover) => action.payload),
    switchMap(payload =>
      this.b2bUserConnector
        .assignApprover(
          payload.userId,
          payload.orgCustomerId,
          payload.approverId
        )
        .pipe(
          map(
            () =>
              new B2BUserActions.DeleteB2BUserApproverSuccess({
                approverId: payload.approverId,
                selected: false,
              })
          ),
          catchError(error =>
            of(
              new B2BUserActions.DeleteB2BUserApproverFail({
                orgCustomerId: payload.orgCustomerId,
                approverId: payload.approverId,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  assignPermissionToB2BUser$: Observable<
    | B2BUserActions.CreateB2BUserPermissionSuccess
    | B2BUserActions.CreateB2BUserPermissionFail
  > = this.actions$.pipe(
    ofType(B2BUserActions.CREATE_B2B_USER_APPROVER),
    map((action: B2BUserActions.CreateB2BUserPermission) => action.payload),
    switchMap(payload =>
      this.b2bUserConnector
        .assignPermission(
          payload.userId,
          payload.orgCustomerId,
          payload.permissionId
        )
        .pipe(
          map(
            () =>
              new B2BUserActions.CreateB2BUserPermissionSuccess({
                permissionId: payload.permissionId,
                selected: true,
              })
          ),
          catchError(error =>
            of(
              new B2BUserActions.CreateB2BUserPermissionFail({
                orgCustomerId: payload.orgCustomerId,
                permissionId: payload.permissionId,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  unassignPermissionFromB2BUser$: Observable<
    | B2BUserActions.DeleteB2BUserPermissionSuccess
    | B2BUserActions.DeleteB2BUserPermissionFail
  > = this.actions$.pipe(
    ofType(B2BUserActions.DELETE_B2B_USER_APPROVER),
    map((action: B2BUserActions.DeleteB2BUserPermission) => action.payload),
    switchMap(payload =>
      this.b2bUserConnector
        .assignPermission(
          payload.userId,
          payload.orgCustomerId,
          payload.permissionId
        )
        .pipe(
          map(
            () =>
              new B2BUserActions.DeleteB2BUserPermissionSuccess({
                permissionId: payload.permissionId,
                selected: false,
              })
          ),
          catchError(error =>
            of(
              new B2BUserActions.DeleteB2BUserPermissionFail({
                orgCustomerId: payload.orgCustomerId,
                permissionId: payload.permissionId,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  assignUserGroupToB2BUser$: Observable<
    | B2BUserActions.CreateB2BUserUserGroupSuccess
    | B2BUserActions.CreateB2BUserUserGroupFail
  > = this.actions$.pipe(
    ofType(B2BUserActions.CREATE_B2B_USER_APPROVER),
    map((action: B2BUserActions.CreateB2BUserUserGroup) => action.payload),
    switchMap(payload =>
      this.b2bUserConnector
        .assignUserGroup(
          payload.userId,
          payload.orgCustomerId,
          payload.userGroupId
        )
        .pipe(
          map(
            () =>
              new B2BUserActions.CreateB2BUserUserGroupSuccess({
                userGroupId: payload.userGroupId,
                selected: true,
              })
          ),
          catchError(error =>
            of(
              new B2BUserActions.CreateB2BUserUserGroupFail({
                orgCustomerId: payload.orgCustomerId,
                userGroupId: payload.userGroupId,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  unassignUserGroupFromB2BUser$: Observable<
    | B2BUserActions.DeleteB2BUserUserGroupSuccess
    | B2BUserActions.DeleteB2BUserUserGroupFail
  > = this.actions$.pipe(
    ofType(B2BUserActions.DELETE_B2B_USER_APPROVER),
    map((action: B2BUserActions.DeleteB2BUserUserGroup) => action.payload),
    switchMap(payload =>
      this.b2bUserConnector
        .assignUserGroup(
          payload.userId,
          payload.orgCustomerId,
          payload.userGroupId
        )
        .pipe(
          map(
            () =>
              new B2BUserActions.DeleteB2BUserUserGroupSuccess({
                userGroupId: payload.userGroupId,
                selected: false,
              })
          ),
          catchError(error =>
            of(
              new B2BUserActions.DeleteB2BUserUserGroupFail({
                orgCustomerId: payload.orgCustomerId,
                userGroupId: payload.userGroupId,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  constructor(
    private actions$: Actions,
    private b2bUserConnector: B2BUserConnector
  ) {}
}
