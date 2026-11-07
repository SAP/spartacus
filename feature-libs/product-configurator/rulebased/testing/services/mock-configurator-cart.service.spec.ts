/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { firstValueFrom, of } from 'rxjs';
import { MockConfiguratorCartService } from './mock-configurator-cart.service';

describe('MockConfiguratorCartService', () => {
  let mock: MockConfiguratorCartService;

  beforeEach(() => {
    mock = new MockConfiguratorCartService();
  });

  it('should expose documented defaults', async () => {
    expect(await firstValueFrom(mock.activeCartHasIssues())).toBe(false);
    expect((await firstValueFrom(mock.readConfigurationForCartEntry())).configId).toBe('test');
  });

  it('should allow overriding a method with vi.spyOn', async () => {
    vi.spyOn(mock, 'activeCartHasIssues').mockReturnValue(of(true));
    expect(await firstValueFrom(mock.activeCartHasIssues())).toBe(true);
  });
});
