import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EntitiesModel } from '../../../model/misc.model';
import { OrgUnitUserGroup } from '../../../model/user-group.model';
import { Permission } from '../../../model/permission.model';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import {
  OrgUnitUserGroupActions,
  PermissionActions,
  B2BUserActions,
} from '../actions/index';
import { normalizeListPage } from '../../utils/serializer';
import { OrgUnitUserGroupConnector } from '../../connectors/user-group/user-group.connector';
import { B2BUser } from 'projects/core/src/model';

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
              'uid'
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
  loadOrgUnitUserGroupAvailableOrgCustomers$: Observable<
    | OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomersSuccess
    | B2BUserActions.LoadB2BUserSuccess
    | OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomersFail
  > = this.actions$.pipe(
    ofType(
      OrgUnitUserGroupActions.LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORG_CUSTOMERS
    ),
    map(
      (
        action: OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomers
      ) => action.payload
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
              new OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomersSuccess(
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
              new OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomersFail(
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

  @Effect()
  deleteOrgUnitUserGroup$: Observable<
    | OrgUnitUserGroupActions.DeleteOrgUnitUserGroupSuccess
    | OrgUnitUserGroupActions.DeleteOrgUnitUserGroupFail
  > = this.actions$.pipe(
    ofType(OrgUnitUserGroupActions.DELETE_ORG_UNIT_USER_GROUP),
    map(
      (action: OrgUnitUserGroupActions.DeleteOrgUnitUserGroup) => action.payload
    ),
    switchMap(payload =>
      this.orgUnitUserGroupConnector
        .delete(payload.userId, payload.orgUnitUserGroupUid)
        .pipe(
          map(
            data =>
              new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupSuccess(data)
          ),
          catchError(error =>
            of(
              new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupFail({
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
    | OrgUnitUserGroupActions.CreateOrgUnitUserGroupOrderApprovalPermissionSuccess
    | OrgUnitUserGroupActions.CreateOrgUnitUserGroupOrderApprovalPermissionFail
  > = this.actions$.pipe(
    ofType(
      OrgUnitUserGroupActions.CREATE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION
    ),
    map(
      (
        action: OrgUnitUserGroupActions.CreateOrgUnitUserGroupOrderApprovalPermission
      ) => action.payload
    ),
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
              new OrgUnitUserGroupActions.CreateOrgUnitUserGroupOrderApprovalPermissionSuccess(
                {
                  permissionUid: payload.permissionUid,
                  selected: true,
                }
              )
          ),
          catchError(error =>
            of(
              new OrgUnitUserGroupActions.CreateOrgUnitUserGroupOrderApprovalPermissionFail(
                {
                  orgUnitUserGroupId: payload.orgUnitUserGroupUid,
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
    | OrgUnitUserGroupActions.CreateOrgUnitUserGroupMemberSuccess
    | OrgUnitUserGroupActions.CreateOrgUnitUserGroupMemberFail
  > = this.actions$.pipe(
    ofType(OrgUnitUserGroupActions.CREATE_ORG_UNIT_USER_GROUP_MEMBER),
    map(
      (action: OrgUnitUserGroupActions.CreateOrgUnitUserGroupMember) =>
        action.payload
    ),
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
              new OrgUnitUserGroupActions.CreateOrgUnitUserGroupMemberSuccess({
                customerId: payload.customerId,
                selected: true,
              })
          ),
          catchError(error =>
            of(
              new OrgUnitUserGroupActions.CreateOrgUnitUserGroupMemberFail({
                orgUnitUserGroupId: payload.orgUnitUserGroupUid,
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
    | OrgUnitUserGroupActions.DeleteOrgUnitUserGroupMemberSuccess
    | OrgUnitUserGroupActions.DeleteOrgUnitUserGroupMemberFail
  > = this.actions$.pipe(
    ofType(OrgUnitUserGroupActions.DELETE_ORG_UNIT_USER_GROUP_MEMBER),
    map(
      (action: OrgUnitUserGroupActions.DeleteOrgUnitUserGroupMember) =>
        action.payload
    ),
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
              new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupMemberSuccess({
                customerId: payload.customerId,
                selected: false,
              })
          ),
          catchError(error =>
            of(
              new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupMemberFail({
                orgUnitUserGroupId: payload.orgUnitUserGroupUid,
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
    | OrgUnitUserGroupActions.DeleteOrgUnitUserGroupOrderApprovalPermissionSuccess
    | OrgUnitUserGroupActions.DeleteOrgUnitUserGroupOrderApprovalPermissionFail
  > = this.actions$.pipe(
    ofType(
      OrgUnitUserGroupActions.DELETE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION
    ),
    map(
      (
        action: OrgUnitUserGroupActions.DeleteOrgUnitUserGroupOrderApprovalPermission
      ) => action.payload
    ),
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
              new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupOrderApprovalPermissionSuccess(
                {
                  permissionUid: payload.permissionUid,
                  selected: false,
                }
              )
          ),
          catchError(error =>
            of(
              new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupOrderApprovalPermissionFail(
                {
                  orgUnitUserGroupId: payload.orgUnitUserGroupUid,
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
    | OrgUnitUserGroupActions.DeleteOrgUnitUserGroupMembersSuccess
    | OrgUnitUserGroupActions.DeleteOrgUnitUserGroupMembersFail
  > = this.actions$.pipe(
    ofType(OrgUnitUserGroupActions.DELETE_ORG_UNIT_USER_GROUP_MEMBERS),
    map(
      (action: OrgUnitUserGroupActions.DeleteOrgUnitUserGroupMembers) =>
        action.payload
    ),
    switchMap(payload =>
      this.orgUnitUserGroupConnector
        .unassignAllMembers(payload.userId, payload.orgUnitUserGroupUid)
        .pipe(
          map(
            () =>
              new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupMembersSuccess({
                selected: false,
              })
          ),
          catchError(error =>
            of(
              new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupMembersFail({
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
