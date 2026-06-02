/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CanActivate } from './guards-composer';

export function isCanActivate(guard: any): guard is CanActivate {
  return guard && typeof guard.canActivate === 'function';
}
