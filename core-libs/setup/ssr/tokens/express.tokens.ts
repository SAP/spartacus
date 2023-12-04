/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Request, Response } from 'express';

export const REQUEST: InjectionToken<Request> = new InjectionToken<Request>(
  'REQUEST'
);
export const RESPONSE: InjectionToken<Response> = new InjectionToken<Response>(
  'RESPONSE'
);
