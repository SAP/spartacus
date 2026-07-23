/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationRef, inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AuthActions,
  B2BUnit,
  LoggerService,
  OAuthLibWrapperService,
  RoutingService,
  tryNormalizeHttpError,
  UserIdService,
} from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { B2bRedirectCoordinator } from '../../../root/b2b-redirect-coordinator.service';
import { B2bUnitSelectionConnector } from '../../connectors/b2b-unit-selection.connector';
import { B2bUnitSelectorStateService } from '../../services/b2b-unit-selector-state.service';
import * as B2bUnitSelectionActions from '../actions/b2b-unit-selection.actions';

@Injectable()
export class B2bUnitSelectionEffects {
  protected logger = inject(LoggerService);
  private coordinator = inject(B2bRedirectCoordinator);
  private applicationRef = inject(ApplicationRef);
  private stateService = inject(B2bUnitSelectorStateService);
  private routingService = inject(RoutingService);
  private oAuthLibWrapperService = inject(OAuthLibWrapperService);

  /**
   * 监听 LOGIN action，获取用户所属 org units 及默认 unit。
   *
   * 有两种触发场景：
   * 1. 手动登录（ROPC，用户在 Spartacus login 页填表提交）：
   *    ApplicationRef.components 已有挂载组件，可直接开 dialog。
   *
   * 2. OAuth Code Flow 登录或页面刷新自动还原 token：
   *    ApplicationRef.components 可能为空，需轮询等待 AppComponent 挂载后再开 dialog。
   */
  checkOrgUnitsOnLogin$: Observable<
    | B2bUnitSelectionActions.LoadUserOrgUnitsSuccess
    | B2bUnitSelectionActions.LoadUserOrgUnitsFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType<AuthActions.Login>(AuthActions.LOGIN),
      exhaustMap(() =>
        this.userIdService.takeUserId(true).pipe(
          switchMap((userId) =>
            forkJoin({
              orgUnits: this.connector.loadOrgUnits(userId),
              // 获取用户默认 unit 失败时降级为 undefined，不阻断主流程
              defaultUnitUid: this.connector
                .loadDefaultOrgUnitUid(userId)
                .pipe(catchError(() => of(undefined))),
            }).pipe(
              tap(({ orgUnits, defaultUnitUid }) => {
                // 无论 unit 数量多少，都写入状态服务，供 Company 选择器使用
                this.stateService.setOrgUnits(orgUnits);
                this.stateService.setActiveUnit(defaultUnitUid ?? null);
                if (orgUnits.length > 0) {
                  this.openDialogWhenReady(orgUnits, defaultUnitUid);
                } else {
                  this.coordinator.allowRedirect();
                }
              }),
              map(
                ({ orgUnits }) =>
                  new B2bUnitSelectionActions.LoadUserOrgUnitsSuccess(orgUnits)
              ),
              catchError((error: HttpErrorResponse) => {
                this.coordinator.allowRedirect();
                return of(
                  new B2bUnitSelectionActions.LoadUserOrgUnitsFail(
                    tryNormalizeHttpError(error, this.logger)
                  )
                );
              })
            )
          ),
          catchError(() => {
            this.coordinator.allowRedirect();
            return EMPTY;
          })
        )
      )
    )
  );

  /**
   * 监听 SET_DEFAULT_ORG_UNIT action，调用 PUT API 设置默认 unit。
   * 成功后刷新 token（使新 unit 权限立即生效），再放行 redirect 并关闭 dialog。
   * token 刷新失败时降级处理，不阻断主流程。
   */
  setDefaultOrgUnit$: Observable<
    | B2bUnitSelectionActions.SetDefaultOrgUnitSuccess
    | B2bUnitSelectionActions.SetDefaultOrgUnitFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType<B2bUnitSelectionActions.SetDefaultOrgUnit>(
        B2bUnitSelectionActions.SET_DEFAULT_ORG_UNIT
      ),
      map(
        (action: B2bUnitSelectionActions.SetDefaultOrgUnit) => action.payload
      ),
      switchMap(({ userId, unitUid, redirectToHome }) =>
        this.connector.setDefaultOrgUnit(userId, unitUid).pipe(
          tap(() => {
            // 刷新 token，使新 unit 的权限上下文立即生效（fire-and-forget）
            this.oAuthLibWrapperService.refreshToken();
            this.coordinator.allowRedirect();
            this.launchDialogService.closeDialog('CONFIRMED');
            this.stateService.setActiveUnit(unitUid);
            // 仅 header 选择器切换（redirectToHome=true）才跳首页；
            // dialog 确认走 coordinator 原有的 post-login redirect 逻辑
            if (redirectToHome) {
              this.routingService.go({ cxRoute: 'home' });
            }
          }),
          map(() => new B2bUnitSelectionActions.SetDefaultOrgUnitSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(
              new B2bUnitSelectionActions.SetDefaultOrgUnitFail(
                tryNormalizeHttpError(error, this.logger)
              )
            )
          )
        )
      )
    )
  );

  /**
   * 监听 LOGOUT action，清空 stateService，确保退出登录后 Company 选择器隐藏。
   */
  clearOnLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<AuthActions.Logout>(AuthActions.LOGOUT),
        tap(() => {
          this.stateService.setOrgUnits([]);
          this.stateService.setActiveUnit(null);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private connector: B2bUnitSelectionConnector,
    private userIdService: UserIdService,
    private launchDialogService: LaunchDialogService
  ) {}

  /**
   * 根据 AppComponent 是否已挂载决定打开 dialog 的时机。
   *
   * InlineRootRenderStrategy 需要 ApplicationRef.components[0] 存在才能渲染 dialog。
   * 以 components.length > 0 作为判断依据，直接对应该前提条件：
   * - components 已就绪（手动登录：用户在页面上操作）：立即打开。
   * - components 尚未就绪（APP_INITIALIZER 阶段自动还原 token）：等 Angular
   *   bootstrap 完成（isStable 首次为 true）后再打开。
   *
   * 注意：不再使用 coordinator.isBlocked() 判断，因为 MetaReducer 在所有
   * LOGIN dispatch 时都会设置 blocked（包括页面刷新场景），会导致误判。
   */
  private openDialogWhenReady(
    orgUnits: B2BUnit[],
    defaultUnitUid: string | undefined
  ): void {
    const open = () => {
      this.launchDialogService.openDialogAndSubscribe(
        LAUNCH_CALLER.B2B_UNIT_SELECTION,
        undefined,
        { orgUnits, defaultUnitUid }
      );
    };

    if (this.applicationRef.components.length > 0) {
      // 手动登录 / AppComponent 已挂载：立即打开
      open();
    } else {
      // OAuth Code Flow / APP_INITIALIZER 阶段：轮询直到 AppComponent 挂载
      // 比 isStable 更快，避免等待所有 HTTP 请求完成
      const poll = () => {
        if (this.applicationRef.components.length > 0) {
          open();
        } else {
          requestAnimationFrame(poll);
        }
      };
      requestAnimationFrame(poll);
    }
  }
}
