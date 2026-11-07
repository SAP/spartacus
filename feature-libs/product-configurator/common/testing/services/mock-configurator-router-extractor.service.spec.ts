/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { firstValueFrom } from 'rxjs';
import { ConfiguratorRouter } from '../../components/service/configurator-router-data';
import { MockConfiguratorRouterExtractorService } from './mock-configurator-router-extractor.service';

describe('MockConfiguratorRouterExtractorService', () => {
  let mock: MockConfiguratorRouterExtractorService;

  beforeEach(() => {
    mock = new MockConfiguratorRouterExtractorService();
  });

  it('should emit router data pushed to its subject', async () => {
    const data = { owner: {} } as ConfiguratorRouter.Data;
    mock.routeDataSubject.next(data);
    expect(await firstValueFrom(mock.extractRouterData())).toBe(data);
  });

  it('should allow overriding extractRouterData with vi.spyOn', async () => {
    const data = { pageType: 'x' } as unknown as ConfiguratorRouter.Data;
    vi.spyOn(mock, 'extractRouterData').mockReturnValue(
      (await import('rxjs')).of(data)
    );
    expect(await firstValueFrom(mock.extractRouterData())).toBe(data);
  });
});
