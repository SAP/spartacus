/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { LoggerService } from '../logger.service';

/** Silent logger for unit tests (avoids console noise from expected warnings). */
@Injectable()
export class MockLoggerService implements Partial<LoggerService> {
  log(..._args: unknown[]): void {}

  warn(..._args: unknown[]): void {}

  error(..._args: unknown[]): void {}

  info(..._args: unknown[]): void {}

  debug(..._args: unknown[]): void {}
}
