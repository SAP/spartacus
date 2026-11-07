/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RoutingService } from '../facade/routing.service';
import { MockRoutingService } from './mock-routing.service';

/**
 * Provides a default {@link MockRoutingService} for {@link RoutingService} in
 * unit tests. Override individual methods per test with `vi.spyOn`.
 */
@NgModule({
  providers: [{ provide: RoutingService, useClass: MockRoutingService }],
})
export class RoutingTestingModule {}
