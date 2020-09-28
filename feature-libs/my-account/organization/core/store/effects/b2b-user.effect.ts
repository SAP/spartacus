import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  B2BUser,
  EntitiesModel,
  normalizeHttpError,
  Permission,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  groupBy,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { B2BUserConnector } from '../../connectors/b2b-user/b2b-user.connector';
import { UserGroup } from '../../model/user-group.model';
import { normalizeListPage, serializeParams } from '../../utils/serializer';
import {
  B2BUserActions,
  OrgUnitActions,
  PermissionActions,
  UserGroupActions,
} from '../actions/index';

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
        catchError((error: HttpErrorResponse) =>
          of(
            new B2BUserActions.LoadB2BUserFail({
              orgCustomerId,
              error: normalizeHttpError(error),
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
    switchMap((payload) =>
      this.b2bUserConnector.create(payload.userId, payload.orgCustomer).pipe(
        map((data) => {
          this.routingService.go({
            cxRoute: 'userDetails',
            params: { customerId: data.customerId },
          });

          return new B2BUserActions.CreateB2BUserSuccess(data);
        }),
        catchError((error: HttpErrorResponse) =>
          of(
            new B2BUserActions.CreateB2BUserFail({
              orgCustomerId: payload.orgCustomer.customerId,
              error: normalizeHttpError(error),
            })
          )
        )
      )
    )
  );

  @Effect()
  createB2BUserAndAssignToApprovers$: Observable<
    | B2BUserActions.CreateB2BUserSuccess
    | OrgUnitActions.AssignApprover
    | B2BUserActions.CreateB2BUserFail
  > = this.actions$.pipe(
    ofType(B2BUserActions.CREATE_B2B_USER_AND_ASSIGN_TO_APPROVERS),
    map((action: B2BUserActions.CreateB2BUser) => action.payload),
    switchMap((payload) =>
      this.b2bUserConnector.create(payload.userId, payload.orgCustomer).pipe(
        concatMap((data) => {
          const assignApproverPayload = {
            userId: payload.userId,
            orgUnitId: payload.orgCustomer.orgUnit.uid,
            orgCustomerId: data.customerId,
            roleId: 'b2bapprovergroup',
          };

          this.routingService.go({
            cxRoute: 'userDetails',
            params: { customerId: data.customerId },
          });

          return [
            new B2BUserActions.CreateB2BUserSuccess(data),
            new OrgUnitActions.AssignApprover(assignApproverPayload),
          ];
        }),
        catchError((error: HttpErrorResponse) =>
          of(
            new B2BUserActions.CreateB2BUserFail({
              orgCustomerId: payload.orgCustomer.customerId,
              error: normalizeHttpError(error),
            })
          )
        )
      )
    )
  );

  @Effect()
  updateB2BUser$: Observable<
    // B2BUserActions.UpdateB2BUserSuccess
    B2BUserActions.LoadB2BUser | B2BUserActions.UpdateB2BUserFail
  > = this.actions$.pipe(
    ofType(B2BUserActions.UPDATE_B2B_USER),
    map((action: B2BUserActions.UpdateB2BUser) => action.payload),
    switchMap((payload) =>
      this.b2bUserConnector
        .update(payload.userId, payload.orgCustomerId, payload.orgCustomer)
        .pipe(
          // TODO: Workaround for empty PATCH response:
          // map((data) => new B2BUserActions.UpdateB2BUserSuccess(data)),
          map(() => new B2BUserActions.LoadB2BUser(payload)),
          catchError((error: HttpErrorResponse) =>
            of(
              new B2BUserActions.UpdateB2BUserFail({
                orgCustomerId: payload.orgCustomer.customerId,
                error: normalizeHttpError(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  updateB2BUserAndAssignToApprovers$: Observable<
    // B2BUserActions.UpdateB2BUserSuccess
    | B2BUserActions.LoadB2BUser
    | OrgUnitActions.AssignApprover
    | B2BUserActions.UpdateB2BUserFail
  > = this.actions$.pipe(
    ofType(B2BUserActions.UPDATE_B2B_USER_AND_ASSIGN_TO_APPROVERS),
    map((action: B2BUserActions.UpdateB2BUser) => action.payload),
    switchMap((payload) =>
      this.b2bUserConnector
        .update(payload.userId, payload.orgCustomerId, payload.orgCustomer)
        .pipe(
          // TODO: Workaround for empty PATCH response:
          // map((data) => new B2BUserActions.UpdateB2BUserSuccess(data)),
          map(() => {
            const assignApproverPayload = {
              userId: payload.userId,
              orgUnitId: payload.orgCustomer.orgUnit.uid,
              orgCustomerId: payload.orgCustomerId,
              roleId: 'b2bapprovergroup',
            };
            return new OrgUnitActions.AssignApprover(assignApproverPayload);
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              new B2BUserActions.UpdateB2BUserFail({
                orgCustomerId: payload.orgCustomer.customerId,
                error: normalizeHttpError(error),
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
    switchMap((payload) =>
      this.b2bUserConnector.getList(payload.userId, payload.params).pipe(
        switchMap((b2bUsers: EntitiesModel<B2BUser>) => {
          const { values, page } = normalizeListPage(b2bUsers, 'customerId');
          return [
            new B2BUserActions.LoadB2BUserSuccess(values),
            new B2BUserActions.LoadB2BUsersSuccess({
              page,
              params: payload.params,
            }),
          ];
        }),
        catchError((error: HttpErrorResponse) =>
          of(
            new B2BUserActions.LoadB2BUsersFail({
              params: payload.params,
              error: normalizeHttpError(error),
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
    groupBy(({ orgCustomerId, params }) =>
      serializeParams(orgCustomerId, params)
    ),
    mergeMap((group) =>
      group.pipe(
        switchMap((payload) =>
          this.b2bUserConnector
            .getApprovers(payload.userId, payload.orgCustomerId, payload.params)
            .pipe(
              switchMap((approvers: EntitiesModel<B2BUser>) => {
                const { values, page } = normalizeListPage(
                  approvers,
                  'customerId'
                );
                return [
                  new B2BUserActions.LoadB2BUserSuccess(values),
                  new B2BUserActions.LoadB2BUserApproversSuccess({
                    orgCustomerId: payload.orgCustomerId,
                    page,
                    params: payload.params,
                  }),
                ];
              }),
              catchError((error: HttpErrorResponse) =>
                of(
                  new B2BUserActions.LoadB2BUserApproversFail({
                    orgCustomerId: payload.orgCustomerId,
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
  loadB2BUserPermissions$: Observable<
    | B2BUserActions.LoadB2BUserPermissionsSuccess
    | B2BUserActions.LoadB2BUserPermissionsFail
    | PermissionActions.LoadPermissionSuccess
  > = this.actions$.pipe(
    ofType(B2BUserActions.LOAD_B2B_USER_PERMISSIONS),
    map((action: B2BUserActions.LoadB2BUserPermissions) => action.payload),
    groupBy(({ orgCustomerId, params }) =>
      serializeParams(orgCustomerId, params)
    ),
    mergeMap((group) =>
      group.pipe(
        switchMap((payload) =>
          this.b2bUserConnector
            .getPermissions(
              payload.userId,
              payload.orgCustomerId,
              payload.params
            )
            .pipe(
              switchMap((permissions: EntitiesModel<Permission>) => {
                const { values, page } = normalizeListPage(permissions, 'code');
                return [
                  new PermissionActions.LoadPermissionSuccess(values),
                  new B2BUserActions.LoadB2BUserPermissionsSuccess({
                    orgCustomerId: payload.orgCustomerId,
                    page,
                    params: payload.params,
                  }),
                ];
              }),
              catchError((error: HttpErrorResponse) =>
                of(
                  new B2BUserActions.LoadB2BUserPermissionsFail({
                    orgCustomerId: payload.orgCustomerId,
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
  loadB2BUserUserGroups$: Observable<
    | B2BUserActions.LoadB2BUserUserGroupsSuccess
    | B2BUserActions.LoadB2BUserUserGroupsFail
    | UserGroupActions.LoadUserGroupSuccess
  > = this.actions$.pipe(
    ofType(B2BUserActions.LOAD_B2B_USER_USER_GROUPS),
    map((action: B2BUserActions.LoadB2BUserUserGroups) => action.payload),
    groupBy(({ orgCustomerId, params }) =>
      serializeParams(orgCustomerId, params)
    ),
    mergeMap((group) =>
      group.pipe(
        switchMap((payload) =>
          this.b2bUserConnector
            .getUserGroups(
              payload.userId,
              payload.orgCustomerId,
              payload.params
            )
            .pipe(
              switchMap((userGroups: EntitiesModel<UserGroup>) => {
                const { values, page } = normalizeListPage(userGroups, 'uid');
                return [
                  new UserGroupActions.LoadUserGroupSuccess(values),
                  new B2BUserActions.LoadB2BUserUserGroupsSuccess({
                    orgCustomerId: payload.orgCustomerId,
                    page,
                    params: payload.params,
                  }),
                ];
              }),
              catchError((error: HttpErrorResponse) =>
                of(
                  new B2BUserActions.LoadB2BUserUserGroupsFail({
                    orgCustomerId: payload.orgCustomerId,
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
  assignApproverToB2BUser$: Observable<
    | B2BUserActions.CreateB2BUserApproverSuccess
    | B2BUserActions.CreateB2BUserApproverFail
  > = this.actions$.pipe(
    ofType(B2BUserActions.CREATE_B2B_USER_APPROVER),
    map((action: B2BUserActions.CreateB2BUserApprover) => action.payload),
    mergeMap((payload) =>
      this.b2bUserConnector
        .assignApprover(
          payload.userId,
          payload.orgCustomerId,
          payload.approverId
        )
        .pipe(
          map(
            (data) =>
              new B2BUserActions.CreateB2BUserApproverSuccess({
                // Occ returned email, but we use customerId in store
                approverId: payload.approverId,
                selected: data.selected,
              })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              new B2BUserActions.CreateB2BUserApproverFail({
                orgCustomerId: payload.orgCustomerId,
                approverId: payload.approverId,
                error: normalizeHttpError(error),
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
    mergeMap((payload) =>
      this.b2bUserConnector
        .unassignApprover(
          payload.userId,
          payload.orgCustomerId,
          payload.approverId
        )
        .pipe(
          map(
            (data) =>
              new B2BUserActions.DeleteB2BUserApproverSuccess({
                // Occ returned email, but we use customerId in store
                approverId: payload.approverId,
                selected: data.selected,
              })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              new B2BUserActions.DeleteB2BUserApproverFail({
                orgCustomerId: payload.orgCustomerId,
                approverId: payload.approverId,
                error: normalizeHttpError(error),
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
    ofType(B2BUserActions.CREATE_B2B_USER_PERMISSION),
    map((action: B2BUserActions.CreateB2BUserPermission) => action.payload),
    mergeMap((payload) =>
      this.b2bUserConnector
        .assignPermission(
          payload.userId,
          payload.orgCustomerId,
          payload.permissionId
        )
        .pipe(
          map(
            (data) =>
              new B2BUserActions.CreateB2BUserPermissionSuccess({
                permissionId: data.id,
                selected: data.selected,
              })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              new B2BUserActions.CreateB2BUserPermissionFail({
                orgCustomerId: payload.orgCustomerId,
                permissionId: payload.permissionId,
                error: normalizeHttpError(error),
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
    ofType(B2BUserActions.DELETE_B2B_USER_PERMISSION),
    map((action: B2BUserActions.DeleteB2BUserPermission) => action.payload),
    mergeMap((payload) =>
      this.b2bUserConnector
        .unassignPermission(
          payload.userId,
          payload.orgCustomerId,
          payload.permissionId
        )
        .pipe(
          map(
            (data) =>
              new B2BUserActions.DeleteB2BUserPermissionSuccess({
                permissionId: data.id,
                selected: data.selected,
              })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              new B2BUserActions.DeleteB2BUserPermissionFail({
                orgCustomerId: payload.orgCustomerId,
                permissionId: payload.permissionId,
                error: normalizeHttpError(error),
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
    ofType(B2BUserActions.CREATE_B2B_USER_USER_GROUP),
    map((action: B2BUserActions.CreateB2BUserUserGroup) => action.payload),
    mergeMap((payload) =>
      this.b2bUserConnector
        .assignUserGroup(
          payload.userId,
          payload.orgCustomerId,
          payload.userGroupId
        )
        .pipe(
          map(
            (data) =>
              new B2BUserActions.CreateB2BUserUserGroupSuccess({
                uid: data.id,
                selected: data.selected,
              })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              new B2BUserActions.CreateB2BUserUserGroupFail({
                orgCustomerId: payload.orgCustomerId,
                userGroupId: payload.userGroupId,
                error: normalizeHttpError(error),
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
    ofType(B2BUserActions.DELETE_B2B_USER_USER_GROUP),
    map((action: B2BUserActions.DeleteB2BUserUserGroup) => action.payload),
    mergeMap((payload) =>
      this.b2bUserConnector
        .unassignUserGroup(
          payload.userId,
          payload.orgCustomerId,
          payload.userGroupId
        )
        .pipe(
          map(
            // TODO: Workaround because occ doesn't respond here
            // (data) =>
            //   new B2BUserActions.DeleteB2BUserUserGroupSuccess({
            //     uid: data.id,
            //     selected: data.selected,
            //   })
            () =>
              new B2BUserActions.DeleteB2BUserUserGroupSuccess({
                uid: payload.userGroupId,
                selected: false,
              })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              new B2BUserActions.DeleteB2BUserUserGroupFail({
                orgCustomerId: payload.orgCustomerId,
                userGroupId: payload.userGroupId,
                error: normalizeHttpError(error),
              })
            )
          )
        )
    )
  );

  constructor(
    private actions$: Actions,
    private b2bUserConnector: B2BUserConnector,
    private routingService: RoutingService
  ) {}
}
