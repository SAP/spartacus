/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom, isEmpty, of } from 'rxjs';
import { ConfiguratorModelUtils } from '../../../shared/utils/configurator-model-utils';
import { ConfiguratorRouter } from '../configurator-router-data';
import { ConfiguratorRouterExtractorService } from '../configurator-router-extractor.service';
import { ConfiguratorRouterExtractorTestingModule } from './configurator-router-extractor-testing.module';
import { MockConfiguratorRouterExtractorService } from './mock-configurator-router-extractor.service';

describe('MockConfiguratorRouterExtractorService', () => {
  let service: ConfiguratorRouterExtractorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfiguratorRouterExtractorTestingModule],
    });
    service = TestBed.inject(ConfiguratorRouterExtractorService);
  });

  it('should be provided via ConfiguratorRouterExtractorTestingModule', () => {
    expect(service).toBeInstanceOf(MockConfiguratorRouterExtractorService);
  });

  it('should return defaults', async () => {
    expect(
      await firstValueFrom(service.extractRouterData().pipe(isEmpty()))
    ).toBe(true);
    expect(service.createOwnerFromRouterState({} as any)).toEqual(
      ConfiguratorModelUtils.createInitialOwner()
    );
  });

  it('should allow overriding a method return value with vi.spyOn', async () => {
    const routerData = { isOwnerCartEntry: true } as ConfiguratorRouter.Data;
    vi.spyOn(service, 'extractRouterData').mockReturnValue(of(routerData));
    expect(await firstValueFrom(service.extractRouterData())).toBe(routerData);
  });
});
