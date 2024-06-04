/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OccCdcInterceptor } from './occ-cdc.interceptor';

export const cdcInterceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: OccCdcInterceptor,
    multi: true,
  },
];
