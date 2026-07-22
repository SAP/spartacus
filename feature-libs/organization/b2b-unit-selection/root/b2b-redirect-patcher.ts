/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { B2bRedirectCoordinator } from './b2b-redirect-coordinator.service';

/**
 * APP_INITIALIZER 工厂：在 bootstrap 阶段直接 patch Angular Router 内部的
 * scheduleNavigation() 方法——所有路由跳转（包括 Guard UrlTree 重定向）的
 * 唯一真正入口。
 *
 * 调用链（所有路径最终都汇聚到此方法）：
 *   router.navigate()       → router.navigateByUrl() → scheduleNavigation()
 *   router.navigateByUrl()                           → scheduleNavigation()
 *   Guard 返回 UrlTree      → RedirectRequest 事件   → scheduleNavigation()
 *   浏览器触发的历史导航                              → scheduleNavigation()
 *
 * 拦截条件（两个条件同时满足才拦截）：
 *   1. coordinator.isBlocked()：MetaReducer 已在 dispatch(Login) 时同步设置。
 *   2. applicationRef.components.length > 0：AppComponent 已挂载，表明这是
 *      用户主动登录场景（而非页面刷新时的 token 自动恢复场景）。
 *
 * 区分两种 LOGIN 场景：
 *   - 页面刷新（token 自动恢复）：LOGIN 在 APP_INITIALIZER 阶段 dispatch，
 *     此时 AppComponent 尚未挂载（components.length = 0），不拦截导航，
 *     页面正常加载；dialog 通过 ApplicationRef.isStable 延迟打开。
 *   - 手动登录（用户填写表单）：LOGIN 在用户交互后 dispatch，
 *     此时 AppComponent 已挂载（components.length > 0），拦截 redirect，
 *     用户停留在 login 页面，等待 B2B unit 选择完成后再跳转。
 */
export function createB2bRedirectPatcher(
  router: Router,
  coordinator: B2bRedirectCoordinator,
  appRef: ApplicationRef
): () => void {
  return (): void => {
    const originalScheduleNavigation: (...args: any[]) => Promise<boolean> = (
      router as any
    ).scheduleNavigation.bind(router);

    (router as any).scheduleNavigation = (
      rawUrl: any,
      source: any,
      restoredState: any,
      extras: any,
      priorPromise?: any
    ): Promise<boolean> => {
      const blocked = coordinator.isBlocked();
      const componentsLen = appRef.components.length;
      // 仅在手动登录场景（AppComponent 已挂载）时拦截，
      // 页面刷新 token 恢复场景（components.length = 0）直接放行
      if (!blocked || componentsLen === 0) {
        return originalScheduleNavigation(
          rawUrl,
          source,
          restoredState,
          extras,
          priorPromise
        );
      }
      // B2B unit 选择进行中：挂起导航，待 allowRedirect() 后执行
      coordinator.whenAllowed$().subscribe(() => {
        originalScheduleNavigation(
          rawUrl,
          source,
          restoredState,
          extras,
          priorPromise
        );
      });
      return Promise.resolve(false);
    };
  };
}
