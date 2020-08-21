import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, groupBy, mergeMap } from 'rxjs/operators';
import {
  EntitiesModel,
  B2BApprovalProcess,
  B2BUnitNode,
  B2BUser,
  B2BUnit,
  normalizeHttpError,
} from '@spartacus/core';

import { B2BUserActions, OrgUnitActions } from '../actions/index';
import { normalizeListPage, serializeParams } from '../../utils/serializer';
import { OrgUnitConnector } from '../../connectors/org-unit/org-unit.connector';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class OrgUnitEffects {
  @Effect()
  loadOrgUnit$: Observable<
    | OrgUnitActions.LoadOrgUnitSuccess
    | OrgUnitActions.LoadAddressSuccess
    | OrgUnitActions.LoadAddressesSuccess
    | OrgUnitActions.LoadOrgUnitFail
  > = this.actions$.pipe(
    ofType(OrgUnitActions.LOAD_ORG_UNIT),
    map((action: OrgUnitActions.LoadOrgUnit) => action.payload),
    switchMap(({ userId, orgUnitId }) => {
      return this.orgUnitConnector.get(userId, orgUnitId).pipe(
        switchMap((orgUnit: B2BUnit) => {
          const { values, page } = normalizeListPage(
            { values: orgUnit.addresses },
            'id'
          );
          return [
            new OrgUnitActions.LoadOrgUnitSuccess([orgUnit]),
            new OrgUnitActions.LoadAddressSuccess(values),
            new OrgUnitActions.LoadAddressesSuccess({ page, orgUnitId }),
          ];
        }),
        catchError((error: HttpErrorResponse) =>
          of(
            new OrgUnitActions.LoadOrgUnitFail({
              orgUnitId,
              error: normalizeHttpError(error),
            })
          )
        )
      );
    })
  );

  @Effect()
  loadAvailableOrgUnits$: Observable<
    OrgUnitActions.LoadOrgUnitNodesSuccess | OrgUnitActions.LoadOrgUnitNodesFail
  > = this.actions$.pipe(
    ofType(OrgUnitActions.LOAD_UNIT_NODES),
    map((action: OrgUnitActions.LoadOrgUnitNodes) => action.payload),
    switchMap((payload) =>
      this.orgUnitConnector.getList(payload.userId).pipe(
        map(
          (orgUnitsList: B2BUnitNode[]) =>
            new OrgUnitActions.LoadOrgUnitNodesSuccess(orgUnitsList)
        ),
        catchError((error: HttpErrorResponse) =>
          of(
            new OrgUnitActions.LoadOrgUnitNodesFail({
              error: normalizeHttpError(error),
            })
          )
        )
      )
    )
  );

  @Effect()
  createUnit$: Observable<
    OrgUnitActions.CreateUnitSuccess | OrgUnitActions.CreateUnitFail
  > = this.actions$.pipe(
    ofType(OrgUnitActions.CREATE_ORG_UNIT),
    map((action: OrgUnitActions.CreateUnit) => action.payload),
    switchMap((payload) =>
      this.orgUnitConnector.create(payload.userId, payload.unit).pipe(
        map((data) => new OrgUnitActions.CreateUnitSuccess(data)),
        catchError((error: HttpErrorResponse) =>
          of(
            new OrgUnitActions.CreateUnitFail({
              unitCode: payload.unit.uid,
              error: normalizeHttpError(error),
            })
          )
        )
      )
    )
  );

  @Effect()
  updateUnit$: Observable<
    // | OrgUnitActions.UpdateUnitSuccess
    OrgUnitActions.LoadOrgUnit | OrgUnitActions.UpdateUnitFail
  > = this.actions$.pipe(
    ofType(OrgUnitActions.UPDATE_ORG_UNIT),
    map((action: OrgUnitActions.UpdateUnit) => action.payload),
    switchMap((payload) =>
      this.orgUnitConnector
        .update(payload.userId, payload.unitCode, payload.unit)
        .pipe(
          // TODO: Workaround for empty PATCH response:
          // map(() => new OrgUnitActions.UpdateUnitSuccess(payload.unit)),
          map(
            () =>
              new OrgUnitActions.LoadOrgUnit({
                userId: payload.userId,
                orgUnitId: payload.unitCode,
              })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              new OrgUnitActions.UpdateUnitFail({
                unitCode: payload.unit.uid,
                error: normalizeHttpError(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  loadTree$: Observable<
    OrgUnitActions.LoadTreeSuccess | OrgUnitActions.LoadTreeFail
  > = this.actions$.pipe(
    ofType(OrgUnitActions.LOAD_UNIT_TREE),
    map((action: OrgUnitActions.LoadOrgUnit) => action.payload),
    switchMap(({ userId }) => {
      return this.orgUnitConnector.getTree(userId).pipe(
        map(
          (orgUnit: B2BUnitNode) => new OrgUnitActions.LoadTreeSuccess(orgUnit)
        ),
        catchError((error: HttpErrorResponse) =>
          of(
            new OrgUnitActions.LoadTreeFail({
              error: normalizeHttpError(error),
            })
          )
        )
      );
    })
  );

  @Effect()
  loadApprovalProcesses$: Observable<
    | OrgUnitActions.LoadApprovalProcessesSuccess
    | OrgUnitActions.LoadApprovalProcessesFail
  > = this.actions$.pipe(
    ofType(OrgUnitActions.LOAD_APPROVAL_PROCESSES),
    map((action: OrgUnitActions.LoadOrgUnit) => action.payload),
    switchMap(({ userId }) => {
      return this.orgUnitConnector.getApprovalProcesses(userId).pipe(
        map(
          (approvalProcesses: B2BApprovalProcess[]) =>
            new OrgUnitActions.LoadApprovalProcessesSuccess(approvalProcesses)
        ),
        catchError((error: HttpErrorResponse) =>
          of(
            new OrgUnitActions.LoadApprovalProcessesFail({
              error: normalizeHttpError(error),
            })
          )
        )
      );
    })
  );

  @Effect()
  loadUsers$: Observable<
    | OrgUnitActions.LoadAssignedUsersSuccess
    | OrgUnitActions.LoadAssignedUsersFail
    | B2BUserActions.LoadB2BUserSuccess
  > = this.actions$.pipe(
    ofType(OrgUnitActions.LOAD_ASSIGNED_USERS),
    map((action: OrgUnitActions.LoadAssignedUsers) => action.payload),
    groupBy(({ orgUnitId, roleId, params }) =>
      serializeParams([orgUnitId, roleId], params)
    ),
    mergeMap((group) =>
      group.pipe(
        switchMap(({ userId, orgUnitId, roleId, params }) => {
          return this.orgUnitConnector
            .getUsers(userId, orgUnitId, roleId, params)
            .pipe(
              switchMap((users: EntitiesModel<B2BUser>) => {
                const { values, page } = normalizeListPage(users, 'customerId');
                return [
                  new B2BUserActions.LoadB2BUserSuccess(values),
                  new OrgUnitActions.LoadAssignedUsersSuccess({
                    orgUnitId,
                    roleId,
                    page,
                    params,
                  }),
                ];
              }),
              catchError((error: HttpErrorResponse) =>
                of(
                  new OrgUnitActions.LoadAssignedUsersFail({
                    orgUnitId,
                    roleId,
                    params,
                    error: normalizeHttpError(error),
                  })
                )
              )
            );
        })
      )
    )
  );

  @Effect()
  assignRoleToUser: Observable<
    OrgUnitActions.AssignRoleSuccess | OrgUnitActions.AssignRoleFail
  > = this.actions$.pipe(
    ofType(OrgUnitActions.ASSIGN_ROLE),
    map((action: OrgUnitActions.AssignRole) => action.payload),
    switchMap(({ userId, orgCustomerId, roleId }) =>
      this.orgUnitConnector.assignRole(userId, orgCustomerId, roleId).pipe(
        map(
          () =>
            new OrgUnitActions.AssignRoleSuccess({
              uid: orgCustomerId,
              roleId,
              selected: true,
            })
        ),
        catchError((error: HttpErrorResponse) =>
          of(
            new OrgUnitActions.AssignRoleFail({
              orgCustomerId,
              error: normalizeHttpError(error),
            })
          )
        )
      )
    )
  );

  @Effect()
  unassignRoleToUser$: Observable<
    OrgUnitActions.UnassignRoleSuccess | OrgUnitActions.UnassignRoleFail
  > = this.actions$.pipe(
    ofType(OrgUnitActions.UNASSIGN_ROLE),
    map((action: OrgUnitActions.UnassignRole) => action.payload),
    switchMap(({ userId, orgCustomerId, roleId }) =>
      this.orgUnitConnector.unassignRole(userId, orgCustomerId, roleId).pipe(
        map(
          () =>
            new OrgUnitActions.UnassignRoleSuccess({
              uid: orgCustomerId,
              roleId,
              selected: false,
            })
        ),
        catchError((error: HttpErrorResponse) =>
          of(
            new OrgUnitActions.UnassignRoleFail({
              orgCustomerId,
              error: normalizeHttpError(error),
            })
          )
        )
      )
    )
  );

  @Effect()
  assignApprover: Observable<
    OrgUnitActions.AssignApproverSuccess | OrgUnitActions.AssignApproverFail
  > = this.actions$.pipe(
    ofType(OrgUnitActions.ASSIGN_APPROVER),
    map((action: OrgUnitActions.AssignApprover) => action.payload),
    switchMap(({ userId, orgUnitId, orgCustomerId, roleId }) =>
      this.orgUnitConnector
        .assignApprover(userId, orgUnitId, orgCustomerId, roleId)
        .pipe(
          map(
            () =>
              new OrgUnitActions.AssignApproverSuccess({
                uid: orgCustomerId,
                roleId,
                selected: true,
              })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              new OrgUnitActions.AssignApproverFail({
                orgCustomerId,
                error: normalizeHttpError(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  unassignApprover: Observable<
    OrgUnitActions.UnassignApproverSuccess | OrgUnitActions.UnassignApproverFail
  > = this.actions$.pipe(
    ofType(OrgUnitActions.UNASSIGN_APPROVER),
    map((action: OrgUnitActions.UnassignApprover) => action.payload),
    switchMap(({ userId, orgUnitId, orgCustomerId, roleId }) =>
      this.orgUnitConnector
        .unassignApprover(userId, orgUnitId, orgCustomerId, roleId)
        .pipe(
          map(
            () =>
              new OrgUnitActions.UnassignApproverSuccess({
                uid: orgCustomerId,
                roleId,
                selected: false,
              })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              new OrgUnitActions.UnassignApproverFail({
                orgCustomerId,
                error: normalizeHttpError(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  createAddress$: Observable<
    OrgUnitActions.CreateAddressSuccess | OrgUnitActions.CreateAddressFail
  > = this.actions$.pipe(
    ofType(OrgUnitActions.CREATE_ADDRESS),
    map((action: OrgUnitActions.CreateAddress) => action.payload),
    switchMap((payload) =>
      this.orgUnitConnector
        .createAddress(payload.userId, payload.orgUnitId, payload.address)
        .pipe(
          map((data) => new OrgUnitActions.CreateAddressSuccess(data)),
          catchError((error: HttpErrorResponse) =>
            of(
              new OrgUnitActions.CreateAddressFail({
                addressId: payload.address.id,
                error: normalizeHttpError(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  updateAddress$: Observable<
    // OrgUnitActions.UpdateAddressSuccess |
    OrgUnitActions.LoadAddresses | OrgUnitActions.UpdateAddressFail
  > = this.actions$.pipe(
    ofType(OrgUnitActions.UPDATE_ADDRESS),
    map((action: OrgUnitActions.UpdateAddress) => action.payload),
    switchMap(({ userId, orgUnitId, addressId, address }) =>
      this.orgUnitConnector
        .updateAddress(userId, orgUnitId, addressId, address)
        .pipe(
          // TODO: Workaround for empty PATCH response:
          // map(data => new OrgUnitActions.UpdateAddressSuccess(data)),
          map(() => new OrgUnitActions.LoadAddresses({ userId, orgUnitId })),
          catchError((error: HttpErrorResponse) =>
            of(
              new OrgUnitActions.UpdateAddressFail({
                addressId: address.id,
                error: normalizeHttpError(error),
              })
            )
          )
        )
    )
  );

  @Effect()
  deleteAddress$: Observable<
    OrgUnitActions.DeleteAddressSuccess | OrgUnitActions.DeleteAddressFail
  > = this.actions$.pipe(
    ofType(OrgUnitActions.DELETE_ADDRESS),
    map((action: OrgUnitActions.DeleteAddress) => action.payload),
    switchMap((payload) =>
      this.orgUnitConnector
        .deleteAddress(payload.userId, payload.orgUnitId, payload.addressId)
        .pipe(
          map(
            () =>
              new OrgUnitActions.DeleteAddressSuccess({ id: payload.addressId })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              new OrgUnitActions.DeleteAddressFail({
                addressId: payload.addressId,
                error: normalizeHttpError(error),
              })
            )
          )
        )
    )
  );

  // @Effect()
  // loadAddress$: Observable<
  //   | OrgUnitActions.LoadAddressSuccess
  //   | OrgUnitActions.LoadAddressesSuccess
  //   | OrgUnitActions.LoadAddressesFail
  // > = this.actions$.pipe(
  //   ofType(OrgUnitActions.LOAD_ADDRESSES),
  //   map((action: OrgUnitActions.LoadAddresses) => action.payload),
  //   switchMap(({ userId, orgUnitId }) => {
  //     return this.orgUnitConnector.getAddresses(userId, orgUnitId).pipe(
  //       switchMap((addresses: EntitiesModel<B2BAddress>) => {
  //         const { values, page } = normalizeListPage(addresses, 'id');
  //         return [
  //           new OrgUnitActions.LoadAddressSuccess(values),
  //           new OrgUnitActions.LoadAddressesSuccess({ page, orgUnitId }),
  //         ];
  //       }),
  //       catchError(error =>
  //         of(
  //           new OrgUnitActions.LoadAddressesFail({
  //             orgUnitId,
  //             error: normalizeHttpError(error),
  //           })
  //         )
  //       )
  //     );
  //   })
  // );

  constructor(
    private actions$: Actions,
    private orgUnitConnector: OrgUnitConnector
  ) {}
}
