/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { MockConfiguratorUtilsService } from './mock-configurator-utils.service';

describe('MockConfiguratorUtilsService', () => {
  let mock: MockConfiguratorUtilsService;

  beforeEach(() => {
    mock = new MockConfiguratorUtilsService();
  });

  it('should expose documented defaults', () => {
    expect(mock.isConfigurationCreated({ configId: 'a' } as any)).toBe(true);
    expect(mock.isConfigurationCreated(undefined)).toBe(false);
    expect(mock.hasSubGroups({ subGroups: [] } as any)).toBe(false);
  });

  it('should allow overriding a method with vi.spyOn', () => {
    vi.spyOn(mock, 'hasSubGroups').mockReturnValue(true);
    expect(mock.hasSubGroups({} as any)).toBe(true);
  });
});
