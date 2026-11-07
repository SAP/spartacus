/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable, of } from 'rxjs';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../configurator-test-utils';

const defaultConfiguration = ConfiguratorTestUtils.createConfiguration('test');

/**
 * Methods implement the real service surface with sensible defaults; override
 * any of them per test with `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
export class MockConfiguratorCommonsService {
  hasPendingChanges(): Observable<boolean> {
    return of(false);
  }
  isConfigurationLoading(): Observable<boolean> {
    return of(false);
  }
  getConfiguration(): Observable<Configurator.Configuration> {
    return of(defaultConfiguration);
  }
  getOrCreateConfiguration(): Observable<Configurator.Configuration> {
    return of(defaultConfiguration);
  }
  updateConfiguration(): void {}
  addContainerRow(): void {}
  removeContainerRow(): void {}
  copyContainerRow(): void {}
  getConfigurationWithOverview(): Observable<Configurator.Configuration> {
    return of(defaultConfiguration);
  }
  updateConfigurationOverview(): void {}
  removeConfiguration(): void {}
  dismissConflictSolverDialog(): void {}
  checkConflictSolverDialog(): void {}
  hasConflicts(): Observable<boolean> {
    return of(false);
  }
  forceNewConfiguration(): void {}
  removeProductBoundConfigurations(): void {}
  readAttributeDomain(): Observable<Configurator.Attribute | undefined> {
    return of(undefined);
  }
  hasConfiguration(): Observable<boolean> {
    return of(false);
  }
  readConfiguration(): Observable<Configurator.Configuration> {
    return of(defaultConfiguration);
  }
}
