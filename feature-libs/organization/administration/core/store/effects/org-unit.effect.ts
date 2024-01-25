/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  B2BApprovalProcess,
  B2BUnit,
  B2BUser,
  EntitiesModel,
  LoggerService,
  StateUtils,
  normalizeHttpError,
} from '@spartacus/core';
import { Observable, from, of } from 'rxjs';
import { catchError, groupBy, map, mergeMap, switchMap } from 'rxjs/operators';
import { OrgUnitConnector } from '../../connectors/org-unit/org-unit.connector';
import { B2BUnitNode } from '../../model/unit-node.model';
import {
  B2BUserActions,
  OrgUnitActions,
  OrganizationActions,
} from '../actions/index';

@Injectable()
export class OrgUnitEffects {
  protected logger = inject(LoggerService);

  loadOrgUnit$: Observable<
    | OrgUnitActions.LoadOrgUnitSuccess
    | OrgUnitActions.LoadAddressSuccess
    | OrgUnitActions.LoadAddressesSuccess
    | OrgUnitActions.LoadOrgUnitFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(OrgUnitActions.LOAD_ORG_UNIT),
      map((action: OrgUnitActions.LoadOrgUnit) => action.payload),
      switchMap(({ userId, orgUnitId }) => {
        return this.orgUnitConnector.get(userId, orgUnitId).pipe(
          switchMap((orgUnit: B2BUnit) => {
            const { values, page } = StateUtils.normalizeListPage(
              { values: orgUnit.addresses ?? [] },
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
                error: normalizeHttpError(error, this.logger),
              })
            )
          )
        );
      })
    )
  );

  loadAvailableOrgUnits$: Observable<
    OrgUnitActions.LoadOrgUnitNodesSuccess | OrgUnitActions.LoadOrgUnitNodesFail
  > = createEffect(() =>
    this.actions$.pipe(
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
                error: normalizeHttpError(error, this.logger),
              })
            )
          )
        )
      )
    )
  );

  createUnit$: Observable<
    | OrgUnitActions.CreateUnitFail
    | OrgUnitActions.CreateUnitSuccess
    | OrganizationActions.OrganizationClearData
  > = createEffect(() =>
    this.actions$.pipe(
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
                unitCode: payload.unit.uid ?? '',
                error: normalizeHttpError(error, this.logger),
              }),
              new OrganizationActions.OrganizationClearData(),
            ])
          )
        )
      )
    )
  );

  updateUnit$: Observable<
    | OrgUnitActions.UpdateUnitSuccess
    | OrgUnitActions.UpdateUnitFail
    | OrganizationActions.OrganizationClearData
  > = createEffect(() =>
    this.actions$.pipe(
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
                  unitCode: payload.unit.uid ?? '',
                  error: normalizeHttpError(error, this.logger),
                }),
                new OrganizationActions.OrganizationClearData(),
              ])
            )
          )
      )
    )
  );

  loadTree$: Observable<
    OrgUnitActions.LoadTreeSuccess | OrgUnitActions.LoadTreeFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(OrgUnitActions.LOAD_UNIT_TREE),
      map((action: OrgUnitActions.LoadOrgUnit) => action.payload),
      switchMap(({ userId }) => {
        return this.orgUnitConnector.getTree(userId).pipe(
          map(
            (orgUnit: B2BUnitNode) =>
              new OrgUnitActions.LoadTreeSuccess(orgUnit)
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              new OrgUnitActions.LoadTreeFail({
                error: normalizeHttpError(error, this.logger),
              })
            )
          )
        );
      })
    )
  );

  loadApprovalProcesses$: Observable<
    | OrgUnitActions.LoadApprovalProcessesSuccess
    | OrgUnitActions.LoadApprovalProcessesFail
  > = createEffect(() =>
    this.actions$.pipe(
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
                error: normalizeHttpError(error, this.logger),
              })
            )
          )
        );
      })
    )
  );

  loadUsers$: Observable<
    | OrgUnitActions.LoadAssignedUsersSuccess
    | OrgUnitActions.LoadAssignedUsersFail
    | B2BUserActions.LoadB2BUserSuccess
  > = createEffect(() =>
    this.actions$.pipe(
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
                      error: normalizeHttpError(error, this.logger),
                    })
                  )
                )
              );
          })
        )
      )
    )
  );

  assignRoleToUser: Observable<
    OrgUnitActions.AssignRoleSuccess | OrgUnitActions.AssignRoleFail
  > = createEffect(() =>
    this.actions$.pipe(
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
                error: normalizeHttpError(error, this.logger),
              })
            )
          )
        )
      )
    )
  );

  unassignRoleToUser$: Observable<
    OrgUnitActions.UnassignRoleSuccess | OrgUnitActions.UnassignRoleFail
  > = createEffect(() =>
    this.actions$.pipe(
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
                error: normalizeHttpError(error, this.logger),
              })
            )
          )
        )
      )
    )
  );

  assignApprover: Observable<
    | OrgUnitActions.AssignApproverSuccess
    | OrgUnitActions.AssignApproverFail
    | OrganizationActions.OrganizationClearData
  > = createEffect(() =>
    this.actions$.pipe(
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
                  error: normalizeHttpError(error, this.logger),
                }),
                new OrganizationActions.OrganizationClearData(),
              ])
            )
          )
      )
    )
  );

  unassignApprover: Observable<
    | OrgUnitActions.UnassignApproverSuccess
    | OrgUnitActions.UnassignApproverFail
    | OrganizationActions.OrganizationClearData
  > = createEffect(() =>
    this.actions$.pipe(
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
                  error: normalizeHttpError(error, this.logger),
                }),
                new OrganizationActions.OrganizationClearData(),
              ])
            )
          )
      )
    )
  );

  createAddress$: Observable<
    | OrgUnitActions.CreateAddressSuccess
    | OrgUnitActions.CreateAddressFail
    | OrganizationActions.OrganizationClearData
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(OrgUnitActions.CREATE_ADDRESS),
      map((action: OrgUnitActions.CreateAddress) => action.payload),
      switchMap((payload) =>
        this.orgUnitConnector
          .createAddress(payload.userId, payload.orgUnitId, payload.address)
          .pipe(
            switchMap((data) => [
              new OrgUnitActions.CreateAddressSuccess(data),
              new OrgUnitActions.CreateAddressSuccess({ id: undefined }),
              new OrganizationActions.OrganizationClearData(),
            ]),
            catchError((error: HttpErrorResponse) =>
              from([
                new OrgUnitActions.CreateAddressFail({
                  addressId: payload.address.id ?? '',
                  error: normalizeHttpError(error, this.logger),
                }),
                new OrganizationActions.OrganizationClearData(),
              ])
            )
          )
      )
    )
  );

  updateAddress$: Observable<
    | OrgUnitActions.UpdateAddressSuccess
    | OrgUnitActions.UpdateAddressFail
    | OrganizationActions.OrganizationClearData
  > = createEffect(() =>
    this.actions$.pipe(
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
                  addressId: address.id ?? '',
                  error: normalizeHttpError(error, this.logger),
                }),
                new OrganizationActions.OrganizationClearData(),
              ])
            )
          )
      )
    )
  );

  deleteAddress$: Observable<
    | OrgUnitActions.DeleteAddressSuccess
    | OrgUnitActions.DeleteAddressFail
    | OrganizationActions.OrganizationClearData
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(OrgUnitActions.DELETE_ADDRESS),
      map((action: OrgUnitActions.DeleteAddress) => action.payload),
      switchMap((payload) =>
        this.orgUnitConnector
          .deleteAddress(payload.userId, payload.orgUnitId, payload.addressId)
          .pipe(
            switchMap(() => [
              new OrgUnitActions.DeleteAddressSuccess({
                id: payload.addressId,
              }),
              new OrganizationActions.OrganizationClearData(),
            ]),
            catchError((error: HttpErrorResponse) =>
              from([
                new OrgUnitActions.DeleteAddressFail({
                  addressId: payload.addressId,
                  error: normalizeHttpError(error, this.logger),
                }),
                new OrganizationActions.OrganizationClearData(),
              ])
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private orgUnitConnector: OrgUnitConnector
  ) {}
}
