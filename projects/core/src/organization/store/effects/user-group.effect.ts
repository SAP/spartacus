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
import { OrgUnitUserGroupConnector } from '../../connectors/user-group/user-group.connector';

@Injectable()
export class OrgUnitUserGroupEffects {
  @Effect()
  loadOrgUnitUserGroup$: Observable<
    | UserGroupActions.LoadOrgUnitUserGroupSuccess
    | UserGroupActions.LoadOrgUnitUserGroupFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.LOAD_ORG_UNIT_USER_GROUP),
    map((action: UserGroupActions.LoadOrgUnitUserGroup) => action.payload),
    switchMap(({ userId, orgUnitUserGroupUid }) => {
      return this.orgUnitUserGroupConnector
        .get(userId, orgUnitUserGroupUid)
        .pipe(
          map((orgUnitUserGroup: OrgUnitUserGroup) => {
            return new UserGroupActions.LoadOrgUnitUserGroupSuccess([
              orgUnitUserGroup,
            ]);
          }),
          catchError(error =>
            of(
              new UserGroupActions.LoadOrgUnitUserGroupFail({
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
    | UserGroupActions.LoadOrgUnitUserGroupsSuccess
    | UserGroupActions.LoadOrgUnitUserGroupSuccess
    | UserGroupActions.LoadOrgUnitUserGroupsFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.LOAD_ORG_UNIT_USER_GROUPS),
    map((action: UserGroupActions.LoadOrgUnitUserGroups) => action.payload),
    switchMap(payload =>
      this.orgUnitUserGroupConnector
        .getList(payload.userId, payload.params)
        .pipe(
          switchMap((orgUnitUserGroups: EntitiesModel<OrgUnitUserGroup>) => {
            const { values, page } = normalizeListPage(
              orgUnitUserGroups,
              'uid'
            );
            return [
              new UserGroupActions.LoadOrgUnitUserGroupSuccess(values),
              new UserGroupActions.LoadOrgUnitUserGroupsSuccess({
                page,
                params: payload.params,
              }),
            ];
          }),
          catchError(error =>
            of(
              new UserGroupActions.LoadOrgUnitUserGroupsFail({
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
    | UserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissionsSuccess
    | PermissionActions.LoadPermissionSuccess
    | UserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissionsFail
  > = this.actions$.pipe(
    ofType(
      UserGroupActions.LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS
    ),
    map(
      (
        action: UserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissions
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
              new UserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissionsSuccess(
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
              new UserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissionsFail(
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
  loadOrgUnitUserGroupAvailableOrgCustomers$: Observable<
    | UserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomersSuccess
    | B2BUserActions.LoadB2BUserSuccess
    | UserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomersFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORG_CUSTOMERS),
    map(
      (action: UserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomers) =>
        action.payload
    ),
    switchMap(payload =>
      this.orgUnitUserGroupConnector
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
              new UserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomersSuccess(
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
              new UserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomersFail(
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
    | UserGroupActions.CreateOrgUnitUserGroupSuccess
    | UserGroupActions.CreateOrgUnitUserGroupFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.CREATE_ORG_UNIT_USER_GROUP),
    map((action: UserGroupActions.CreateOrgUnitUserGroup) => action.payload),
    switchMap(payload =>
      this.orgUnitUserGroupConnector
        .create(payload.userId, payload.orgUnitUserGroup)
        .pipe(
          map(data => new UserGroupActions.CreateOrgUnitUserGroupSuccess(data)),
          catchError(error =>
            of(
              new UserGroupActions.CreateOrgUnitUserGroupFail({
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
    | UserGroupActions.UpdateOrgUnitUserGroupSuccess
    | UserGroupActions.UpdateOrgUnitUserGroupFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.UPDATE_ORG_UNIT_USER_GROUP),
    map((action: UserGroupActions.UpdateOrgUnitUserGroup) => action.payload),
    switchMap(payload =>
      this.orgUnitUserGroupConnector
        .update(
          payload.userId,
          payload.orgUnitUserGroupUid,
          payload.orgUnitUserGroup
        )
        .pipe(
          map(data => new UserGroupActions.UpdateOrgUnitUserGroupSuccess(data)),
          catchError(error =>
            of(
              new UserGroupActions.UpdateOrgUnitUserGroupFail({
                orgUnitUserGroupUid: payload.orgUnitUserGroup.uid,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  deleteOrgUnitUserGroup$: Observable<
    | UserGroupActions.DeleteOrgUnitUserGroupSuccess
    | UserGroupActions.DeleteOrgUnitUserGroupFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.DELETE_ORG_UNIT_USER_GROUP),
    map((action: UserGroupActions.DeleteOrgUnitUserGroup) => action.payload),
    switchMap(payload =>
      this.orgUnitUserGroupConnector
        .delete(payload.userId, payload.orgUnitUserGroupUid)
        .pipe(
          map(data => new UserGroupActions.DeleteOrgUnitUserGroupSuccess(data)),
          catchError(error =>
            of(
              new UserGroupActions.DeleteOrgUnitUserGroupFail({
                orgUnitUserGroupUid: payload.orgUnitUserGroupUid,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  assignPermissionToOrgUnitUserGroup$: Observable<
    | UserGroupActions.CreateOrgUnitUserGroupOrderApprovalPermissionSuccess
    | UserGroupActions.CreateOrgUnitUserGroupOrderApprovalPermissionFail
  > = this.actions$.pipe(
    ofType(
      UserGroupActions.CREATE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION
    ),
    map((action: UserGroupActions.AssignPermission) => action.payload),
    switchMap(payload =>
      this.orgUnitUserGroupConnector
        .assignOrderApprovalPermission(
          payload.userId,
          payload.orgUnitUserGroupUid,
          payload.permissionUid
        )
        .pipe(
          map(
            () =>
              new UserGroupActions.CreateOrgUnitUserGroupOrderApprovalPermissionSuccess(
                {
                  permissionUid: payload.permissionUid,
                  selected: true,
                }
              )
          ),
          catchError(error =>
            of(
              new UserGroupActions.CreateOrgUnitUserGroupOrderApprovalPermissionFail(
                {
                  orgUnitUserGroupUid: payload.orgUnitUserGroupUid,
                  permissionUid: payload.permissionUid,
                  error: makeErrorSerializable(error),
                }
              )
            )
          )
        )
    )
  );

  @Effect()
  assignMemberToOrgUnitUserGroup$: Observable<
    | UserGroupActions.CreateOrgUnitUserGroupMemberSuccess
    | UserGroupActions.CreateOrgUnitUserGroupMemberFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.CREATE_ORG_UNIT_USER_GROUP_MEMBER),
    map((action: UserGroupActions.AssignMember) => action.payload),
    switchMap(payload =>
      this.orgUnitUserGroupConnector
        .assignMember(
          payload.userId,
          payload.orgUnitUserGroupUid,
          payload.customerId
        )
        .pipe(
          map(
            () =>
              new UserGroupActions.CreateOrgUnitUserGroupMemberSuccess({
                customerId: payload.customerId,
                selected: true,
              })
          ),
          catchError(error =>
            of(
              new UserGroupActions.CreateOrgUnitUserGroupMemberFail({
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
  unassignMemberFromOrgUnitUserGroup$: Observable<
    | UserGroupActions.DeleteOrgUnitUserGroupMemberSuccess
    | UserGroupActions.DeleteOrgUnitUserGroupMemberFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.DELETE_ORG_UNIT_USER_GROUP_MEMBER),
    map((action: UserGroupActions.UnassignMember) => action.payload),
    switchMap(payload =>
      this.orgUnitUserGroupConnector
        .unassignMember(
          payload.userId,
          payload.orgUnitUserGroupUid,
          payload.customerId
        )
        .pipe(
          map(
            () =>
              new UserGroupActions.DeleteOrgUnitUserGroupMemberSuccess({
                customerId: payload.customerId,
                selected: false,
              })
          ),
          catchError(error =>
            of(
              new UserGroupActions.DeleteOrgUnitUserGroupMemberFail({
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
  unassignPermissionFromOrgUnitUserGroup$: Observable<
    | UserGroupActions.DeleteOrgUnitUserGroupOrderApprovalPermissionSuccess
    | UserGroupActions.DeleteOrgUnitUserGroupOrderApprovalPermissionFail
  > = this.actions$.pipe(
    ofType(
      UserGroupActions.DELETE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION
    ),
    map((action: UserGroupActions.UnassignPermission) => action.payload),
    switchMap(payload =>
      this.orgUnitUserGroupConnector
        .unassignOrderApprovalPermission(
          payload.userId,
          payload.orgUnitUserGroupUid,
          payload.permissionUid
        )
        .pipe(
          map(
            () =>
              new UserGroupActions.DeleteOrgUnitUserGroupOrderApprovalPermissionSuccess(
                {
                  permissionUid: payload.permissionUid,
                  selected: false,
                }
              )
          ),
          catchError(error =>
            of(
              new UserGroupActions.DeleteOrgUnitUserGroupOrderApprovalPermissionFail(
                {
                  orgUnitUserGroupUid: payload.orgUnitUserGroupUid,
                  permissionUid: payload.permissionUid,
                  error: makeErrorSerializable(error),
                }
              )
            )
          )
        )
    )
  );

  @Effect()
  unassignAllMembersFromOrgUnitUserGroup$: Observable<
    | UserGroupActions.DeleteOrgUnitUserGroupMembersSuccess
    | UserGroupActions.DeleteOrgUnitUserGroupMembersFail
  > = this.actions$.pipe(
    ofType(UserGroupActions.DELETE_ORG_UNIT_USER_GROUP_MEMBERS),
    map((action: UserGroupActions.UnassignAllMembers) => action.payload),
    switchMap(payload =>
      this.orgUnitUserGroupConnector
        .unassignAllMembers(payload.userId, payload.orgUnitUserGroupUid)
        .pipe(
          map(
            () =>
              new UserGroupActions.DeleteOrgUnitUserGroupMembersSuccess({
                selected: false,
              })
          ),
          catchError(error =>
            of(
              new UserGroupActions.DeleteOrgUnitUserGroupMembersFail({
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
    private orgUnitUserGroupConnector: OrgUnitUserGroupConnector
  ) {}
}
