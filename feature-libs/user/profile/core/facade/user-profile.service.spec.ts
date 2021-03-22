import { inject, TestBed } from '@angular/core/testing';
import { AuthService } from '@spartacus/core';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { of } from 'rxjs';

import { UserPasswordService } from './user-password.service';
import { UserProfileService } from './user-profile.service';
import { Title } from '@spartacus/user/profile/root';
import { UserProfileConnector } from '../connectors/user-profile.connector';
import createSpy = jasmine.createSpy;

class MockUserProfileConnector implements Partial<UserProfileConnector> {
  update = createSpy().and.returnValue(of(undefined));
  getTitles = createSpy().and.returnValue(
    of([
      { code: 't1', name: 't1' },
      { code: 't2', name: 't2' },
    ])
  );
}

const testUser = { uid: 'testUser' };

class MockUserAccountFacade implements Partial<UserAccountFacade> {
  get = createSpy().and.returnValue(of(testUser));
}

class MockAuthService implements Partial<AuthService> {
  loginWithCredentials = createSpy().and.returnValue(Promise.resolve());
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
      ],
    });

    service = TestBed.inject(UserProfileService);
    connector = TestBed.inject(UserProfileConnector);
  });

  it('should inject UserProfileService', inject(
    [UserProfileService],
    (userPasswordService: UserPasswordService) => {
      expect(userPasswordService).toBeTruthy();
    }
  ));

  it('should be able to get user data', (done) => {
    service.get().subscribe((data) => {
      expect(data).toEqual(testUser);
      done();
    });
  });

  it('should update user profile', () => {
    const userDetails: User = {
      uid: 'xxx',
    };
    service.update(userDetails);
    expect(connector.update).toHaveBeenCalledWith(testUser.uid, userDetails);
  });

  it('should be able to get titles data', () => {
    let titles: Title[];
    service
      .getTitles()
      .subscribe((data) => {
        titles = data;
      })
      .unsubscribe();
    expect(titles).toEqual([
      { code: 't1', name: 't1' },
      { code: 't2', name: 't2' },
    ]);
  });
});
