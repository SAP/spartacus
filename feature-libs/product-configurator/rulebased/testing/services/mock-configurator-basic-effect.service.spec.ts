/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { MockConfiguratorBasicEffectService } from './mock-configurator-basic-effect.service';

describe('MockConfiguratorBasicEffectService', () => {
  let mock: MockConfiguratorBasicEffectService;

  beforeEach(() => {
    mock = new MockConfiguratorBasicEffectService();
  });

  it('should return undefined by default', () => {
    expect(mock.getFirstGroupWithAttributes()).toBeUndefined();
    expect(mock.getFirstTabIdOfNewlyAddedContainerRow()).toBeUndefined();
  });

  it('should allow overriding a method with vi.spyOn', () => {
    vi.spyOn(mock, 'getFirstGroupWithAttributes').mockReturnValue('g1');
    expect(mock.getFirstGroupWithAttributes()).toBe('g1');
  });
});
