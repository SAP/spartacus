/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { Configurator } from '../../model/configurator.model';
import { ConfiguratorCommonsService } from '../configurator-commons.service';

/**
 * Mock of {@link ConfiguratorCommonsService} for unit tests.
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockConfiguratorCommonsService
  implements Partial<ConfiguratorCommonsService>
{
  hasPendingChanges(): Observable<boolean> {
    return of(false);
  }

  isConfigurationLoading(): Observable<boolean> {
    return of(false);
  }

  getConfiguration(): Observable<Configurator.Configuration> {
    return EMPTY;
  }

  getOrCreateConfiguration(): Observable<Configurator.Configuration> {
    return EMPTY;
  }

  updateConfiguration(): void {}

  addContainerRow(): void {}

  removeContainerRow(): void {}

  copyContainerRow(): void {}

  getConfigurationWithOverview(): Observable<Configurator.Configuration> {
    return EMPTY;
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

  readAttributeDomain(): void {}
}
