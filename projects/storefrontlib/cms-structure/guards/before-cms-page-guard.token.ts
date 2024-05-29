/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { CanActivateFn } from '@angular/router';

/**
 * Guards that run on all CMS-driven routes before executing `{@link CmsPageGuard}`'s main logic.
 *
 *  **CAUTION**: Suitable for global guards ONLY! For route-specific guards, configure them under `cmsComponents`:
 * ```ts
 * provideConfig({
 *   cmsComponents: {
 *     [SomeCmsComponentType]: { guards: [MyGuard] }
 *   }
 * })
 * ```
 */
export const BEFORE_CMS_PAGE_GUARD = new InjectionToken<
  { canActivate: CanActivateFn }[]
>('BEFORE_CMS_PAGE_GUARD', { providedIn: 'root', factory: () => [] });
