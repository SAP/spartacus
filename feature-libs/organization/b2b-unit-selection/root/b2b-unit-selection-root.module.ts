/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, ApplicationRef, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { META_REDUCERS } from '@ngrx/store';
import { AuthRedirectService } from '@spartacus/core';
import { B2bAwareAuthRedirectService } from './b2b-aware-auth-redirect.service';
import { createB2bLoginMetaReducer } from './b2b-login-meta-reducer';
import { createB2bRedirectPatcher } from './b2b-redirect-patcher';
import { B2bRedirectCoordinator } from './b2b-redirect-coordinator.service';
// 确保 LAUNCH_CALLER 扩展在应用启动时生效
import './model/augmented-core.model';

@NgModule({
  providers: [
    /**
     * 覆盖 AuthRedirectService：在 B2B unit 选择进行中时延迟 redirect()。
     * 这是拦截 post-login redirect 最精准的切入点，只影响 redirect() 调用，
     * 不影响其他任何导航。
     */
    {
      provide: AuthRedirectService,
      useClass: B2bAwareAuthRedirectService,
    },
    /**
     * MetaReducer：LOGIN action dispatch 时在 reducer pipeline 中同步调用
     * blockRedirect()。MetaReducer 在 dispatch() 内部同步执行，早于
     * AuthService.loginWithCredentials() 中紧随 dispatch() 的 redirect() 调用。
     * 确保 redirect() 和 NotAuthGuard.canActivate() 到达时 blocked 标志已就绪。
     */
    {
      provide: META_REDUCERS,
      useFactory: createB2bLoginMetaReducer,
      deps: [B2bRedirectCoordinator],
      multi: true,
    },
    /**
     * APP_INITIALIZER：patch scheduleNavigation 作为安全兜底，
     * 拦截 NotAuthGuard UrlTree 等不经过 AuthRedirectService 的路由跳转。
     */
    {
      provide: APP_INITIALIZER,
      useFactory: createB2bRedirectPatcher,
      deps: [Router, B2bRedirectCoordinator, ApplicationRef],
      multi: true,
    },
  ],
})
export class B2bUnitSelectionRootModule {}
