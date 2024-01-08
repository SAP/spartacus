/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { OccSegmentRefsInterceptor } from './occ-segment-refs.interceptor';

export const segmentRefsInterceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: OccSegmentRefsInterceptor,
    multi: true,
  },
];
