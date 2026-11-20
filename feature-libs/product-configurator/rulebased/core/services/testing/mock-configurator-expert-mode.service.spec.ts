/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { ConfiguratorExpertModeService } from '../configurator-expert-mode.service';
import { ConfiguratorExpertModeTestingModule } from './configurator-expert-mode-testing.module';
import { MockConfiguratorExpertModeService } from './mock-configurator-expert-mode.service';

describe('MockConfiguratorExpertModeService', () => {
  let service: ConfiguratorExpertModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfiguratorExpertModeTestingModule],
    });
    service = TestBed.inject(ConfiguratorExpertModeService);
  });

  it('should be provided via ConfiguratorExpertModeTestingModule', () => {
    expect(service).toBeInstanceOf(MockConfiguratorExpertModeService);
  });

  it('should return defaults', async () => {
    expect(await firstValueFrom(service.getExpModeRequested())).toBe(false);
    expect(await firstValueFrom(service.getExpModeActive())).toBe(false);
  });

  it('should allow overriding a method return value with vi.spyOn', async () => {
    vi.spyOn(service, 'getExpModeActive').mockReturnValue(of(true));
    expect(await firstValueFrom(service.getExpModeActive())).toBe(true);
  });
});
