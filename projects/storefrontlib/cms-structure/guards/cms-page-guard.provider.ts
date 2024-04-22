/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const CX_PAGE_GUARD = new InjectionToken<CanActivateFn[]>(
  'CmsPageGuard'
);
