/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { UserIdService } from '../facade/user-id.service';
import { MockUserIdService } from './mock-user-id.service';
import { UserIdTestingModule } from './user-id-testing.module';

describe('MockUserIdService', () => {
  let service: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UserIdTestingModule] });
    service = TestBed.inject(UserIdService);
  });

  it('should be provided via UserIdTestingModule', () => {
    expect(service).toBeInstanceOf(MockUserIdService);
  });

  it('should return the current user id by default', async () => {
    expect(await firstValueFrom(service.getUserId())).toBe('current');
  });

  it('should allow overriding a method return value with vi.spyOn', async () => {
    vi.spyOn(service, 'getUserId').mockReturnValue(of('anonymous'));
    expect(await firstValueFrom(service.getUserId())).toBe('anonymous');
  });
});
