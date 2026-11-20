/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConfiguratorQuantityService } from '../configurator-quantity.service';

/**
 * Mock of {@link ConfiguratorQuantityService} for unit tests.
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockConfiguratorQuantityService
  implements Partial<ConfiguratorQuantityService>
{
  setQuantity(): void {}

  getQuantity(): Observable<number> {
    return of(1);
  }
}
