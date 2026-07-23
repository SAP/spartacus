/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class B2bUnitSelectionConfig {
  b2bUnitSelection?: {
    /**
     * 是否启用 B2B Unit 选择功能（登录后弹窗 + header Company 选择器）。
     * 默认 false，客户通过 provideConfig() 显式开启。
     */
    enabled?: boolean;
  };
}

declare module '@spartacus/core' {
  interface Config extends B2bUnitSelectionConfig {}
}
