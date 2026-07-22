/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

/**
 * 协调 B2B unit 选择与 login redirect 的时序。
 *
 * 工作流程：
 * 1. MetaReducer 在 LOGIN action dispatch 的瞬间（同步）调用 blockRedirect()
 * 2. AuthRedirectService.redirect() 检测到 blocked 状态后挂起，等待 whenAllowed$
 * 3. Effect 完成 org units 加载并打开 dialog
 * 4. 用户确认 unit 后，effect 调用 allowRedirect() → 挂起的 redirect 执行
 */
@Injectable({ providedIn: 'root' })
export class B2bRedirectCoordinator {
  private allowed$ = new BehaviorSubject<boolean>(true);

  blockRedirect(): void {
    this.allowed$.next(false);
  }

  allowRedirect(): void {
    this.allowed$.next(true);
  }

  isBlocked(): boolean {
    return !this.allowed$.getValue();
  }

  /** 等待 gate 打开（只取第一次 true 信号） */
  whenAllowed$(): Observable<boolean> {
    return this.allowed$.pipe(
      filter((v) => v),
      take(1)
    );
  }
}
