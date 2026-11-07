/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable, of } from 'rxjs';
import { Configurator } from '../../core/model/configurator.model';

/**
 * Methods implement the real service surface with sensible defaults; override
 * any of them per test with `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
export class MockConfiguratorGroupStatusService {
  isGroupVisited(): Observable<boolean> {
    return of(false);
  }
  getFirstIncompleteGroup(): Configurator.Group | undefined {
    return undefined;
  }
  getNavigableTargetForContainerRowGroup(): string | undefined {
    return undefined;
  }
  setGroupStatusVisited(): void {}
}
