/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Request, Response } from 'express';

/**
 * Injection token for the Express Request object in server-side rendering.
 *
 * @deprecated Use Angular's `REQUEST` token from `@angular/core` instead.
 * In the modern SSR system (CxAngularNodeAppEngine), Angular provides the
 * REQUEST token automatically. This Spartacus token is only needed for
 * backward compatibility with the legacy ngExpressEngine and will be
 * removed in a future major version.
 */
export const REQUEST: InjectionToken<Request> = new InjectionToken<Request>(
  'REQUEST'
);

/**
 * Injection token for the Express Response object in server-side rendering.
 *
 * @deprecated Use Angular's `RESPONSE_INIT` token from `@angular/core` instead.
 * In the modern SSR system (CxAngularNodeAppEngine), Angular provides the
 * RESPONSE_INIT token for response initialization. This Spartacus token is
 * only needed for backward compatibility with the legacy ngExpressEngine
 * and will be removed in a future major version.
 */
export const RESPONSE: InjectionToken<Response> = new InjectionToken<Response>(
  'RESPONSE'
);
