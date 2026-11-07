/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { MockConfiguratorCartEntryBundleInfoService } from './mock-configurator-cart-entry-bundle-info.service';

describe('MockConfiguratorCartEntryBundleInfoService', () => {
  let mock: MockConfiguratorCartEntryBundleInfoService;

  beforeEach(() => {
    mock = new MockConfiguratorCartEntryBundleInfoService();
  });

  it('should return no line items by default', () => {
    expect(mock.retrieveLineItems({})).toEqual([]);
  });

  it('should allow overriding retrieveLineItems with vi.spyOn', () => {
    vi.spyOn(mock, 'retrieveLineItems').mockReturnValue([
      { name: 'item' } as any,
    ]);
    expect(mock.retrieveLineItems({})).toHaveLength(1);
  });
});
