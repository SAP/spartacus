/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { ClientTokenInterceptor } from './client-token.interceptor';

export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: ClientTokenInterceptor,
    multi: true,
  },
];
