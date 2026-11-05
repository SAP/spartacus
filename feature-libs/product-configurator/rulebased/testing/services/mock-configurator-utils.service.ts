/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { vi } from 'vitest';

/** Mock: ConfiguratorUtilsService (facade utils) stubs scroll and focus helpers used in component tests. */
export class MockConfiguratorUtilsService {
  scrollToConfigurationElement = vi.fn();
  focusFirstAttribute = vi.fn();
}
