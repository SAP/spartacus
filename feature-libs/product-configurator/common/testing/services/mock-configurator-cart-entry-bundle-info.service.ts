/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderEntry } from '@spartacus/cart/base/root';
import { LineItem } from '../../components/configurator-cart-entry-bundle-info/configurator-cart-entry-bundle-info.model';

/**
 * Methods implement the real service surface with sensible defaults; override
 * any of them per test with `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
export class MockConfiguratorCartEntryBundleInfoService {
  retrieveLineItems(_entry: OrderEntry): LineItem[] {
    return [];
  }
}
