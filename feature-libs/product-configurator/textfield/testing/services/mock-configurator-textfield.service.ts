/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable, of } from 'rxjs';
import { ConfiguratorTextfield } from '../../core/model/configurator-textfield.model';

/**
 * Methods implement the real service surface with sensible defaults; override
 * any of them per test with `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
export class MockConfiguratorTextfieldService {
  createConfiguration(): Observable<ConfiguratorTextfield.Configuration> {
    return of({ configurationInfos: [] });
  }
  updateConfiguration(): void {}
  addToCart(): void {}
  updateCartEntry(): void {}
  readConfigurationForCartEntry(): Observable<ConfiguratorTextfield.Configuration> {
    return of({ configurationInfos: [] });
  }
  readConfigurationForOrderEntry(): Observable<ConfiguratorTextfield.Configuration> {
    return of({ configurationInfos: [] });
  }
  createNewConfigurationWithChange(): ConfiguratorTextfield.Configuration {
    return { configurationInfos: [] };
  }
}
