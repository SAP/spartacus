import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  OrgUnitUserGroup,
  EntitiesModel,
  Permission,
  B2BUser,
} from '../../../model/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import {
  UserGroupActions,
  PermissionActions,
  B2BUserActions,
} from '../actions/index';
import { normalizeListPage } from '../../utils/serializer';
import { UserGroupConnector } from '../../connectors/user-group/user-group.connector';

@Injectable()
export class UserGroupEffects {
  @Effect()
  loadUserGroup$: Observable<
    UserGroupActions.LoadUserGroupSuccess | UserGroupActions.LoadUserGroupFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.LOAD_USER_GROUP),
    map((action: UserGroupActions.LoadUserGroup) => action.payload),
    switchMap(({ userId, orgUnitUserGroupUid }) => {
      return this.userGroupConnector.get(userId, orgUnitUserGroupUid).pipe(
        map((orgUnitUserGroup: OrgUnitUserGroup) => {
          return new UserGroupActions.LoadUserGroupSuccess([orgUnitUserGroup]);
        }),
        catchError(error =>
          of(
            new UserGroupActions.LoadUserGroupFail({
              orgUnitUserGroupUid,
              error: makeErrorSerializable(error),
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
    switchMap(payload =>
      this.userGroupConnector.getList(payload.userId, payload.params).pipe(
        switchMap((orgUnitUserGroups: EntitiesModel<OrgUnitUserGroup>) => {
          const { values, page } = normalizeListPage(orgUnitUserGroups, 'uid');
          return [
            new UserGroupActions.LoadUserGroupSuccess(values),
            new UserGroupActions.LoadUserGroupsSuccess({
              page,
              params: payload.params,
            }),
          ];
        }),
        catchError(error =>
          of(
            new UserGroupActions.LoadUserGroupsFail({
              params: payload.params,
              error: makeErrorSerializable(error),
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
    switchMap(payload =>
      this.userGroupConnector
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
              new UserGroupActions.LoadPermissionsSuccess({
                orgUnitUserGroupUid: payload.orgUnitUserGroupUid,
                page,
                params: payload.params,
              }),
            ];
          }),
          catchError(error =>
            of(
              new UserGroupActions.LoadPermissionsFail({
                orgUnitUserGroupUid: payload.orgUnitUserGroupUid,
                params: payload.params,
                error: makeErrorSerializable(error),
              })
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
    switchMap(payload =>
      this.userGroupConnector
        .getAvailableOrgCustomers(
          payload.userId,
          payload.orgUnitUserGroupUid,
          payload.params
        )
        .pipe(
          switchMap((customers: EntitiesModel<B2BUser>) => {
            const { values, page } = normalizeListPage(customers, 'uid');
            return [
              new B2BUserActions.LoadB2BUserSuccess(values),
              new UserGroupActions.LoadAvailableOrgCustomersSuccess({
                orgUnitUserGroupUid: payload.orgUnitUserGroupUid,
                page,
                params: payload.params,
              }),
            ];
          }),
          catchError(error =>
            of(
              new UserGroupActions.LoadAvailableOrgCustomersFail({
                orgUnitUserGroupUid: payload.orgUnitUserGroupUid,
                params: payload.params,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  createUserGroup$: Observable<
    | UserGroupActions.CreateUserGroupSuccess
    | UserGroupActions.CreateUserGroupFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.CREATE_USER_GROUP),
    map((action: UserGroupActions.CreateUserGroup) => action.payload),
    switchMap(payload =>
      this.userGroupConnector
        .create(payload.userId, payload.orgUnitUserGroup)
        .pipe(
          map(data => new UserGroupActions.CreateUserGroupSuccess(data)),
          catchError(error =>
            of(
              new UserGroupActions.CreateUserGroupFail({
                orgUnitUserGroupUid: payload.orgUnitUserGroup.uid,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  updateUserGroup$: Observable<
    | UserGroupActions.UpdateUserGroupSuccess
    | UserGroupActions.UpdateUserGroupFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.UPDATE_USER_GROUP),
    map((action: UserGroupActions.UpdateUserGroup) => action.payload),
    switchMap(payload =>
      this.userGroupConnector
        .update(
          payload.userId,
          payload.orgUnitUserGroupUid,
          payload.orgUnitUserGroup
        )
        .pipe(
          map(data => new UserGroupActions.UpdateUserGroupSuccess(data)),
          catchError(error =>
            of(
              new UserGroupActions.UpdateUserGroupFail({
                orgUnitUserGroupUid: payload.orgUnitUserGroup.uid,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  deleteUserGroup$: Observable<
    | UserGroupActions.DeleteUserGroupSuccess
    | UserGroupActions.DeleteUserGroupFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.DELETE_USER_GROUP),
    map((action: UserGroupActions.DeleteUserGroup) => action.payload),
    switchMap(payload =>
      this.userGroupConnector
        .delete(payload.userId, payload.orgUnitUserGroupUid)
        .pipe(
          map(data => new UserGroupActions.DeleteUserGroupSuccess(data)),
          catchError(error =>
            of(
              new UserGroupActions.DeleteUserGroupFail({
                orgUnitUserGroupUid: payload.orgUnitUserGroupUid,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  assignPermissionToUserGroup$: Observable<
    | UserGroupActions.AssignPermissionSuccess
    | UserGroupActions.AssignPermissionFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.USER_GROUP_ASSIGN_PERMISSION),
    map((action: UserGroupActions.AssignPermission) => action.payload),
    switchMap(payload =>
      this.userGroupConnector
        .assignOrderApprovalPermission(
          payload.userId,
          payload.orgUnitUserGroupUid,
          payload.permissionUid
        )
        .pipe(
          map(
            () =>
              new UserGroupActions.AssignPermissionSuccess({
                permissionUid: payload.permissionUid,
                selected: true,
              })
          ),
          catchError(error =>
            of(
              new UserGroupActions.AssignPermissionFail({
                orgUnitUserGroupUid: payload.orgUnitUserGroupUid,
                permissionUid: payload.permissionUid,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  assignMemberUnitUserGroup$: Observable<
    UserGroupActions.AssignMemberSuccess | UserGroupActions.AssignMemberFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.USER_GROUP_ASSIGN_MEMBER),
    map((action: UserGroupActions.AssignMember) => action.payload),
    switchMap(payload =>
      this.userGroupConnector
        .assignMember(
          payload.userId,
          payload.orgUnitUserGroupUid,
          payload.customerId
        )
        .pipe(
          map(
            () =>
              new UserGroupActions.AssignMemberSuccess({
                customerId: payload.customerId,
                selected: true,
              })
          ),
          catchError(error =>
            of(
              new UserGroupActions.AssignMemberFail({
                orgUnitUserGroupUid: payload.orgUnitUserGroupUid,
                customerId: payload.customerId,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  unassignMemberFromUserGroup$: Observable<
    UserGroupActions.UnassignMemberSuccess | UserGroupActions.UnassignMemberFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.USER_GROUP_UNASSIGN_MEMBER),
    map((action: UserGroupActions.UnassignMember) => action.payload),
    switchMap(payload =>
      this.userGroupConnector
        .unassignMember(
          payload.userId,
          payload.orgUnitUserGroupUid,
          payload.customerId
        )
        .pipe(
          map(
            () =>
              new UserGroupActions.UnassignMemberSuccess({
                customerId: payload.customerId,
                selected: false,
              })
          ),
          catchError(error =>
            of(
              new UserGroupActions.UnassignMemberFail({
                orgUnitUserGroupUid: payload.orgUnitUserGroupUid,
                customerId: payload.customerId,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  unassignPermissionFromUserGroup$: Observable<
    | UserGroupActions.UnassignPermissionSuccess
    | UserGroupActions.UnassignPermissionFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.USER_GROUP_UNASSIGN_PERMISSION),
    map((action: UserGroupActions.UnassignPermission) => action.payload),
    switchMap(payload =>
      this.userGroupConnector
        .unassignOrderApprovalPermission(
          payload.userId,
          payload.orgUnitUserGroupUid,
          payload.permissionUid
        )
        .pipe(
          map(
            () =>
              new UserGroupActions.UnassignPermissionSuccess({
                permissionUid: payload.permissionUid,
                selected: false,
              })
          ),
          catchError(error =>
            of(
              new UserGroupActions.UnassignPermissionFail({
                orgUnitUserGroupUid: payload.orgUnitUserGroupUid,
                permissionUid: payload.permissionUid,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  unassignAllMembersFromUserGroup$: Observable<
    | UserGroupActions.UnassignAllMembersSuccess
    | UserGroupActions.UnassignAllMembersFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.USER_GROUP_UNASSIGN_ALL_MEMBERS),
    map((action: UserGroupActions.UnassignAllMembers) => action.payload),
    switchMap(payload =>
      this.userGroupConnector
        .unassignAllMembers(payload.userId, payload.orgUnitUserGroupUid)
        .pipe(
          map(
            () =>
              new UserGroupActions.UnassignAllMembersSuccess({
                selected: false,
              })
          ),
          catchError(error =>
            of(
              new UserGroupActions.UnassignAllMembersFail({
                orgUnitUserGroupUid: payload.orgUnitUserGroupUid,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  constructor(
    private actions$: Actions,
    private userGroupConnector: UserGroupConnector
  ) {}
}
