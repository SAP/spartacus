/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { BreakpointService } from '../breakpoint.service';
import { MockBreakpointService } from './mock-breakpoint.service';

/** Provides a default {@link MockBreakpointService} for {@link BreakpointService}. */
@NgModule({
  providers: [{ provide: BreakpointService, useClass: MockBreakpointService }],
})
export class BreakpointTestingModule {}
