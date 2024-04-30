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
 *
 * ---
 *
 * It supports multiple guards. Each is evaluated before executing `{@link CmsPageGuard}`'s main logic.
 *
 * - If any of those guards returns `false` or `UrlTree`, the `{@link CmsPageGuard}`'s main logic won't be executed,
 *    but this value (`false` or `UrlTree`) will be returned as a result of the `{@link CmsPageGuard}`.
 * - If all those guards return `true`, the `{@link CmsPageGuard}`'s main logic will be executed.
 *
 */
export const BEFORE_CMS_PAGE_GUARD = new InjectionToken<
  { canActivate: CanActivateFn }[]
>('BEFORE_CMS_PAGE_GUARD', { providedIn: 'root', factory: () => [] });
