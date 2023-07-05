/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultSegmentRefsConfig } from './config/default-segment-refs-config';
import { segmentRefsInterceptors } from './http-interceptors';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    ...segmentRefsInterceptors,
    provideDefaultConfig(defaultSegmentRefsConfig),
  ],
})
export class SegmentRefsRootModule {}
