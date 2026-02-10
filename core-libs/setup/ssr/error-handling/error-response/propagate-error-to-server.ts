/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

/**
 * Propagates the given error object to the higher layer in the server.
 *
 * It's meant to propagate errors for example to ExpressJS layer when using SSR
 * or to a Prerendering Worker when using Server Prerendering.
 *
 * Note: We need it until Angular implements a proper propagation of async errors
 * from an app to the higher layer in the server.
 * For more, see the Angular issue https://github.com/angular/angular/issues/33642
 *
 * @deprecated Use `REQUEST_CONTEXT.cx.error` instead.
 * In the modern SSR system (CxAngularNodeAppEngine), errors are propagated via
 * the `cx` namespace in REQUEST_CONTEXT. This token is still supported for
 * backward compatibility with the legacy CxCommonEngine but will be removed
 * in a future major version.
 */
export const PROPAGATE_ERROR_TO_SERVER = new InjectionToken<
  (error: unknown) => void
>('PROPAGATE_ERROR_TO_SERVER');
