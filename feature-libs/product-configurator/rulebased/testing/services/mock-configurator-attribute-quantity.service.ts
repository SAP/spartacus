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
export class MockConfiguratorAttributeQuantityService {
  disableQuantityActions(_value: any): boolean {
    return false;
  }
  disableQuantityActionsMultiSelection(): boolean {
    return false;
  }
  withQuantityOnAttributeLevel(_attribute: Configurator.Attribute): boolean {
    return false;
  }
  withQuantity(): boolean {
    return false;
  }
  allowZeroValueQuantity(_attribute: Configurator.Attribute): boolean {
    return false;
  }
}
