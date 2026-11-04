/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { LoggerService } from '../logger.service';

/** Silent logger for unit tests (avoids Vitest stderr noise from expected warnings). */
@Injectable()
export class MockLoggerService implements Partial<LoggerService> {
  log = vi.fn();
  warn = vi.fn();
  error = vi.fn();
  info = vi.fn();
  debug = vi.fn();
}
