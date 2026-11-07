/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { firstValueFrom, of } from 'rxjs';
import { MockConfiguratorTextfieldService } from './mock-configurator-textfield.service';

describe('MockConfiguratorTextfieldService', () => {
  let mock: MockConfiguratorTextfieldService;

  beforeEach(() => {
    mock = new MockConfiguratorTextfieldService();
  });

  it('should return an empty configuration by default', async () => {
    expect(await firstValueFrom(mock.createConfiguration())).toEqual({
      configurationInfos: [],
    });
  });

  it('should allow overriding a method with vi.spyOn', async () => {
    vi.spyOn(mock, 'readConfigurationForCartEntry').mockReturnValue(
      of({ configurationInfos: [{ configurationLabel: 'L' }] })
    );
    const config = await firstValueFrom(mock.readConfigurationForCartEntry());
    expect(config.configurationInfos?.[0].configurationLabel).toBe('L');
  });
});
