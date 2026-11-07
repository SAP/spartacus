/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { firstValueFrom, of } from 'rxjs';
import { MockConfiguratorExpertModeService } from './mock-configurator-expert-mode.service';

describe('MockConfiguratorExpertModeService', () => {
  let mock: MockConfiguratorExpertModeService;

  beforeEach(() => {
    mock = new MockConfiguratorExpertModeService();
  });

  it('should expose documented defaults', async () => {
    expect(await firstValueFrom(mock.getExpModeActive())).toBe(false);
    expect(await firstValueFrom(mock.getExpModeRequested())).toBe(false);
  });

  it('should allow overriding a method with vi.spyOn', async () => {
    vi.spyOn(mock, 'getExpModeActive').mockReturnValue(of(true));
    expect(await firstValueFrom(mock.getExpModeActive())).toBe(true);
  });
});
