/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ClientLogger } from './client-logger';
import { Logger } from './logger';

@NgModule({
  providers: [
    {
      provide: Logger,
      useClass: ClientLogger,
    },
  ],
})
export class LoggerModule {}
