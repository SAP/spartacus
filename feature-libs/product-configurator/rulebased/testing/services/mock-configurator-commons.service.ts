/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { of } from 'rxjs';
import { vi } from 'vitest';
import { ConfiguratorTestUtils } from '../configurator-test-utils';

const defaultConfiguration = ConfiguratorTestUtils.createConfiguration('test');

/** Mock: ConfiguratorCommonsService exposes configuration observables and mutations. */
export class MockConfiguratorCommonsService {
  hasPendingChanges = vi.fn().mockReturnValue(of(false));
  isConfigurationLoading = vi.fn().mockReturnValue(of(false));
  getConfiguration = vi.fn().mockReturnValue(of(defaultConfiguration));
  getOrCreateConfiguration = vi.fn().mockReturnValue(of(defaultConfiguration));
  updateConfiguration = vi.fn();
  addContainerRow = vi.fn();
  removeContainerRow = vi.fn();
  copyContainerRow = vi.fn();
  getConfigurationWithOverview = vi
    .fn()
    .mockReturnValue(of(defaultConfiguration));
  updateConfigurationOverview = vi.fn();
  removeConfiguration = vi.fn();
  dismissConflictSolverDialog = vi.fn();
  checkConflictSolverDialog = vi.fn();
  hasConflicts = vi.fn().mockReturnValue(of(false));
  forceNewConfiguration = vi.fn();
  removeProductBoundConfigurations = vi.fn();
  readAttributeDomain = vi.fn().mockReturnValue(of(undefined));
  hasConfiguration = vi.fn().mockReturnValue(of(false));
  readConfiguration = vi.fn().mockReturnValue(of(defaultConfiguration));
}
