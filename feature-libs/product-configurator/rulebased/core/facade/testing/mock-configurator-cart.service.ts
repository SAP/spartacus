/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { EMPTY, Observable, of } from 'rxjs';
import { Configurator } from '../../model/configurator.model';
import { ConfiguratorCartService } from '../configurator-cart.service';

/**
 * Mock of {@link ConfiguratorCartService} for unit tests.
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockConfiguratorCartService
  implements Partial<ConfiguratorCartService>
{
  readConfigurationForCartEntry(): Observable<Configurator.Configuration> {
    return EMPTY;
  }

  readConfigurationForOrderEntry(): Observable<Configurator.Configuration> {
    return EMPTY;
  }

  addToCart(): void {}

  updateCartEntry(): void {}

  activeCartHasIssues(): Observable<boolean> {
    return of(false);
  }

  getEntry(): Observable<OrderEntry | undefined> {
    return of(undefined);
  }

  removeCartBoundConfigurations(): void {}
}
