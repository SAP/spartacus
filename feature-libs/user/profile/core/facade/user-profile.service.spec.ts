import { vi } from 'vitest';
import { inject, TestBed } from '@angular/core/testing';
import {
  AuthService,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { Title } from '@spartacus/user/profile/root';
import { Observable, firstValueFrom, of } from 'rxjs';
import { UserProfileConnector } from '../connectors/user-profile.connector';
import { UserProfileService } from './user-profile.service';

class MockUserProfileConnector implements Partial<UserProfileConnector> {
  update = vi.fn().mockReturnValue(of(undefined));
  getTitles = vi.fn().mockReturnValue(
    of([
      { code: 't1', name: 't1' },
      { code: 't2', name: 't2' },
    ])
  );
}

const testUser = { uid: 'testUser' };

class MockUserAccountFacade implements Partial<UserAccountFacade> {
  get = vi.fn().mockReturnValue(of(testUser));
}

class MockAuthService implements Partial<AuthService> {
  loginWithCredentials = vi.fn().mockReturnValue(Promise.resolve());
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('UserProfileService', () => {
  let service: UserProfileService;
  let connector: UserProfileConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserProfileService,
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: UserProfileConnector,
          useClass: MockUserProfileConnector,
        },
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    service = TestBed.inject(UserProfileService);
    connector = TestBed.inject(UserProfileConnector);
  });

  it('should inject UserProfileService', inject(
    [UserProfileService],
    (userProfileService: UserProfileService) => {
      expect(userProfileService).toBeTruthy();
    }
  ));

  it('should be able to get user data', async () => {
    const data = await firstValueFrom(service.get());
    expect(data).toEqual(testUser);
  });

  it('should update user profile', () => {
    const userDetails: User = {
      uid: 'xxx',
    };
    service.update(userDetails);
    expect(connector.update).toHaveBeenCalledWith(
      OCC_USER_ID_CURRENT,
      userDetails
    );
  });

  it('should be able to get titles data', async () => {
    const titles = await firstValueFrom(service.getTitles());
    expect(titles).toEqual([
      { code: 't1', name: 't1' },
      { code: 't2', name: 't2' },
    ]);
  });
});
