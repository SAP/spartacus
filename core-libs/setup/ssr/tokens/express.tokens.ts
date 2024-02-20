/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Request, Response } from 'express';

/**
 * Represents an injection token for the Request object of ExpressJS in server-side rendering.
 * This token is used to provide the request object to components and services.
 * It's a replacement for the `REQUEST` token from `@nguniversal/express-engine` that was removed only in Angular 17. Now this token is provided by Spartacus.
 */
export const REQUEST: InjectionToken<Request> = new InjectionToken<Request>(
  'REQUEST'
);

/**
 * Represents an injection token for the Response object of ExpressJS in server-side rendering.
 * This token is used to provide the response object to components and services.
 * It's a replacement for the `RESPONSE` token from `@nguniversal/express-engine` that was removed only in Angular 17. Now this token is provided by Spartacus.
 */
export const RESPONSE: InjectionToken<Response> = new InjectionToken<Response>(
  'RESPONSE'
);
