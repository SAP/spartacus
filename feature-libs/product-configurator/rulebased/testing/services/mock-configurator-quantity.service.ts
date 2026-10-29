/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { of } from 'rxjs';
import { vi } from 'vitest';

/** Mock: ConfiguratorQuantityService stubs configuration quantity. */
export class MockConfiguratorQuantityService {
  setQuantity = vi.fn();
  getQuantity = vi.fn().mockReturnValue(of(1));
}
