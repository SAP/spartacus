/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConfiguratorExpertModeService } from '../configurator-expert-mode.service';

/**
 * Mock of {@link ConfiguratorExpertModeService} for unit tests.
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockConfiguratorExpertModeService
  implements Partial<ConfiguratorExpertModeService>
{
  setExpModeRequested(): void {}

  getExpModeRequested(): Observable<boolean> {
    return of(false);
  }

  setExpModeActive(): void {}

  getExpModeActive(): Observable<boolean> {
    return of(false);
  }
}
