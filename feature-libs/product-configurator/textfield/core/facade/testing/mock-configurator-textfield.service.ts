/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ConfiguratorTextfield } from '../../model/configurator-textfield.model';
import { ConfiguratorTextfieldService } from '../configurator-textfield.service';

/**
 * Mock of {@link ConfiguratorTextfieldService} for unit tests.
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockConfiguratorTextfieldService
  implements Partial<ConfiguratorTextfieldService>
{
  createConfiguration(): Observable<ConfiguratorTextfield.Configuration> {
    return EMPTY;
  }

  updateConfiguration(): void {}

  addToCart(): void {}

  updateCartEntry(): void {}

  readConfigurationForCartEntry(): Observable<ConfiguratorTextfield.Configuration> {
    return EMPTY;
  }

  readConfigurationForOrderEntry(): Observable<ConfiguratorTextfield.Configuration> {
    return EMPTY;
  }

  createNewConfigurationWithChange(
    _changedAttribute: ConfiguratorTextfield.ConfigurationInfo,
    oldConfiguration: ConfiguratorTextfield.Configuration
  ): ConfiguratorTextfield.Configuration {
    return oldConfiguration;
  }
}
