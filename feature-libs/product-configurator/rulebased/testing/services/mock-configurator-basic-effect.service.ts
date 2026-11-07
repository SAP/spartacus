/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Configurator } from '../../core/model/configurator.model';

/**
 * Methods implement the real service surface with sensible defaults; override
 * any of them per test with `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
export class MockConfiguratorBasicEffectService {
  getConfigurationIfTabAlreadyLoaded(): Configurator.Configuration | undefined {
    return undefined;
  }
  getFirstTabIdOfNewlyAddedContainerRow(): string | undefined {
    return undefined;
  }
  getFirstGroupWithAttributes(): string | undefined {
    return undefined;
  }
}
