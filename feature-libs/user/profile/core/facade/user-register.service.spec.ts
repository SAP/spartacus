import { inject, TestBed } from '@angular/core/testing';
import {
  AuthService,
  FeatureConfigService,
  OCC_USER_ID_CURRENT,
  RoutingService,
  User,
} from '@spartacus/core';

import { Store } from '@ngrx/store';
import { UserProfileConnector } from '@spartacus/user/profile/core';
import { UserSignUp } from '@spartacus/user/profile/root';
import { Observable, of } from 'rxjs';
import { UserProfileService } from './user-profile.service';
import { UserRegisterService } from './user-register.service';
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

class MockRoutingService implements Partial<RoutingService> {
  go = createSpy().and.returnValue(Promise.resolve());
}

class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isEnabled = createSpy().and.returnValue(false);
}

describe('UserRegisterService', () => {
  let service: UserRegisterService;
  let connector: UserProfileConnector;
  let authService: AuthService;
  let featureConfigService: FeatureConfigService;
  let routingService: RoutingService;
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
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
        { provide: RoutingService, useClass: MockRoutingService },
        UserRegisterService,
      ],
    });

    service = TestBed.inject(UserRegisterService);
    connector = TestBed.inject(UserProfileConnector);
    authService = TestBed.inject(AuthService);
    featureConfigService = TestBed.inject(FeatureConfigService);
    routingService = TestBed.inject(RoutingService);
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

  describe('registerGuest', () => {
    describe('when authorizationCodeFlowByDefault is enabled', () => {
      beforeEach(() => {
        (featureConfigService.isEnabled as jasmine.Spy).and.returnValue(true);
      });
      it('should be able to register guest and redirect to login', () => {
        service.registerGuest('guid', 'password');
        expect(connector.registerGuest).toHaveBeenCalledWith(
          'guid',
          'password'
        );
        expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
        expect(authService.loginWithCredentials).not.toHaveBeenCalled();
        expect(featureConfigService.isEnabled).toHaveBeenCalledWith(
          'authorizationCodeFlowByDefault'
        );
      });
    });
    describe('when authorizationCodeFlowByDefault is disabled', () => {
      beforeEach(() => {
        (featureConfigService.isEnabled as jasmine.Spy).and.returnValue(false);
      });
      it('should be able to register guest and login with credentials', () => {
        service.registerGuest('guid', 'password');
        expect(connector.registerGuest).toHaveBeenCalledWith(
          'guid',
          'password'
        );
        expect(authService.loginWithCredentials).toHaveBeenCalledWith(
          'guid',
          'password'
        );
        expect(routingService.go).not.toHaveBeenCalled();
        expect(featureConfigService.isEnabled).toHaveBeenCalledWith(
          'authorizationCodeFlowByDefault'
        );
      });
    });
  });

  it('should get titles from profileService', () => {
    const userProfileService = TestBed.inject(UserProfileService);
    service.getTitles().subscribe().unsubscribe();
    expect(userProfileService.getTitles).toHaveBeenCalled();
  });
});
