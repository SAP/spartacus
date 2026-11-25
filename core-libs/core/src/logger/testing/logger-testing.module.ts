/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { LoggerService } from '../logger.service';
import { MockLoggerService } from './mock-logger.service';

@NgModule({
  providers: [{ provide: LoggerService, useClass: MockLoggerService }],
})
export class LoggerTestingModule {}
