/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { AuthRedirectService } from '@spartacus/core';
import { B2bRedirectCoordinator } from './b2b-redirect-coordinator.service';

/**
 * 拦截 AuthRedirectService.redirect()：
 * 若 B2B unit 选择流程正在进行（coordinator.isBlocked），
 * 则等待 coordinator.whenAllowed$() 信号后再执行实际跳转。
 *
 * 通过 MetaReducer 在 LOGIN action dispatch 时同步设置 blocked 状态，
 * 确保此处能在 redirect() 调用时感知到拦截标志。
 */
@Injectable()
export class B2bAwareAuthRedirectService extends AuthRedirectService {
  private coordinator = inject(B2bRedirectCoordinator);

  override redirect(): void {
    if (!this.coordinator.isBlocked()) {
      super.redirect();
      return;
    }
    this.coordinator.whenAllowed$().subscribe(() => {
      super.redirect();
    });
  }
}
