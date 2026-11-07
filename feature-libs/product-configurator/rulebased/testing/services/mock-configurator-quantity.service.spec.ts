/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { firstValueFrom, of } from 'rxjs';
import { MockConfiguratorQuantityService } from './mock-configurator-quantity.service';

describe('MockConfiguratorQuantityService', () => {
  let mock: MockConfiguratorQuantityService;

  beforeEach(() => {
    mock = new MockConfiguratorQuantityService();
  });

  it('should return quantity 1 by default', async () => {
    expect(await firstValueFrom(mock.getQuantity())).toBe(1);
  });

  it('should allow overriding getQuantity with vi.spyOn', async () => {
    vi.spyOn(mock, 'getQuantity').mockReturnValue(of(5));
    expect(await firstValueFrom(mock.getQuantity())).toBe(5);
  });
});
