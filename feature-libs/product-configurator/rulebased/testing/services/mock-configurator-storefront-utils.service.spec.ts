/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { MockConfiguratorStorefrontUtilsService } from './mock-configurator-storefront-utils.service';

describe('MockConfiguratorStorefrontUtilsService', () => {
  let mock: MockConfiguratorStorefrontUtilsService;

  beforeEach(() => {
    mock = new MockConfiguratorStorefrontUtilsService();
  });

  it('should expose documented defaults', () => {
    expect(mock.createAttributeUiKey()).toBe('attribute-ui-key');
    expect(mock.idSelector('id')).toBe('#id');
    expect(mock.hasScrollbar()).toBe(false);
  });

  it('should track last selected value', () => {
    mock.setLastSelected('attr', 'val');
    expect(mock.isLastSelected('attr', 'val')).toBe(true);
    expect(mock.isLastSelected('attr', 'other')).toBe(false);
  });

  it('should allow overriding a method with vi.spyOn', () => {
    vi.spyOn(mock, 'getHeight').mockReturnValue(42);
    expect(mock.getHeight()).toBe(42);
  });
});
