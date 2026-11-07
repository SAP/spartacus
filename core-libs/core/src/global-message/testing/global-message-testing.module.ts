/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { GlobalMessageService } from '../facade/global-message.service';
import { MockGlobalMessageService } from './mock-global-message.service';

/** Provides a default {@link MockGlobalMessageService} for {@link GlobalMessageService}. */
@NgModule({
  providers: [
    { provide: GlobalMessageService, useClass: MockGlobalMessageService },
  ],
})
export class GlobalMessageTestingModule {}
