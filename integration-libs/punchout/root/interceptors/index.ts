/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';

import { OccCmsUserIdInterceptor } from './occ-cms-user-id.interceptor';
import { PunchoutCartInterceptor } from './punchout-cart.interceptor';

export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: PunchoutCartInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: OccCmsUserIdInterceptor,
    multi: true,
  },
];
