/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { ConfiguratorTextfieldService } from '../core/facade/configurator-textfield.service';
import { MockConfiguratorTextfieldService } from './services/mock-configurator-textfield.service';
import { TextfieldConfiguratorTestingModule } from './textfield-configurator-testing.module';

describe('TextfieldConfiguratorTestingModule', () => {
  let service: ConfiguratorTextfieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TextfieldConfiguratorTestingModule],
    });
    service = TestBed.inject(ConfiguratorTextfieldService);
  });

  it('should provide the mock textfield service', () => {
    expect(service).toBeInstanceOf(MockConfiguratorTextfieldService);
  });

  it('should return an empty configuration by default', async () => {
    expect(await firstValueFrom(service.createConfiguration({} as any))).toEqual(
      { configurationInfos: [] }
    );
  });

  it('should allow overriding a method with vi.spyOn', async () => {
    vi.spyOn(service, 'createConfiguration').mockReturnValue(
      of({ configurationInfos: [{ configurationLabel: 'L' }] })
    );
    const result = await firstValueFrom(service.createConfiguration({} as any));
    expect(result.configurationInfos?.length).toBe(1);
  });
});
