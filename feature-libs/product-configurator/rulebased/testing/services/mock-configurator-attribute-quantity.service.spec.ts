/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { MockConfiguratorAttributeQuantityService } from './mock-configurator-attribute-quantity.service';

describe('MockConfiguratorAttributeQuantityService', () => {
  let mock: MockConfiguratorAttributeQuantityService;

  beforeEach(() => {
    mock = new MockConfiguratorAttributeQuantityService();
  });

  it('should expose documented defaults', () => {
    expect(mock.withQuantity()).toBe(false);
    expect(mock.allowZeroValueQuantity({} as any)).toBe(false);
  });

  it('should allow overriding a method with vi.spyOn', () => {
    vi.spyOn(mock, 'withQuantity').mockReturnValue(true);
    expect(mock.withQuantity()).toBe(true);
  });
});
