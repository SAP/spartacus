/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { firstValueFrom, of } from 'rxjs';
import { MockConfiguratorGroupStatusService } from './mock-configurator-group-status.service';

describe('MockConfiguratorGroupStatusService', () => {
  let mock: MockConfiguratorGroupStatusService;

  beforeEach(() => {
    mock = new MockConfiguratorGroupStatusService();
  });

  it('should expose documented defaults', async () => {
    expect(await firstValueFrom(mock.isGroupVisited())).toBe(false);
    expect(mock.getFirstIncompleteGroup()).toBeUndefined();
  });

  it('should allow overriding a method with vi.spyOn', async () => {
    vi.spyOn(mock, 'isGroupVisited').mockReturnValue(of(true));
    expect(await firstValueFrom(mock.isGroupVisited())).toBe(true);
  });
});
