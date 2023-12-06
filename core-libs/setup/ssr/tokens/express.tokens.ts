/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Request, Response } from 'express';

/**
 * Represents an injection token for the request object in server-side rendering.
 * This token is used to provide the request object to components and services.
 * It's a replacement for the `REQUEST` token that has been removed from Angular's source code.
 */
export const REQUEST: InjectionToken<Request> = new InjectionToken<Request>(
  'REQUEST'
);

/**
 * Represents an injection token for the response object in server-side rendering.
 * This token is used to provide the response object to components and services.
 * It's a replacement for the `RESPONSE` token that has been removed from Angular's source code.
 */
export const RESPONSE: InjectionToken<Response> = new InjectionToken<Response>(
  'RESPONSE'
);
