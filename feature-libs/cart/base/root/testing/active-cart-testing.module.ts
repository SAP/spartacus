/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ActiveCartFacade } from '../facade/active-cart.facade';
import { MockActiveCartService } from './mock-active-cart.service';

/** Provides a default {@link MockActiveCartService} for {@link ActiveCartFacade}. */
@NgModule({
  providers: [{ provide: ActiveCartFacade, useClass: MockActiveCartService }],
})
export class ActiveCartTestingModule {}
