import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import {
    UserProfileConnector,
    UserProfileService,
    UserRegisterService
} from 'feature-libs/user/profile/core';
import { UserSignUp } from 'feature-libs/user/profile/root';
import { CdcJsService } from 'integration-libs/cdc/root';
import { AuthService } from 'projects/core/src/auth';
import { User } from 'projects/core/src/model';
import { OCC_USER_ID_CURRENT } from 'projects/core/src/occ';
import { Observable, of } from 'rxjs';
import { CDCUserRegisterService } from './cdc-user-register.service';
import createSpy = jasmine.createSpy;

const userRegisterFormData: UserSignUp = {
  titleCode: 'Mr.',
  firstName: 'firstName',
  lastName: 'lastName',
  uid: 'uid',
  password: 'password',
};

class MockUserProfileService implements Partial<UserProfileService> {
  get(): Observable<User> {
    return of({ uid: OCC_USER_ID_CURRENT });
  }
  getTitles = createSpy().and.returnValue(of([]));
}

class MockUserProfileConnector implements Partial<UserProfileConnector> {
  register = createSpy().and.callFake((user) => of(user));
  registerGuest = createSpy().and.callFake((uid, _password) => of(user));
}

class MockAuthService implements Partial<AuthService> {
  loginWithCredentials = createSpy().and.returnValue(Promise.resolve());
}

class MockCDCJsServiceWithCDC implements Partial<CdcJsService> {
  didLoad = createSpy().and.returnValue(of(true));
  registerUserWithoutScreenSet = createSpy().and.callFake((user) => of(user));
}

class MockCDCJsServiceWithoutCDC implements Partial<CdcJsService> {
  didLoad = createSpy().and.returnValue(of(false));
}

describe('CdcLoginComponentService', () => {
  let cdcUserRegisterService: CDCUserRegisterService;
  let connector: UserProfileConnector;
  let cdcJsService: CdcJsService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Store, useValue: { dispatch: () => {} } },
        {
          provide: UserProfileConnector,
          useClass: MockUserProfileConnector,
        },
        { provide: UserProfileService, useClass: MockUserProfileService },
        { provide: CdcJsService, useClass: MockCDCJsServiceWithCDC },
        CDCUserRegisterService,
      ],
    });

    cdcUserRegisterService = TestBed.inject(CDCUserRegisterService);
    connector = TestBed.inject(UserProfileConnector);
    // cdcJsService = jasmine.createSpyObj('cdcJsService', ['didLoad', 'registerUserWithoutScreenSet']);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(cdcUserRegisterService).toBeTruthy();
  });

  it('should inject UserRegisterService', inject(
    [CDCUserRegisterService],
    (userRegisterService: UserRegisterService) => {
      expect(userRegisterService).toBeTruthy();
    }
  ));

  it('should be able to register user through CDC', () => {
    cdcUserRegisterService.register(userRegisterFormData);
    expect(connector.register).toHaveBeenCalledWith({
      titleCode: 'Mr.',
      firstName: 'firstName',
      lastName: 'lastName',
      uid: 'uid',
      password: 'password',
    });
    expect(cdcJsService.registerUserWithoutScreenSet).toHaveBeenCalledWith({
      firstName: 'firstName',
      lastName: 'lastName',
      uid: 'uid',
      password: 'password',
    });
  });

  it('should be able to register user without CDC', () => {
    TestBed.overrideProvider(CdcJsService, {
      useValue: MockCDCJsServiceWithoutCDC,
    });
    cdcUserRegisterService.register(userRegisterFormData);
    expect(connector.register).toHaveBeenCalledWith({
      titleCode: 'Mr.',
      firstName: 'firstName',
      lastName: 'lastName',
      uid: 'uid',
      password: 'password',
    });
    expect(authService.loginWithCredentials).toHaveBeenCalledWith(
      'uid',
      'password'
    );
  });

  it('should be able to register guest with CDC', () => {
    cdcUserRegisterService.registerGuest('guid', 'password');
    expect(connector.registerGuest).toHaveBeenCalledWith('guid', 'password');
    expect(cdcJsService.registerUserWithoutScreenSet).toHaveBeenCalledWith({
      firstName: 'firstName',
      lastName: 'lastName',
      uid: 'uid',
      password: 'password',
    });
  });

  it('should be able to register guest without CDC', () => {
    TestBed.overrideProvider(CdcJsService, {
      useValue: MockCDCJsServiceWithoutCDC,
    });
    cdcUserRegisterService.registerGuest('guid', 'password');
    expect(connector.registerGuest).toHaveBeenCalledWith('guid', 'password');
    expect(authService.loginWithCredentials).toHaveBeenCalledWith(
      'uid',
      'password'
    );
  });

  it('should get titles from profileService', () => {
    const userProfileService = TestBed.inject(UserProfileService);
    cdcUserRegisterService.getTitles().subscribe().unsubscribe();
    expect(userProfileService.getTitles).toHaveBeenCalled();
  });
});
