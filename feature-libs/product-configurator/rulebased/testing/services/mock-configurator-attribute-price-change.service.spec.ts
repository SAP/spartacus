/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { firstValueFrom, of } from 'rxjs';
import { MockConfiguratorAttributePriceChangeService } from './mock-configurator-attribute-price-change.service';

describe('MockConfiguratorAttributePriceChangeService', () => {
  let mock: MockConfiguratorAttributePriceChangeService;

  beforeEach(() => {
    mock = new MockConfiguratorAttributePriceChangeService();
  });

  it('should return no changed prices by default', async () => {
    expect(await firstValueFrom(mock.getChangedPrices())).toEqual({});
  });

  it('should allow overriding getChangedPrices with vi.spyOn', async () => {
    vi.spyOn(mock, 'getChangedPrices').mockReturnValue(of({ v1: {} as any }));
    expect(
      Object.keys(await firstValueFrom(mock.getChangedPrices()))
    ).toEqual(['v1']);
  });
});
