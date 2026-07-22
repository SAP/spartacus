/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { B2BUnit } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class B2bUnitSelectionAdapter {
  /**
   * 获取当前 B2B 用户个人信息，返回默认 org unit 的 uid。
   * 对应 GET /{baseSiteId}/orgUsers/{userId}
   */
  abstract loadDefaultOrgUnitUid(userId: string): Observable<string | undefined>;

  /**
   * 获取当前 B2B 用户被分配的所有 org units
   */
  abstract loadOrgUnits(userId: string): Observable<B2BUnit[]>;

  /**
   * 设置当前 B2B 用户的默认 org unit
   */
  abstract setDefaultOrgUnit(userId: string, unitUid: string): Observable<void>;
}
