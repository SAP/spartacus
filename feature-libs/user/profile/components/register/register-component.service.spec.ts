import { inject, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AuthService, OCC_USER_ID_CURRENT, User } from '@spartacus/core';
import {
  UserProfileConnector,
  UserProfileService,
} from '@spartacus/user/profile/core';
import { UserRegisterFacade, UserSignUp } from '@spartacus/user/profile/root';
import { Observable, of } from 'rxjs';
import { RegisterComponentService } from './register-component.service';

import createSpy = jasmine.createSpy;

class MockUserProfileService implements Partial<UserProfileService> {
  get(): Observable<User> {
    return of({ uid: OCC_USER_ID_CURRENT });
  }
  getTitles = createSpy().and.returnValue(of([]));
}

class MockUserRegisterFacade implements Partial<UserRegisterFacade> {
  getTitles = createSpy().and.returnValue(of([]));
  register = createSpy().and.callFake((user: any) => of(user));
}

class MockUserProfileConnector implements Partial<UserProfileConnector> {
  register = createSpy().and.callFake((user: any) => of(user));
}

class MockAuthService implements Partial<AuthService> {
  loginWithCredentials = createSpy().and.returnValue(Promise.resolve());
}

describe('RegisterComponentService', () => {
  let regComponentService: RegisterComponentService;
  let userRegFacade: UserRegisterFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RegisterComponentService,
        { provide: AuthService, useClass: MockAuthService },
        { provide: Store, useValue: { dispatch: () => {} } },
        {
          provide: UserProfileConnector,
          useClass: MockUserProfileConnector,
        },
        { provide: UserProfileService, useClass: MockUserProfileService },
        { provide: UserRegisterFacade, useClass: MockUserRegisterFacade },
      ],
    });

    userRegFacade = TestBed.inject(UserRegisterFacade);
    regComponentService = TestBed.inject(RegisterComponentService);
  });

  it('should inject RegisterComponentService', inject(
    [RegisterComponentService],
    (registerComponentService: RegisterComponentService) => {
      expect(registerComponentService).toBeTruthy();
    }
  ));

  it('should be able to register user from UserRegisterService', () => {
    const userRegisterFormData: UserSignUp = {
      titleCode: 'Mr.',
      firstName: 'firstName',
      lastName: 'lastName',
      uid: 'uid',
      password: 'password',
    };
    regComponentService.register(userRegisterFormData);
    expect(userRegFacade.register).toHaveBeenCalledWith({
      titleCode: 'Mr.',
      firstName: 'firstName',
      lastName: 'lastName',
      uid: 'uid',
      password: 'password',
    });
  });

  it('should get titles from UserRegisterService', () => {
    regComponentService.getTitles().subscribe().unsubscribe();
    expect(userRegFacade.getTitles).toHaveBeenCalled();
  });
});
