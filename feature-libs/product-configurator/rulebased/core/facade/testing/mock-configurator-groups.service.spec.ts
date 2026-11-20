/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { ConfiguratorModelUtils } from '../../../../common/shared/utils/configurator-model-utils';
import { firstValueFrom, isEmpty, of } from 'rxjs';
import { ConfiguratorGroupsService } from '../configurator-groups.service';
import { ConfiguratorGroupsTestingModule } from './configurator-groups-testing.module';
import { MockConfiguratorGroupsService } from './mock-configurator-groups.service';

describe('MockConfiguratorGroupsService', () => {
  const owner = ConfiguratorModelUtils.createInitialOwner();
  let service: ConfiguratorGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfiguratorGroupsTestingModule],
    });
    service = TestBed.inject(ConfiguratorGroupsService);
  });

  it('should be provided via ConfiguratorGroupsTestingModule', () => {
    expect(service).toBeInstanceOf(MockConfiguratorGroupsService);
  });

  it('should return defaults', async () => {
    expect(await firstValueFrom(service.getCurrentGroupId(owner))).toBe('');
    expect(
      await firstValueFrom(service.getCurrentGroup(owner).pipe(isEmpty()))
    ).toBe(true);
    expect(await firstValueFrom(service.getNextGroupId(owner))).toBeUndefined();
    expect(await firstValueFrom(service.isGroupVisited(owner, 'g1'))).toBe(
      false
    );
  });

  it('should allow overriding a method return value with vi.spyOn', async () => {
    vi.spyOn(service, 'getCurrentGroupId').mockReturnValue(of('group-1'));
    expect(await firstValueFrom(service.getCurrentGroupId(owner))).toBe(
      'group-1'
    );
  });
});
