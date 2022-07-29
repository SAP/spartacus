import { inject, TestBed } from '@angular/core/testing';
import { AuthService, OCC_USER_ID_CURRENT, User } from '@spartacus/core';

import { Observable, of } from 'rxjs';
import { UserSignUp } from '@spartacus/user/profile/root';
import { UserProfileConnector, UserProfileService, UserRegisterService } from '@spartacus/user/profile/core';
import { Store } from '@ngrx/store';
import createSpy = jasmine.createSpy;
import { RegisterComponentService } from './register-component.service';

class MockUserProfileService implements Partial<UserProfileService> {
  get(): Observable<User> {
    return of({ uid: OCC_USER_ID_CURRENT });
  }
  getTitles = createSpy().and.returnValue(of([]));
}

class MockUserRegisterService implements Partial<UserRegisterService> {
  get(): Observable<User> {
    return of({ uid: OCC_USER_ID_CURRENT });
  }
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
  let service: RegisterComponentService;
  let userRegService: UserRegisterService;

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
        { provide: UserRegisterService, useClass: MockUserRegisterService },
        RegisterComponentService,
      ],
    });

    service = TestBed.inject(RegisterComponentService);
    userRegService = TestBed.inject(UserRegisterService);
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
    service.register(userRegisterFormData);
    expect(userRegService.register).toHaveBeenCalledWith({
      titleCode: 'Mr.',
      firstName: 'firstName',
      lastName: 'lastName',
      uid: 'uid',
      password: 'password',
    });
  });


  it('should get titles from UserRegisterService', () => {
    service.getTitles().subscribe().unsubscribe();
    expect(userRegService.getTitles).toHaveBeenCalled();
  });
});
