/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { ConfiguratorStorefrontUtilsService } from '../components/service/configurator-storefront-utils.service';
import { ConfiguratorCommonsService } from '../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../core/facade/configurator-groups.service';
import { MockConfiguratorCommonsService } from './services/mock-configurator-commons.service';
import { MockConfiguratorGroupsService } from './services/mock-configurator-groups.service';
import { MockConfiguratorStorefrontUtilsService } from './services/mock-configurator-storefront-utils.service';
import { RulebasedConfiguratorTestingModule } from './rulebased-configurator-testing.module';

describe('RulebasedConfiguratorTestingModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RulebasedConfiguratorTestingModule],
    });
  });

  it('should provide mock rulebased services', () => {
    expect(TestBed.inject(ConfiguratorCommonsService)).toBeInstanceOf(
      MockConfiguratorCommonsService
    );
    expect(TestBed.inject(ConfiguratorGroupsService)).toBeInstanceOf(
      MockConfiguratorGroupsService
    );
    expect(TestBed.inject(ConfiguratorStorefrontUtilsService)).toBeInstanceOf(
      MockConfiguratorStorefrontUtilsService
    );
  });

  it('should expose documented defaults', async () => {
    const commons = TestBed.inject(ConfiguratorCommonsService);
    expect(await firstValueFrom(commons.hasConflicts())).toBe(false);
    const config = await firstValueFrom(commons.getConfiguration());
    expect(config.configId).toBe('test');
  });

  it('should allow overriding a method with vi.spyOn', async () => {
    const commons = TestBed.inject(ConfiguratorCommonsService);
    vi.spyOn(commons, 'hasConflicts').mockReturnValue(of(true));
    expect(await firstValueFrom(commons.hasConflicts())).toBe(true);
  });
});
