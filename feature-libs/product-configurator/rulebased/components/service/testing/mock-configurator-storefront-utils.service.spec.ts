/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { ConfiguratorStorefrontUtilsService } from '../configurator-storefront-utils.service';
import { ConfiguratorStorefrontUtilsTestingModule } from './configurator-storefront-utils-testing.module';
import { MockConfiguratorStorefrontUtilsService } from './mock-configurator-storefront-utils.service';

describe('MockConfiguratorStorefrontUtilsService', () => {
  let service: ConfiguratorStorefrontUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfiguratorStorefrontUtilsTestingModule],
    });
    service = TestBed.inject(ConfiguratorStorefrontUtilsService);
  });

  it('should be provided via ConfiguratorStorefrontUtilsTestingModule', () => {
    expect(service).toBeInstanceOf(MockConfiguratorStorefrontUtilsService);
  });

  it('should return defaults', async () => {
    expect(await firstValueFrom(service.isDisplayOnlyVariant())).toBe(false);
    expect(service.getElement('#id')).toBeUndefined();
    expect(service.getElements('.cls')).toEqual([]);
    expect(service.isLastSelected('attr', 'value')).toBe(false);
  });

  it('should allow overriding a method return value with vi.spyOn', () => {
    vi.spyOn(service, 'isCartEntryOrGroupVisited').mockReturnValue(of(true));
    vi.spyOn(service, 'createAttributeUiKey').mockReturnValue('key');
    expect(service.createAttributeUiKey('prefix', 'attr')).toBe('key');
  });
});
