/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActionReducer } from '@ngrx/store';
import { AuthActions } from '@spartacus/core';
import { B2bRedirectCoordinator } from './b2b-redirect-coordinator.service';

/**
 * 在模块加载时（早于所有 APP_INITIALIZER）捕获原始 URL。
 * angular-oauth2-oidc 在 APP_INITIALIZER 阶段处理 OAuth callback 时会清除
 * URL 中的 ?code=... 参数，因此必须在此之前捕获。
 */
const _hrefAtModuleLoad =
  typeof window !== 'undefined' ? window.location.href : '';

/**
 * MetaReducer 工厂函数：仅在"真正登录"场景调用 blockRedirect()，跳过 token 还原。
 *
 * 判断依据（优先级由高到低）：
 *   1. 模块加载时 URL 含 ?code=...&state=... → Authorization Code Flow 回调
 *   2. 当前 URL 含 /login → ROPC（用户在 Spartacus login 页填表提交）
 *   3. 其余情况 → token 还原或非登录场景，不拦截
 */
export function createB2bLoginMetaReducer(
  coordinator: B2bRedirectCoordinator
): (reducer: ActionReducer<any>) => ActionReducer<any> {
  const hasFreshOAuthCode =
    _hrefAtModuleLoad.includes('code=') && _hrefAtModuleLoad.includes('state=');

  return (reducer) =>
    (state, action) => {
      if (action.type === AuthActions.LOGIN) {
        const currentHref =
          typeof window !== 'undefined' ? window.location.href : '';
        const isOnLoginPage = currentHref.includes('/login');
        const isFreshLogin = hasFreshOAuthCode || isOnLoginPage;
        if (isFreshLogin) {
          coordinator.blockRedirect();
        }
      }
      return reducer(state, action);
    };
}
