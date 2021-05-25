import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  B2BUser,
  EntitiesModel,
  normalizeHttpError,
  StateUtils,
} from '@spartacus/core';
import { from, Observable, of } from 'rxjs';
import { catchError, groupBy, map, mergeMap, switchMap } from 'rxjs/operators';
import { UserGroupConnector } from '../../connectors/user-group/user-group.connector';
import { Permission } from '../../model/permission.model';
import { UserGroup } from '../../model/user-group.model';
import {
  B2BUserActions,
  OrganizationActions,
  PermissionActions,
  UserGroupActions,
} from '../actions/index';

@Injectable()
export class UserGroupEffects {
  @Effect()
  loadUserGroup$: Observable<
    UserGroupActions.LoadUserGroupSuccess | UserGroupActions.LoadUserGroupFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.LOAD_USER_GROUP),
    map((action: UserGroupActions.LoadUserGroup) => action.payload),
    switchMap(({ userId, userGroupId }) => {
      return this.userGroupConnector.get(userId, userGroupId).pipe(
        map((userGroup: UserGroup) => {
          return new UserGroupActions.LoadUserGroupSuccess([userGroup]);
        }),
        catchError((error: HttpErrorResponse) =>
          of(
            new UserGroupActions.LoadUserGroupFail({
              userGroupId,
              error: normalizeHttpError(error),
            })
          )
        )
      );
    })
  );

  @Effect()
  loadUserGroups$: Observable<
    | UserGroupActions.LoadUserGroupsSuccess
    | UserGroupActions.LoadUserGroupSuccess
    | UserGroupActions.LoadUserGroupsFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.LOAD_USER_GROUPS),
    map((action: UserGroupActions.LoadUserGroups) => action.payload),
    switchMap((payload) =>
      this.userGroupConnector.getList(payload.userId, payload.params).pipe(
        switchMap((userGroups: EntitiesModel<UserGroup>) => {
          const { values, page } = StateUtils.normalizeListPage(
            userGroups,
            'uid'
          );
          return [
            new UserGroupActions.LoadUserGroupSuccess(values),
            new UserGroupActions.LoadUserGroupsSuccess({
              page,
              params: payload.params,
            }),
          ];
        }),
        catchError((error: HttpErrorResponse) =>
          of(
            new UserGroupActions.LoadUserGroupsFail({
              params: payload.params,
              error: normalizeHttpError(error),
            })
          )
        )
      )
    )
  );

  @Effect()
  loadAvailableOrderApprovalPermissions$: Observable<
    | UserGroupActions.LoadPermissionsSuccess
    | PermissionActions.LoadPermissionSuccess
    | UserGroupActions.LoadPermissionsFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.LOAD_USER_GROUP_PERMISSIONS),
    map((action: UserGroupActions.LoadPermissions) => action.payload),
    groupBy(({ userGroupId, params }) =>
      StateUtils.serializeParams(userGroupId, params)
    ),
    mergeMap((group) =>
      group.pipe(
        switchMap((payload) =>
          this.userGroupConnector
            .getAvailableOrderApprovalPermissions(
              payload.userId,
              payload.userGroupId,
              payload.params
            )
            .pipe(
              switchMap((permissions: EntitiesModel<Permission>) => {
                const { values, page } = StateUtils.normalizeListPage(
                  permissions,
                  'code'
                );
                return [
                  new PermissionActions.LoadPermissionSuccess(values),
                  new UserGroupActions.LoadPermissionsSuccess({
                    userGroupId: payload.userGroupId,
                    page,
                    params: payload.params,
                  }),
                ];
              }),
              catchError((error: HttpErrorResponse) =>
                of(
                  new UserGroupActions.LoadPermissionsFail({
                    userGroupId: payload.userGroupId,
                    params: payload.params,
                    error: normalizeHttpError(error),
                  })
                )
              )
            )
        )
      )
    )
  );

  @Effect()
  loadAvailableOrgCustomers$: Observable<
    | UserGroupActions.LoadAvailableOrgCustomersSuccess
    | B2BUserActions.LoadB2BUserSuccess
    | UserGroupActions.LoadAvailableOrgCustomersFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.LOAD_USER_GROUP_AVAILABLE_CUSTOMERS),
    map((action: UserGroupActions.LoadAvailableOrgCustomers) => action.payload),
    groupBy(({ userGroupId, params }) =>
      StateUtils.serializeParams(userGroupId, params)
    ),
    mergeMap((group) =>
      group.pipe(
        switchMap((payload) =>
          this.userGroupConnector
            .getAvailableOrgCustomers(
              payload.userId,
              payload.userGroupId,
              payload.params
            )
            .pipe(
              switchMap((customers: EntitiesModel<B2BUser>) => {
                const { values, page } = StateUtils.normalizeListPage(
                  customers,
                  'customerId'
                );
                return [
                  new B2BUserActions.LoadB2BUserSuccess(values),
                  new UserGroupActions.LoadAvailableOrgCustomersSuccess({
                    userGroupId: payload.userGroupId,
                    page,
                    params: payload.params,
                  }),
                ];
              }),
              catchError((error: HttpErrorResponse) =>
                of(
                  new UserGroupActions.LoadAvailableOrgCustomersFail({
                    userGroupId: payload.userGroupId,
                    params: payload.params,
                    error: normalizeHttpError(error),
                  })
                )
              )
            )
        )
      )
    )
  );

  @Effect()
  createUserGroup$: Observable<
    | UserGroupActions.CreateUserGroupSuccess
    | UserGroupActions.CreateUserGroupFail
    | OrganizationActions.OrganizationClearData
  > = this.actions$.pipe(
    ofType(UserGroupActions.CREATE_USER_GROUP),
    map((action: UserGroupActions.CreateUserGroup) => action.payload),
    switchMap((payload) =>
      this.userGroupConnector.create(payload.userId, payload.userGroup).pipe(
        switchMap((data) => [
          new UserGroupActions.CreateUserGroupSuccess(data),
          new OrganizationActions.OrganizationClearData(),
        ]),
        catchError((error: HttpErrorResponse) =>
          from([
            new UserGroupActions.CreateUserGroupFail({
              userGroupId: payload.userGroup.uid,
              error: normalizeHttpError(error),
            }),
            new OrganizationActions.OrganizationClearData(),
          ])
        )
      )
    )
  );

  @Effect()
  updateUserGroup$: Observable<
    | UserGroupActions.UpdateUserGroupSuccess
    | UserGroupActions.UpdateUserGroupFail
    | OrganizationActions.OrganizationClearData
  > = this.actions$.pipe(
    ofType(UserGroupActions.UPDATE_USER_GROUP),
    map((action: UserGroupActions.UpdateUserGroup) => action.payload),
    switchMap((payload) =>
      this.userGroupConnector
        .update(payload.userId, payload.userGroupId, payload.userGroup)
        .pipe(
          switchMap(() => [
            // TODO: Workaround for empty PATCH response:
            new UserGroupActions.UpdateUserGroupSuccess(payload.userGroup),
            new OrganizationActions.OrganizationClearData(),
          ]),
          catchError((error: HttpErrorResponse) =>
            from([
              new UserGroupActions.UpdateUserGroupFail({
                userGroupId: payload.userGroup.uid,
                error: normalizeHttpError(error),
              }),
              new OrganizationActions.OrganizationClearData(),
            ])
          )
        )
    )
  );

  @Effect()
  deleteUserGroup$: Observable<
    | UserGroupActions.DeleteUserGroupSuccess
    | UserGroupActions.DeleteUserGroupFail
    | OrganizationActions.OrganizationClearData
  > = this.actions$.pipe(
    ofType(UserGroupActions.DELETE_USER_GROUP),
    map((action: UserGroupActions.DeleteUserGroup) => action.payload),
    switchMap((payload) =>
      this.userGroupConnector.delete(payload.userId, payload.userGroupId).pipe(
        switchMap((data) => [
          new UserGroupActions.DeleteUserGroupSuccess(data),
          new OrganizationActions.OrganizationClearData(),
        ]),
        catchError((error: HttpErrorResponse) =>
          from([
            new UserGroupActions.DeleteUserGroupFail({
              userGroupId: payload.userGroupId,
              error: normalizeHttpError(error),
            }),
            new OrganizationActions.OrganizationClearData(),
          ])
        )
      )
    )
  );

  @Effect()
  assignPermissionToUserGroup$: Observable<
    | UserGroupActions.AssignPermissionSuccess
    | UserGroupActions.AssignPermissionFail
    | OrganizationActions.OrganizationClearData
  > = this.actions$.pipe(
    ofType(UserGroupActions.USER_GROUP_ASSIGN_PERMISSION),
    map((action: UserGroupActions.AssignPermission) => action.payload),
    mergeMap((payload) =>
      this.userGroupConnector
        .assignOrderApprovalPermission(
          payload.userId,
          payload.userGroupId,
          payload.permissionUid
        )
        .pipe(
          switchMap((data) => [
            new UserGroupActions.AssignPermissionSuccess({
              permissionUid: data.id,
              selected: data.selected,
            }),
            new OrganizationActions.OrganizationClearData(),
          ]),
          catchError((error: HttpErrorResponse) =>
            from([
              new UserGroupActions.AssignPermissionFail({
                userGroupId: payload.userGroupId,
                permissionUid: payload.permissionUid,
                error: normalizeHttpError(error),
              }),
              new OrganizationActions.OrganizationClearData(),
            ])
          )
        )
    )
  );

  @Effect()
  assignMemberUnitUserGroup$: Observable<
    | UserGroupActions.AssignMemberSuccess
    | UserGroupActions.AssignMemberFail
    | OrganizationActions.OrganizationClearData
  > = this.actions$.pipe(
    ofType(UserGroupActions.USER_GROUP_ASSIGN_MEMBER),
    map((action: UserGroupActions.AssignMember) => action.payload),
    mergeMap((payload) =>
      this.userGroupConnector
        .assignMember(payload.userId, payload.userGroupId, payload.customerId)
        .pipe(
          switchMap(() => [
            new UserGroupActions.AssignMemberSuccess({
              customerId: payload.customerId,
              selected: true,
            }),
            new OrganizationActions.OrganizationClearData(),
          ]),
          catchError((error: HttpErrorResponse) =>
            from([
              new UserGroupActions.AssignMemberFail({
                userGroupId: payload.userGroupId,
                customerId: payload.customerId,
                error: normalizeHttpError(error),
              }),
              new OrganizationActions.OrganizationClearData(),
            ])
          )
        )
    )
  );

  @Effect()
  unassignMemberFromUserGroup$: Observable<
    | UserGroupActions.UnassignMemberSuccess
    | UserGroupActions.UnassignMemberFail
    | OrganizationActions.OrganizationClearData
  > = this.actions$.pipe(
    ofType(UserGroupActions.USER_GROUP_UNASSIGN_MEMBER),
    map((action: UserGroupActions.UnassignMember) => action.payload),
    mergeMap((payload) =>
      this.userGroupConnector
        .unassignMember(payload.userId, payload.userGroupId, payload.customerId)
        .pipe(
          switchMap(() => [
            new UserGroupActions.UnassignMemberSuccess({
              customerId: payload.customerId,
              selected: false,
            }),
            new OrganizationActions.OrganizationClearData(),
          ]),
          catchError((error: HttpErrorResponse) =>
            from([
              new UserGroupActions.UnassignMemberFail({
                userGroupId: payload.userGroupId,
                customerId: payload.customerId,
                error: normalizeHttpError(error),
              }),
              new OrganizationActions.OrganizationClearData(),
            ])
          )
        )
    )
  );

  @Effect()
  unassignPermissionFromUserGroup$: Observable<
    | UserGroupActions.UnassignPermissionSuccess
    | UserGroupActions.UnassignPermissionFail
    | OrganizationActions.OrganizationClearData
  > = this.actions$.pipe(
    ofType(UserGroupActions.USER_GROUP_UNASSIGN_PERMISSION),
    map((action: UserGroupActions.UnassignPermission) => action.payload),
    mergeMap((payload) =>
      this.userGroupConnector
        .unassignOrderApprovalPermission(
          payload.userId,
          payload.userGroupId,
          payload.permissionUid
        )
        .pipe(
          switchMap((data) => [
            new UserGroupActions.UnassignPermissionSuccess({
              permissionUid: data.id,
              selected: data.selected,
            }),
            new OrganizationActions.OrganizationClearData(),
          ]),
          catchError((error: HttpErrorResponse) =>
            from([
              new UserGroupActions.UnassignPermissionFail({
                userGroupId: payload.userGroupId,
                permissionUid: payload.permissionUid,
                error: normalizeHttpError(error),
              }),
              new OrganizationActions.OrganizationClearData(),
            ])
          )
        )
    )
  );

  @Effect()
  unassignAllMembersFromUserGroup$: Observable<
    | UserGroupActions.UnassignAllMembersSuccess
    | UserGroupActions.UnassignAllMembersFail
    | OrganizationActions.OrganizationClearData
  > = this.actions$.pipe(
    ofType(UserGroupActions.USER_GROUP_UNASSIGN_ALL_MEMBERS),
    map((action: UserGroupActions.UnassignAllMembers) => action.payload),
    switchMap((payload) =>
      this.userGroupConnector
        .unassignAllMembers(payload.userId, payload.userGroupId)
        .pipe(
          switchMap(() => [
            new UserGroupActions.UnassignAllMembersSuccess({
              selected: false,
            }),
            new OrganizationActions.OrganizationClearData(),
          ]),
          catchError((error: HttpErrorResponse) =>
            from([
              new UserGroupActions.UnassignAllMembersFail({
                userGroupId: payload.userGroupId,
                error: normalizeHttpError(error),
              }),
              new OrganizationActions.OrganizationClearData(),
            ])
          )
        )
    )
  );

  constructor(
    private actions$: Actions,
    private userGroupConnector: UserGroupConnector
  ) {}
}
