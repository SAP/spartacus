import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  B2BApprovalProcess,
  B2BUnit,
  B2BUser,
  EntitiesModel,
  normalizeHttpError,
  StateUtils,
} from '@spartacus/core';
import { from, Observable, of } from 'rxjs';
import { catchError, groupBy, map, mergeMap, switchMap } from 'rxjs/operators';
import { OrgUnitConnector } from '../../connectors/org-unit/org-unit.connector';
import { B2BUnitNode } from '../../model/unit-node.model';
import {
  B2BUserActions,
  OrganizationActions,
  OrgUnitActions,
} from '../actions/index';

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
          const { values, page } = StateUtils.normalizeListPage(
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
    | OrgUnitActions.CreateUnitFail
    | OrgUnitActions.CreateUnitSuccess
    | OrganizationActions.OrganizationClearData
  > = this.actions$.pipe(
    ofType(OrgUnitActions.CREATE_ORG_UNIT),
    map((action: OrgUnitActions.CreateUnit) => action.payload),
    switchMap((payload) =>
      this.orgUnitConnector.create(payload.userId, payload.unit).pipe(
        switchMap((data) => [
          new OrgUnitActions.CreateUnitSuccess(data),
          new OrganizationActions.OrganizationClearData(),
        ]),
        catchError((error: HttpErrorResponse) =>
          from([
            new OrgUnitActions.CreateUnitFail({
              unitCode: payload.unit.uid,
              error: normalizeHttpError(error),
            }),
            new OrganizationActions.OrganizationClearData(),
          ])
        )
      )
    )
  );

  @Effect()
  updateUnit$: Observable<
    | OrgUnitActions.UpdateUnitSuccess
    | OrgUnitActions.UpdateUnitFail
    | OrganizationActions.OrganizationClearData
  > = this.actions$.pipe(
    ofType(OrgUnitActions.UPDATE_ORG_UNIT),
    map((action: OrgUnitActions.UpdateUnit) => action.payload),
    switchMap((payload) =>
      this.orgUnitConnector
        .update(payload.userId, payload.unitCode, payload.unit)
        .pipe(
          switchMap((_data) => [
            // Workaround for empty response
            new OrgUnitActions.UpdateUnitSuccess(payload.unit),
            new OrganizationActions.OrganizationClearData(),
          ]),
          catchError((error: HttpErrorResponse) =>
            from([
              new OrgUnitActions.UpdateUnitFail({
                unitCode: payload.unit.uid,
                error: normalizeHttpError(error),
              }),
              new OrganizationActions.OrganizationClearData(),
            ])
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
      StateUtils.serializeParams([orgUnitId, roleId], params)
    ),
    mergeMap((group) =>
      group.pipe(
        switchMap(({ userId, orgUnitId, roleId, params }) => {
          return this.orgUnitConnector
            .getUsers(userId, orgUnitId, roleId, params)
            .pipe(
              switchMap((users: EntitiesModel<B2BUser>) => {
                const { values, page } = StateUtils.normalizeListPage(
                  users,
                  'customerId'
                );
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
    | OrgUnitActions.AssignApproverSuccess
    | OrgUnitActions.AssignApproverFail
    | OrganizationActions.OrganizationClearData
  > = this.actions$.pipe(
    ofType(OrgUnitActions.ASSIGN_APPROVER),
    map((action: OrgUnitActions.AssignApprover) => action.payload),
    mergeMap(({ userId, orgUnitId, orgCustomerId, roleId }) =>
      this.orgUnitConnector
        .assignApprover(userId, orgUnitId, orgCustomerId, roleId)
        .pipe(
          switchMap(() => [
            new OrgUnitActions.AssignApproverSuccess({
              uid: orgCustomerId,
              roleId,
              selected: true,
            }),
            new OrganizationActions.OrganizationClearData(),
          ]),
          catchError((error: HttpErrorResponse) =>
            from([
              new OrgUnitActions.AssignApproverFail({
                orgCustomerId,
                error: normalizeHttpError(error),
              }),
              new OrganizationActions.OrganizationClearData(),
            ])
          )
        )
    )
  );

  @Effect()
  unassignApprover: Observable<
    | OrgUnitActions.UnassignApproverSuccess
    | OrgUnitActions.UnassignApproverFail
    | OrganizationActions.OrganizationClearData
  > = this.actions$.pipe(
    ofType(OrgUnitActions.UNASSIGN_APPROVER),
    map((action: OrgUnitActions.UnassignApprover) => action.payload),
    mergeMap(({ userId, orgUnitId, orgCustomerId, roleId }) =>
      this.orgUnitConnector
        .unassignApprover(userId, orgUnitId, orgCustomerId, roleId)
        .pipe(
          switchMap(() => [
            new OrgUnitActions.UnassignApproverSuccess({
              uid: orgCustomerId,
              roleId,
              selected: false,
            }),
            new OrganizationActions.OrganizationClearData(),
          ]),
          catchError((error: HttpErrorResponse) =>
            from([
              new OrgUnitActions.UnassignApproverFail({
                orgCustomerId,
                error: normalizeHttpError(error),
              }),
              new OrganizationActions.OrganizationClearData(),
            ])
          )
        )
    )
  );

  @Effect()
  createAddress$: Observable<
    | OrgUnitActions.CreateAddressSuccess
    | OrgUnitActions.CreateAddressFail
    | OrganizationActions.OrganizationClearData
  > = this.actions$.pipe(
    ofType(OrgUnitActions.CREATE_ADDRESS),
    map((action: OrgUnitActions.CreateAddress) => action.payload),
    switchMap((payload) =>
      this.orgUnitConnector
        .createAddress(payload.userId, payload.orgUnitId, payload.address)
        .pipe(
          switchMap((data) => [
            new OrgUnitActions.CreateAddressSuccess(data),
            new OrgUnitActions.CreateAddressSuccess({ id: null }),
            new OrganizationActions.OrganizationClearData(),
          ]),
          catchError((error: HttpErrorResponse) =>
            from([
              new OrgUnitActions.CreateAddressFail({
                addressId: payload.address.id,
                error: normalizeHttpError(error),
              }),
              new OrganizationActions.OrganizationClearData(),
            ])
          )
        )
    )
  );

  @Effect()
  updateAddress$: Observable<
    | OrgUnitActions.UpdateAddressSuccess
    | OrgUnitActions.UpdateAddressFail
    | OrganizationActions.OrganizationClearData
  > = this.actions$.pipe(
    ofType(OrgUnitActions.UPDATE_ADDRESS),
    map((action: OrgUnitActions.UpdateAddress) => action.payload),
    switchMap(({ userId, orgUnitId, addressId, address }) =>
      this.orgUnitConnector
        .updateAddress(userId, orgUnitId, addressId, address)
        .pipe(
          switchMap(() => [
            // commented out due to no response from backend on PATCH request
            // new OrgUnitActions.UpdateAddressSuccess(data),
            new OrgUnitActions.UpdateAddressSuccess(address),
            new OrganizationActions.OrganizationClearData(),
          ]),
          catchError((error: HttpErrorResponse) =>
            from([
              new OrgUnitActions.UpdateAddressFail({
                addressId: address.id,
                error: normalizeHttpError(error),
              }),
              new OrganizationActions.OrganizationClearData(),
            ])
          )
        )
    )
  );

  @Effect()
  deleteAddress$: Observable<
    | OrgUnitActions.DeleteAddressSuccess
    | OrgUnitActions.DeleteAddressFail
    | OrganizationActions.OrganizationClearData
  > = this.actions$.pipe(
    ofType(OrgUnitActions.DELETE_ADDRESS),
    map((action: OrgUnitActions.DeleteAddress) => action.payload),
    switchMap((payload) =>
      this.orgUnitConnector
        .deleteAddress(payload.userId, payload.orgUnitId, payload.addressId)
        .pipe(
          switchMap(() => [
            new OrgUnitActions.DeleteAddressSuccess({ id: payload.addressId }),
            new OrganizationActions.OrganizationClearData(),
          ]),
          catchError((error: HttpErrorResponse) =>
            from([
              new OrgUnitActions.DeleteAddressFail({
                addressId: payload.addressId,
                error: normalizeHttpError(error),
              }),
              new OrganizationActions.OrganizationClearData(),
            ])
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
  //         const { values, page } = StateUtils.normalizeListPage(addresses, 'id');
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
