/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { ConfiguratorModelUtils } from '../../../../common/shared/utils/configurator-model-utils';
import { firstValueFrom, isEmpty, of } from 'rxjs';
import { ConfiguratorCartService } from '../configurator-cart.service';
import { ConfiguratorCartTestingModule } from './configurator-cart-testing.module';
import { MockConfiguratorCartService } from './mock-configurator-cart.service';

describe('MockConfiguratorCartService', () => {
  const owner = ConfiguratorModelUtils.createInitialOwner();
  let service: ConfiguratorCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfiguratorCartTestingModule],
    });
    service = TestBed.inject(ConfiguratorCartService);
  });

  it('should be provided via ConfiguratorCartTestingModule', () => {
    expect(service).toBeInstanceOf(MockConfiguratorCartService);
  });

  it('should return defaults', async () => {
    expect(
      await firstValueFrom(
        service.readConfigurationForCartEntry(owner).pipe(isEmpty())
      )
    ).toBe(true);
    expect(await firstValueFrom(service.activeCartHasIssues())).toBe(false);
    expect(await firstValueFrom(service.getEntry('1'))).toBeUndefined();
  });

  it('should allow overriding a method return value with vi.spyOn', async () => {
    vi.spyOn(service, 'activeCartHasIssues').mockReturnValue(of(true));
    expect(await firstValueFrom(service.activeCartHasIssues())).toBe(true);
  });
});
