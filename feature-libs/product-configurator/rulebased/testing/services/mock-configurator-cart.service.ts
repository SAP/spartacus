/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { of } from 'rxjs';
import { vi } from 'vitest';
import { ConfiguratorTestUtils } from '../configurator-test-utils';

const defaultConfiguration = ConfiguratorTestUtils.createConfiguration('test');

/** Mock: ConfiguratorCartService stubs add-to-cart, cart-entry updates, and entry queries. */
export class MockConfiguratorCartService {
  readConfigurationForCartEntry = vi
    .fn()
    .mockReturnValue(of(defaultConfiguration));
  readConfigurationForOrderEntry = vi
    .fn()
    .mockReturnValue(of(defaultConfiguration));
  addToCart = vi.fn();
  updateCartEntry = vi.fn();
  activeCartHasIssues = vi.fn().mockReturnValue(of(false));
  getEntry = vi.fn().mockReturnValue(of(undefined));
  removeCartBoundConfigurations = vi.fn();
}
