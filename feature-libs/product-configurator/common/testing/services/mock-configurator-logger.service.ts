/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { vi } from 'vitest';

/** Mock: LoggerService suppresses log output in unit tests. */
export class MockConfiguratorLoggerService {
  log = vi.fn();
  warn = vi.fn();
  info = vi.fn();
  debug = vi.fn();
  error = vi.fn();
}
