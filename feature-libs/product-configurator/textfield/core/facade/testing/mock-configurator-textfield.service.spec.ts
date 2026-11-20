/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { ConfiguratorModelUtils } from '../../../../common/shared/utils/configurator-model-utils';
import { firstValueFrom, isEmpty, of } from 'rxjs';
import { ConfiguratorTextfield } from '../../model/configurator-textfield.model';
import { ConfiguratorTextfieldService } from '../configurator-textfield.service';
import { ConfiguratorTextfieldTestingModule } from './configurator-textfield-testing.module';
import { MockConfiguratorTextfieldService } from './mock-configurator-textfield.service';

describe('MockConfiguratorTextfieldService', () => {
  const owner = ConfiguratorModelUtils.createInitialOwner();
  let service: ConfiguratorTextfieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfiguratorTextfieldTestingModule],
    });
    service = TestBed.inject(ConfiguratorTextfieldService);
  });

  it('should be provided via ConfiguratorTextfieldTestingModule', () => {
    expect(service).toBeInstanceOf(MockConfiguratorTextfieldService);
  });

  it('should return defaults', async () => {
    expect(
      await firstValueFrom(service.createConfiguration(owner).pipe(isEmpty()))
    ).toBe(true);
  });

  it('should allow overriding a method return value with vi.spyOn', async () => {
    const configuration: ConfiguratorTextfield.Configuration = {
      configurationInfos: [],
      owner,
    };
    vi.spyOn(service, 'createConfiguration').mockReturnValue(of(configuration));
    expect(await firstValueFrom(service.createConfiguration(owner))).toBe(
      configuration
    );
  });
});
