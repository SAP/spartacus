/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { DirectionService } from '../direction.service';
import { MockDirectionService } from './mock-direction.service';

/** Provides a default {@link MockDirectionService} for {@link DirectionService}. */
@NgModule({
  providers: [{ provide: DirectionService, useClass: MockDirectionService }],
})
export class DirectionTestingModule {}
