/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  EntitiesModel,
  LoggerService,
  OrderApprovalPermissionType,
  StateUtils,
  normalizeHttpError,
} from '@spartacus/core';
import { Observable, from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PermissionConnector } from '../../connectors/permission/permission.connector';
import { Permission } from '../../model/permission.model';
import { OrganizationActions, PermissionActions } from '../actions';

@Injectable()
export class PermissionEffects {
  protected logger = inject(LoggerService);

  loadPermission$: Observable<
    | PermissionActions.LoadPermissionSuccess
    | PermissionActions.LoadPermissionFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(PermissionActions.LOAD_PERMISSION),
      map((action: PermissionActions.LoadPermission) => action.payload),
      switchMap(({ userId, permissionCode }) => {
        return this.permissionConnector.get(userId, permissionCode).pipe(
          map((permission: Permission) => {
            return new PermissionActions.LoadPermissionSuccess([permission]);
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              new PermissionActions.LoadPermissionFail({
                permissionCode,
                error: normalizeHttpError(error, this.logger),
              })
            )
          )
        );
      })
    )
  );

  loadPermissions$: Observable<
    | PermissionActions.LoadPermissionsSuccess
    | PermissionActions.LoadPermissionSuccess
    | PermissionActions.LoadPermissionsFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(PermissionActions.LOAD_PERMISSIONS),
      map((action: PermissionActions.LoadPermissions) => action.payload),
      switchMap((payload) =>
        this.permissionConnector.getList(payload.userId, payload.params).pipe(
          switchMap((permissions: EntitiesModel<Permission>) => {
            const { values, page } = StateUtils.normalizeListPage(
              permissions,
              'code'
            );
            return [
              new PermissionActions.LoadPermissionSuccess(values),
              new PermissionActions.LoadPermissionsSuccess({
                page,
                params: payload.params,
              }),
            ];
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              new PermissionActions.LoadPermissionsFail({
                params: payload.params,
                error: normalizeHttpError(error, this.logger),
              })
            )
          )
        )
      )
    )
  );

  createPermission$: Observable<
    | PermissionActions.CreatePermissionSuccess
    | PermissionActions.CreatePermissionFail
    | OrganizationActions.OrganizationClearData
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(PermissionActions.CREATE_PERMISSION),
      map((action: PermissionActions.CreatePermission) => action.payload),
      switchMap((payload) =>
        this.permissionConnector
          .create(payload.userId, payload.permission)
          .pipe(
            switchMap((data) => [
              new PermissionActions.CreatePermissionSuccess(data),
              new OrganizationActions.OrganizationClearData(),
            ]),
            catchError((error: HttpErrorResponse) =>
              from([
                new PermissionActions.CreatePermissionFail({
                  permissionCode: payload.permission.code ?? '',
                  error: normalizeHttpError(error, this.logger),
                }),
                new OrganizationActions.OrganizationClearData(),
              ])
            )
          )
      )
    )
  );

  updatePermission$: Observable<
    | PermissionActions.UpdatePermissionSuccess
    | PermissionActions.UpdatePermissionFail
    | OrganizationActions.OrganizationClearData
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(PermissionActions.UPDATE_PERMISSION),
      map((action: PermissionActions.UpdatePermission) => action.payload),
      switchMap((payload) =>
        this.permissionConnector
          .update(payload.userId, payload.permissionCode, payload.permission)
          .pipe(
            switchMap((data) => [
              new PermissionActions.UpdatePermissionSuccess(data),
              new OrganizationActions.OrganizationClearData(),
            ]),
            catchError((error: HttpErrorResponse) =>
              from([
                new PermissionActions.UpdatePermissionFail({
                  permissionCode: payload.permission.code ?? '',
                  error: normalizeHttpError(error, this.logger),
                }),
                new OrganizationActions.OrganizationClearData(),
              ])
            )
          )
      )
    )
  );

  loadPermissionTypes$: Observable<
    | PermissionActions.LoadPermissionTypesSuccess
    | PermissionActions.LoadPermissionTypesFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(PermissionActions.LOAD_PERMISSION_TYPES),
      switchMap(() =>
        this.permissionConnector.getTypes().pipe(
          map(
            (permissionTypeList: OrderApprovalPermissionType[]) =>
              new PermissionActions.LoadPermissionTypesSuccess(
                permissionTypeList
              )
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              new PermissionActions.LoadPermissionTypesFail({
                error: normalizeHttpError(error, this.logger),
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private permissionConnector: PermissionConnector
  ) {}
}
