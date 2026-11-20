/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { ConfiguratorModelUtils } from '../../../../common/shared/utils/configurator-model-utils';
import { firstValueFrom, isEmpty, of } from 'rxjs';
import { Configurator } from '../../model/configurator.model';
import { ConfiguratorCommonsService } from '../configurator-commons.service';
import { ConfiguratorCommonsTestingModule } from './configurator-commons-testing.module';
import { MockConfiguratorCommonsService } from './mock-configurator-commons.service';

describe('MockConfiguratorCommonsService', () => {
  const owner = ConfiguratorModelUtils.createInitialOwner();
  let service: ConfiguratorCommonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfiguratorCommonsTestingModule],
    });
    service = TestBed.inject(ConfiguratorCommonsService);
  });

  it('should be provided via ConfiguratorCommonsTestingModule', () => {
    expect(service).toBeInstanceOf(MockConfiguratorCommonsService);
  });

  it('should return defaults', async () => {
    expect(
      await firstValueFrom(service.getConfiguration(owner).pipe(isEmpty()))
    ).toBe(true);
    expect(await firstValueFrom(service.hasPendingChanges(owner))).toBe(false);
    expect(await firstValueFrom(service.isConfigurationLoading(owner))).toBe(
      false
    );
    expect(await firstValueFrom(service.hasConflicts(owner))).toBe(false);
  });

  it('should allow overriding a method return value with vi.spyOn', async () => {
    const configuration = { configId: 'c1' } as Configurator.Configuration;
    vi.spyOn(service, 'getConfiguration').mockReturnValue(of(configuration));
    expect(await firstValueFrom(service.getConfiguration(owner))).toBe(
      configuration
    );
  });
});
