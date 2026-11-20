/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { ConfiguratorQuantityService } from '../configurator-quantity.service';
import { ConfiguratorQuantityTestingModule } from './configurator-quantity-testing.module';
import { MockConfiguratorQuantityService } from './mock-configurator-quantity.service';

describe('MockConfiguratorQuantityService', () => {
  let service: ConfiguratorQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfiguratorQuantityTestingModule],
    });
    service = TestBed.inject(ConfiguratorQuantityService);
  });

  it('should be provided via ConfiguratorQuantityTestingModule', () => {
    expect(service).toBeInstanceOf(MockConfiguratorQuantityService);
  });

  it('should return a quantity of 1 by default', async () => {
    expect(await firstValueFrom(service.getQuantity())).toBe(1);
  });

  it('should allow overriding a method return value with vi.spyOn', async () => {
    vi.spyOn(service, 'getQuantity').mockReturnValue(of(5));
    expect(await firstValueFrom(service.getQuantity())).toBe(5);
  });
});
