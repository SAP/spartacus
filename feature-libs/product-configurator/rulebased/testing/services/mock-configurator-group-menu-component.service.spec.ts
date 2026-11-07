/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { MockConfiguratorGroupMenuComponentService } from './mock-configurator-group-menu-component.service';

describe('MockConfiguratorGroupMenuComponentService', () => {
  let mock: MockConfiguratorGroupMenuComponentService;

  beforeEach(() => {
    mock = new MockConfiguratorGroupMenuComponentService();
  });

  it('should expose documented defaults', () => {
    expect(mock.isBackBtnFocused()).toBe(false);
    expect(mock.isActiveGroupInGroupList()).toBe(false);
  });

  it('should allow overriding a method with vi.spyOn', () => {
    vi.spyOn(mock, 'isBackBtnFocused').mockReturnValue(true);
    expect(mock.isBackBtnFocused()).toBe(true);
  });
});
