/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OccOppsInterceptor } from './occ-opps.interceptor';

export const oppsInterceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: OccOppsInterceptor,
    multi: true,
  },
];
