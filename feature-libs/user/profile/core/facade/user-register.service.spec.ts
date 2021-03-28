import { inject, TestBed } from '@angular/core/testing';
import { AuthService, OCC_USER_ID_CURRENT, User } from '@spartacus/core';

import { Observable, of } from 'rxjs';
import { UserProfileService } from './user-profile.service';
import { UserRegisterService } from './user-register.service';
import { UserSignUp } from '@spartacus/user/profile/root';
import { UserProfileConnector } from '@spartacus/user/profile/core';
import { Store } from '@ngrx/store';
import createSpy = jasmine.createSpy;

class MockUserProfileService implements Partial<UserProfileService> {
  get(): Observable<User> {
    return of({ uid: OCC_USER_ID_CURRENT });
  }
  getTitles = createSpy().and.returnValue(of([]));
}

class MockUserProfileConnector implements Partial<UserProfileConnector> {
  register = createSpy().and.callFake((user) => of(user));
  registerGuest = createSpy().and.callFake((uid, _password) => of({ uid }));
}

class MockAuthService implements Partial<AuthService> {
  loginWithCredentials = createSpy().and.returnValue(Promise.resolve());
}

describe('UserRegisterService', () => {
  let service: UserRegisterService;
  let connector: UserProfileConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Store, useValue: { dispatch: () => {} } },
        {
          provide: UserProfileConnector,
          useClass: MockUserProfileConnector,
        },
        { provide: UserProfileService, useClass: MockUserProfileService },
        UserRegisterService,
      ],
    });

    service = TestBed.inject(UserRegisterService);
    connector = TestBed.inject(UserProfileConnector);
  });

  it('should inject UserRegisterService', inject(
    [UserRegisterService],
    (userRegisterService: UserRegisterService) => {
      expect(userRegisterService).toBeTruthy();
    }
  ));

  it('should be able to register user', () => {
    const userRegisterFormData: UserSignUp = {
      titleCode: 'Mr.',
      firstName: 'firstName',
      lastName: 'lastName',
      uid: 'uid',
      password: 'password',
    };
    service.register(userRegisterFormData);
    expect(connector.register).toHaveBeenCalledWith({
      titleCode: 'Mr.',
      firstName: 'firstName',
      lastName: 'lastName',
      uid: 'uid',
      password: 'password',
    });
  });

  it('should be able to register guest', () => {
    service.registerGuest('guid', 'password');
    expect(connector.registerGuest).toHaveBeenCalledWith('guid', 'password');
  });

  it('should get titles from profileService', () => {
    const userProfileService = TestBed.inject(UserProfileService);
    service.getTitles().subscribe().unsubscribe();
    expect(userProfileService.getTitles).toHaveBeenCalled();
  });
});
