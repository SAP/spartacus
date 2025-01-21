/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

/**
 * Propagates the given error object to the higher layer in the server.
 *
 * It's meant to propagate errors for example to ExpressJS layer when using SSR
 * or to a Prerendering Worker when using Server Prerendering.
 * Currently, it's provided OOTB only in SSR (not prerendering), in the `CxCommonEngine` class.
 *
 * Note: We need it until Angular implements a proper propagation of async errors
 * from an app to the the higher layer in the server.
 * For more, see the Angular issue https://github.com/angular/angular/issues/33642
 */
export const PROPAGATE_ERROR_TO_SERVER = new InjectionToken<
  (error: unknown) => void
>('PROPAGATE_ERROR_RESPONSE');
