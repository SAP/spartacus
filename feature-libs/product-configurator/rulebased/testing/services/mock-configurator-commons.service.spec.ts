/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { firstValueFrom, of } from 'rxjs';
import { MockConfiguratorCommonsService } from './mock-configurator-commons.service';

describe('MockConfiguratorCommonsService', () => {
  let mock: MockConfiguratorCommonsService;

  beforeEach(() => {
    mock = new MockConfiguratorCommonsService();
  });

  it('should expose documented defaults', async () => {
    expect(await firstValueFrom(mock.hasConflicts())).toBe(false);
    expect(await firstValueFrom(mock.isConfigurationLoading())).toBe(false);
    expect((await firstValueFrom(mock.getConfiguration())).configId).toBe('test');
  });

  it('should allow overriding a method with vi.spyOn', async () => {
    vi.spyOn(mock, 'hasConflicts').mockReturnValue(of(true));
    expect(await firstValueFrom(mock.hasConflicts())).toBe(true);
  });
});
