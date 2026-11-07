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
export class MockConfiguratorCartService {
  readConfigurationForCartEntry(): Observable<Configurator.Configuration> {
    return of(defaultConfiguration);
  }
  readConfigurationForOrderEntry(): Observable<Configurator.Configuration> {
    return of(defaultConfiguration);
  }
  addToCart(): void {}
  updateCartEntry(): void {}
  activeCartHasIssues(): Observable<boolean> {
    return of(false);
  }
  getEntry(): Observable<unknown> {
    return of(undefined);
  }
  removeCartBoundConfigurations(): void {}
}
