/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

export interface B2bUnitSelectionOccEndpoints {
  /**
   * 获取当前 B2B 用户个人信息（含 orgUnit 默认 unit）
   * GET /{baseSiteId}/orgUsers/{userId}
   */
  orgUser?: string | OccEndpoint;

  /**
   * 获取当前 B2B 用户所被分配的所有 org units
   * GET /{baseSiteId}/orgUsers/{userId}/orgUnits
   */
  orgUserUnits?: string | OccEndpoint;

  /**
   * 设置当前 B2B 用户的默认 org unit
   * PUT /{baseSiteId}/orgUsers/{userId}/defaultOrgUnit
   */
  orgUserDefaultUnit?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends B2bUnitSelectionOccEndpoints {}
}
