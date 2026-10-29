/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { of } from 'rxjs';
import { vi } from 'vitest';

/** Mock: ConfiguratorExpertModeService stubs expert mode observables. */
export class MockConfiguratorExpertModeService {
  setExpModeRequested = vi.fn();
  getExpModeRequested = vi.fn().mockReturnValue(of(false));
  setExpModeActive = vi.fn();
  getExpModeActive = vi.fn().mockReturnValue(of(false));
}
