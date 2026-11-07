/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { firstValueFrom, of } from 'rxjs';
import { MockConfiguratorGroupsService } from './mock-configurator-groups.service';

describe('MockConfiguratorGroupsService', () => {
  let mock: MockConfiguratorGroupsService;

  beforeEach(() => {
    mock = new MockConfiguratorGroupsService();
  });

  it('should expose documented defaults', async () => {
    expect(await firstValueFrom(mock.getNextGroupId())).toBe('nextGroupId');
    expect(mock.isConflictGroupType()).toBe(false);
    expect(mock.hasSubGroups({ subGroups: [{}] } as any)).toBe(true);
  });

  it('should allow overriding a method with vi.spyOn', async () => {
    vi.spyOn(mock, 'getCurrentGroupId').mockReturnValue(of('g1'));
    expect(await firstValueFrom(mock.getCurrentGroupId())).toBe('g1');
  });
});
