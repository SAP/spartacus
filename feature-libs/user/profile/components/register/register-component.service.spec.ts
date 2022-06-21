import { inject, TestBed } from '@angular/core/testing';
import { AuthService, OCC_USER_ID_CURRENT, User } from '@spartacus/core';

import { Observable, of } from 'rxjs';
import { UserSignUp } from '@spartacus/user/profile/root';
import { UserProfileConnector, UserProfileService } from '@spartacus/user/profile/core';
import { Store } from '@ngrx/store';
import createSpy = jasmine.createSpy;
import { RegisterComponentService } from './register-component.service';

class MockUserProfileService implements Partial<UserProfileService> {
  get(): Observable<User> {
    return of({ uid: OCC_USER_ID_CURRENT });
  }
  getTitles = createSpy().and.returnValue(of([]));
}

class MockUserProfileConnector implements Partial<UserProfileConnector> {
  register = createSpy().and.callFake((user) => of(user));
}

class MockAuthService implements Partial<AuthService> {
  loginWithCredentials = createSpy().and.returnValue(Promise.resolve());
}

describe('RegisterComponentService', () => {
  let service: RegisterComponentService;
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
        RegisterComponentService,
      ],
    });

    service = TestBed.inject(RegisterComponentService);
    connector = TestBed.inject(UserProfileConnector);
  });

  it('should inject RegisterComponentService', inject(
    [RegisterComponentService],
    (registerComponentService: RegisterComponentService) => {
      expect(registerComponentService).toBeTruthy();
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


  it('should get titles from profileService', () => {
    const userProfileService = TestBed.inject(UserProfileService);
    service.getTitles().subscribe().unsubscribe();
    expect(userProfileService.getTitles).toHaveBeenCalled();
  });
});
