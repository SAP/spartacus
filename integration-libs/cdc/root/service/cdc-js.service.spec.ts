import { TestBed } from '@angular/core/testing';
import {
  AuthService,
  BaseSiteService,
  GlobalMessageService,
  GlobalMessageType,
  LanguageService,
  ScriptLoader,
  User,
  WindowRef,
} from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { EMPTY, Observable, of, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CdcConfig } from '../config/cdc-config';
import {
  CdcConsentsLocalStorageService,
  CdcSiteConsentTemplate,
} from '../consent-management';
import { CdcAuthFacade } from '../facade/cdc-auth.facade';
import { CdcJsService } from './cdc-js.service';
import createSpy = jasmine.createSpy;

const sampleCdcConfig: CdcConfig = {
  cdc: [
    {
      baseSite: 'electronics-spa',
      javascriptUrl: 'sample-url',
      sessionExpiration: 120,
    },
  ],
};

const newEmail: string = 'newemail@domain.com';

class BaseSiteServiceStub implements Partial<BaseSiteService> {
  getActive(): Observable<string> {
    return of('electronics-spa');
  }
}
class LanguageServiceStub implements Partial<LanguageService> {
  getActive(): Observable<string> {
    return EMPTY;
  }
}

class MockCdcConsentsLocalStorageService
  implements Partial<CdcConsentsLocalStorageService>
{
  persistCdcConsentsToStorage(_siteConsent: CdcSiteConsentTemplate) {}
}

declare var window: Window;

interface Window {
  gigya?: any;
}

class ScriptLoaderMock {
  public embedScript(_embedOptions: {
    _src: string;
    _params?: Object;
    _attributes?: Object;
    _callback?: EventListener;
  }): void {}
}

class MockCdcAuthFacade implements Partial<CdcAuthFacade> {
  loginWithCustomCdcFlow(): void {}
}

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return EMPTY;
  }
  coreLogout(): Promise<void> {
    return Promise.resolve();
  }
  logout(): void {}
}

class MockUserProfileFacade implements Partial<UserProfileFacade> {
  update = createSpy().and.returnValue(of(undefined));
  get = createSpy().and.returnValue(of({ uid: newEmail }));
}

class MockSubscription {
  unsubscribe() {}

  add() {}
}

const b2b = {
  getOrganizationContext: () => {},
  openDelegatedAdminLogin: () => {},
};

const gigya = {
  accounts: {
    addEventHandlers: () => {},
    register: () => {},
    initRegistration: () => {},
    login: () => {},
    logout: () => {},
    resetPassword: () => {},
    setAccountInfo: () => {},
    b2b: b2b,
  },
};

const mockedWindowRef = {
  nativeWindow: {
    gigya: gigya,
    location: {
      href: 'https://spartacus.cx',
    },
  },
};

const mockedGlobalMessageService = {
  add: () => {},
  remove: () => {},
};

const orgId = 'f5fe0023-a8c4-4379-a3e4-5fbda8895f2e';

describe('CdcJsService', () => {
  let service: CdcJsService;
  let baseSiteService: BaseSiteService;
  let languageService: LanguageService;
  let scriptLoader: ScriptLoader;
  let userProfileFacade: UserProfileFacade;
  let cdcAuth: CdcAuthFacade;
  let winRef: WindowRef;
  let authService: AuthService;
  let globalMessageService: GlobalMessageService;
  let store: CdcConsentsLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CdcConfig, useValue: sampleCdcConfig },
        { provide: BaseSiteService, useClass: BaseSiteServiceStub },
        { provide: LanguageService, useClass: LanguageServiceStub },
        { provide: ScriptLoader, useClass: ScriptLoaderMock },
        { provide: UserProfileFacade, useClass: MockUserProfileFacade },
        { provide: CdcAuthFacade, useClass: MockCdcAuthFacade },
        { provide: WindowRef, useValue: mockedWindowRef },
        { provide: Subscription, useValue: MockSubscription },
        { provide: AuthService, useClass: MockAuthService },
        { provide: GlobalMessageService, useValue: mockedGlobalMessageService },
        {
          provide: CdcConsentsLocalStorageService,
          useClass: MockCdcConsentsLocalStorageService,
        },
      ],
    });

    service = TestBed.inject(CdcJsService);
    baseSiteService = TestBed.inject(BaseSiteService);
    languageService = TestBed.inject(LanguageService);
    scriptLoader = TestBed.inject(ScriptLoader);
    userProfileFacade = TestBed.inject(UserProfileFacade);
    cdcAuth = TestBed.inject(CdcAuthFacade);
    authService = TestBed.inject(AuthService);
    winRef = TestBed.inject(WindowRef);
    globalMessageService = TestBed.inject(GlobalMessageService);
    store = TestBed.inject(CdcConsentsLocalStorageService);
    service['gigyaSDK'] = mockedWindowRef.nativeWindow.gigya;
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('initialize', () => {
    it('should load the CDC script', () => {
      spyOn(service, 'loadCdcJavascript').and.stub();

      service.initialize();

      expect(service.loadCdcJavascript).toHaveBeenCalled();
    });
  });

  describe('didLoad', () => {
    it('should return CDC script loading state', (done) => {
      spyOn(scriptLoader, 'embedScript').and.callFake(() => {
        (service as any)['loaded$'].next(true);
      });
      spyOn(baseSiteService, 'getActive').and.returnValue(
        of('electronics-spa')
      );
      spyOn(languageService, 'getActive').and.returnValue(of('en'));

      const results: Array<boolean> = [];

      (service as any)['loaded$'].next(false);

      service
        .didLoad()
        .pipe(take(2))
        .subscribe((val) => {
          results.push(val);
          if (results.length > 1) {
            expect(results[0]).toBe(false);
            expect(results[1]).toBe(true);
            done();
          }
        });

      service.loadCdcJavascript();
    });
  });

  describe('didScriptFailToLoad', () => {
    it('should return CDC script loading error state', (done) => {
      spyOn(scriptLoader, 'embedScript').and.callFake(() => {
        (service as any)['errorLoading$'].next(true);
      });

      spyOn(baseSiteService, 'getActive').and.returnValue(
        of('electronics-spa')
      );
      spyOn(languageService, 'getActive').and.returnValue(of('en'));

      const results: Array<boolean> = [];

      (service as any)['errorLoading$'].next(false);

      service
        .didScriptFailToLoad()
        .pipe(take(2))
        .subscribe((val) => {
          results.push(val);
          if (results.length > 1) {
            expect(results[0]).toBe(false);
            expect(results[1]).toBe(true);
            done();
          }
        });

      service.loadCdcJavascript();
    });
  });

  describe('loadCdcScript', () => {
    it('should load CDC script', () => {
      const site = 'electronics-spa';
      const language = 'en';

      spyOn(scriptLoader, 'embedScript');
      spyOn(baseSiteService, 'getActive').and.returnValue(of(site));
      spyOn(languageService, 'getActive').and.returnValue(of(language));

      service.loadCdcJavascript();

      expect(scriptLoader.embedScript).toHaveBeenCalledWith({
        src: 'sample-url&lang=en',
        params: undefined,
        attributes: { type: 'text/javascript' },
        callback: jasmine.any(Function) as any,
        errorCallback: jasmine.any(Function) as any,
      });
      expect(winRef?.nativeWindow['__gigyaConf']).toEqual({
        include: 'id_token',
      });
    });

    it('should not load CDC script if it is not configured', () => {
      const site = 'electronics';
      const language = 'en';

      spyOn(scriptLoader, 'embedScript');
      spyOn(baseSiteService, 'getActive').and.returnValue(of(site));
      spyOn(languageService, 'getActive').and.returnValue(of(language));

      service.initialize();

      expect(scriptLoader.embedScript).not.toHaveBeenCalled();
    });
  });

  describe('registerEventListeners', () => {
    it('should register event listeners and remove message and redirect on loading the token', () => {
      const site = 'electronics-spa';
      const language = 'en';

      spyOn(scriptLoader, 'embedScript').and.callFake(() => {
        service['registerEventListeners']('electronics-spa');
      });
      spyOn(baseSiteService, 'getActive').and.returnValue(of(site));
      spyOn(languageService, 'getActive').and.returnValue(of(language));

      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
      spyOn(service as any, 'addCdcEventHandlers').and.stub();

      service.loadCdcJavascript();

      expect(service['addCdcEventHandlers']).toHaveBeenCalledWith(
        'electronics-spa'
      );
    });
  });

  describe('addCdcEventHandlers', () => {
    it('should add event handlers for CDC login', () => {
      spyOn(service['gigyaSDK'].accounts, 'addEventHandlers');

      service['addCdcEventHandlers']('electronics-spa');

      expect(
        service['gigyaSDK'].accounts.addEventHandlers
      ).toHaveBeenCalledWith({ onLogin: jasmine.any(Function) });
    });
  });

  describe('onLoginEventHandler', () => {
    it('should login user when on login event is triggered', () => {
      spyOn(cdcAuth, 'loginWithCustomCdcFlow');

      const response = {
        UID: 'UID',
        UIDSignature: 'UIDSignature',
        signatureTimestamp: 'signatureTimestamp',
        id_token: 'id_token',
      };

      service['onLoginEventHandler']('electronics-spa', response);

      expect(cdcAuth.loginWithCustomCdcFlow).toHaveBeenCalledWith(
        response.UID,
        response.UIDSignature,
        response.signatureTimestamp,
        response.id_token,
        'electronics-spa'
      );
    });

    it('should NOT login user when on login event is triggered with context = {skipOccAuth: true} in response', () => {
      spyOn(cdcAuth, 'loginWithCustomCdcFlow');

      const response = {
        UID: 'UID',
        UIDSignature: 'UIDSignature',
        signatureTimestamp: 'signatureTimestamp',
        id_token: 'id_token',
        context: { skipOccAuth: true },
      };

      service['onLoginEventHandler']('electronics-spa', response);

      expect(cdcAuth.loginWithCustomCdcFlow).not.toHaveBeenCalled();
    });

    it('should not login user when on login event have empty payload', () => {
      spyOn(cdcAuth, 'loginWithCustomCdcFlow');

      service['onLoginEventHandler']('electronics-spa');

      expect(cdcAuth.loginWithCustomCdcFlow).not.toHaveBeenCalled();
    });
  });

  describe('registerUserWithoutScreenSet', () => {
    it('should not call register', () => {
      spyOn(service['gigyaSDK'].accounts, 'initRegistration');
      service.registerUserWithoutScreenSet({});
      expect(
        service['gigyaSDK'].accounts.initRegistration
      ).not.toHaveBeenCalled();
    });

    it('should call register', (done) => {
      spyOn(service['gigyaSDK'].accounts, 'initRegistration').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );
      spyOn(service as any, 'onInitRegistrationHandler').and.returnValue(
        of({ status: 'OK' })
      );
      expect(service.registerUserWithoutScreenSet).toBeTruthy();
      service
        .registerUserWithoutScreenSet({
          uid: 'uid',
          password: 'password',
        })
        .subscribe(() => {
          expect(
            service['gigyaSDK'].accounts.initRegistration
          ).toHaveBeenCalled();
          done();
        });
    });
  });

  describe('onInitRegistrationHandler', () => {
    it('should register the user', (done) => {
      spyOn(service['gigyaSDK'].accounts, 'register').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );
      expect(service['onInitRegistrationHandler']).toBeTruthy();
      service['onInitRegistrationHandler'](
        {
          uid: 'uid',
          password: 'password',
          firstName: 'fname',
          lastName: 'lname',
          preferences: {},
        },
        { regToken: 'TOKEN' }
      ).subscribe({
        complete: () => {
          expect(service['gigyaSDK'].accounts.register).toHaveBeenCalledWith({
            email: 'uid',
            password: 'password',
            profile: {
              firstName: 'fname',
              lastName: 'lname',
            },
            preferences: {},
            regToken: 'TOKEN',
            regSource: 'https://spartacus.cx',
            finalizeRegistration: true,
            callback: jasmine.any(Function),
          });
          done();
        },
      });
    });

    it('should not do anything', () => {
      spyOn(service['gigyaSDK'].accounts, 'register');
      service['onInitRegistrationHandler']({}, null);
      expect(service['gigyaSDK'].accounts.register).not.toHaveBeenCalled();
    });
  });

  describe('loginUserWithoutScreenSet', () => {
    it('should login user without screenset', (done) => {
      spyOn(service['gigyaSDK'].accounts, 'login').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );
      expect(service.loginUserWithoutScreenSet).toBeTruthy();
      service.loginUserWithoutScreenSet('uid', 'password').subscribe(() => {
        expect(service['gigyaSDK'].accounts.login).toHaveBeenCalledWith({
          loginID: 'uid',
          password: 'password',
          include: 'missing-required-fields',
          ignoreInterruptions: true,
          sessionExpiry: sampleCdcConfig.cdc[0].sessionExpiration,
          callback: jasmine.any(Function),
        });
        done();
      });
    });

    it('should not login user without screenset and having empty response', () => {
      spyOn(service['gigyaSDK'].accounts, 'login');
      service.loginUserWithoutScreenSet('uid', 'password');

      expect(service['gigyaSDK'].accounts.login).not.toHaveBeenCalled();
    });

    it('should pass the additional context given as input ', (done) => {
      spyOn(service['gigyaSDK'].accounts, 'login').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );
      expect(service.loginUserWithoutScreenSet).toBeTruthy();
      service
        .loginUserWithoutScreenSet('uid', 'password', 'RESET_EMAIL')
        .subscribe(() => {
          expect(service['gigyaSDK'].accounts.login).toHaveBeenCalledWith({
            loginID: 'uid',
            password: 'password',
            include: 'missing-required-fields',
            ignoreInterruptions: true,
            context: 'RESET_EMAIL',
            sessionExpiry: sampleCdcConfig?.cdc[0]?.sessionExpiration,
            callback: jasmine.any(Function),
          });
          done();
        });
    });
    it('should raise reconsent event in case of error code 206001', () => {
      spyOn(service['gigyaSDK'].accounts, 'login').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'NOT OK', errorCode: 206001 });
        }
      );
      spyOn(service, 'raiseCdcReconsentEvent').and.stub();
      service.loginUserWithoutScreenSet('uid', 'password').subscribe({
        error: () => {
          expect(service.raiseCdcReconsentEvent).toHaveBeenCalled();
        },
      });
    });
  });

  describe('resetPasswordWithoutScreenSet', () => {
    it('should not call accounts.resetPassword', (done) => {
      spyOn(service['gigyaSDK'].accounts, 'resetPassword').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );
      expect(service.resetPasswordWithoutScreenSet).toBeTruthy();
      service.resetPasswordWithoutScreenSet('').subscribe({
        error: (error) => {
          expect(error).toEqual('No email provided');
          done();
        },
      });
      expect(
        service['gigyaSDK']?.accounts.resetPassword
      ).not.toHaveBeenCalled();
    });

    it('should call accounts.resetPassword', (done) => {
      spyOn(service['gigyaSDK']?.accounts, 'resetPassword').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );
      expect(service.resetPasswordWithoutScreenSet).toBeTruthy();
      service.resetPasswordWithoutScreenSet('test@mail.com').subscribe(() => {
        expect(service['gigyaSDK']?.accounts.resetPassword).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('handleLoginError', () => {
    it('should not show anything with no response', () => {
      spyOn(globalMessageService, 'remove');
      spyOn(globalMessageService, 'add');
      service['handleLoginError'](null);
      expect(globalMessageService.add).not.toHaveBeenCalled();
      expect(globalMessageService.remove).not.toHaveBeenCalled();
    });

    it('should not show error messages on success', () => {
      spyOn(globalMessageService, 'remove');
      spyOn(globalMessageService, 'add');
      service['handleLoginError']({
        status: 'OK',
      });
      expect(globalMessageService.remove).not.toHaveBeenCalled();
      expect(globalMessageService.add).not.toHaveBeenCalled();
    });

    it('should show error', () => {
      spyOn(globalMessageService, 'remove');
      spyOn(globalMessageService, 'add');
      service['handleLoginError']({
        status: 'FAIL',
        errorMessage: 'Error',
      });
      expect(globalMessageService.remove).not.toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'httpHandlers.badRequestPleaseLoginAgain',
          params: {
            errorMessage: 'Error',
          },
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });

  describe('handleRegisterError', () => {
    it('should not show anything with no response', () => {
      spyOn(globalMessageService, 'remove');
      spyOn(globalMessageService, 'add');
      service['handleRegisterError'](null);
      expect(globalMessageService.add).not.toHaveBeenCalled();
      expect(globalMessageService.remove).not.toHaveBeenCalled();
    });

    it('should not show error messages on success', () => {
      spyOn(globalMessageService, 'remove');
      spyOn(globalMessageService, 'add');
      service['handleRegisterError']({
        status: 'OK',
      });
      expect(globalMessageService.remove).not.toHaveBeenCalled();
      expect(globalMessageService.add).not.toHaveBeenCalled();
    });

    it('should show error', () => {
      spyOn(globalMessageService, 'remove');
      spyOn(globalMessageService, 'add');
      service['handleRegisterError']({
        status: 'FAIL',
        statusMessage: 'Error',
        validationErrors: [
          {
            message: 'Error',
          },
        ],
      });
      expect(globalMessageService.remove).not.toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        'Error',
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });

  describe('handleResetPassResponse', () => {
    it('should Error with no response', () => {
      spyOn(globalMessageService, 'remove');
      spyOn(globalMessageService, 'add');
      service['handleResetPassResponse'](null);
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'httpHandlers.unknownError',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(globalMessageService.remove).not.toHaveBeenCalled();
    });

    it('should not show the Error with error response', () => {
      spyOn(globalMessageService, 'remove');
      spyOn(globalMessageService, 'add');
      const errorResponse = { errorMessage: 'ERROR' };
      service['handleResetPassResponse'](errorResponse);
      expect(globalMessageService.add).toHaveBeenCalledWith(
        errorResponse.errorMessage,
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(globalMessageService.remove).not.toHaveBeenCalled();
    });

    it('should not show error messages on success', () => {
      spyOn(globalMessageService, 'remove');
      spyOn(globalMessageService, 'add');
      service['handleResetPassResponse']({
        status: 'OK',
      });
      expect(globalMessageService.remove).not.toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'forgottenPassword.passwordResetEmailSent' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });

    it('should show error', () => {
      spyOn(globalMessageService, 'remove');
      spyOn(globalMessageService, 'add');
      service['handleResetPassResponse']({
        status: 'FAIL',
      });
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'httpHandlers.unknownError',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(globalMessageService.remove).not.toHaveBeenCalled();
    });
  });

  describe('getSessionExpirationValue', () => {
    it('should return the configured value for a given base site', () => {
      service['getSessionExpirationValue']().subscribe((sessionExipration) => {
        expect(sessionExipration).toBe(120);
      });
    });

    it('should return the default value if no configurations found', () => {
      service['cdcConfig'] = {};
      service['getSessionExpirationValue']().subscribe((sessionExipration) => {
        expect(sessionExipration).toBe(3600);
      });
    });
  });

  describe('getCurrentBaseSite', () => {
    it('should return the configured value of the base site', () => {
      expect(service['getCurrentBaseSite']()).toBe('electronics-spa');
    });

    it('should return the configured value of the base site', () => {
      spyOn(baseSiteService, 'getActive').and.returnValue(of(''));
      expect(service['getCurrentBaseSite']()).toBe('');
    });
  });

  describe('updateProfileWithoutScreenSet', () => {
    it('should not call accounts.setAccountInfo', (done) => {
      spyOn(service['gigyaSDK'].accounts, 'setAccountInfo').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );
      expect(service.updateProfileWithoutScreenSet).toBeTruthy();
      service.updateProfileWithoutScreenSet({}).subscribe({
        error: (error) => {
          expect(error).toEqual('User details not provided');
          done();
        },
      });
      expect(
        service['gigyaSDK'].accounts.setAccountInfo
      ).not.toHaveBeenCalled();
    });

    it('should call accounts.setAccountInfo', (done) => {
      spyOn(service['gigyaSDK'].accounts, 'setAccountInfo').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );
      expect(service.resetPasswordWithoutScreenSet).toBeTruthy();
      let sampleUser: User = {
        firstName: 'firstName',
        lastName: 'lastName',
        titleCode: 'mr',
      };

      service.updateProfileWithoutScreenSet(sampleUser).subscribe(() => {
        service.updateProfileWithoutScreenSet({}).subscribe(() => {
          expect(
            service['gigyaSDK'].accounts.setAccountInfo
          ).toHaveBeenCalledWith({
            profile: {
              firstName: sampleUser.firstName,
              lastName: sampleUser.lastName,
            },
          });
          expect(userProfileFacade.update).toHaveBeenCalledWith({
            firstName: sampleUser.firstName,
            lastName: sampleUser.lastName,
            titleCode: sampleUser.titleCode,
          });
          done();
        });
        done();
      });
    });
  });

  describe('updateUserPasswordWithoutScreenSet', () => {
    it('should not call accounts.setAccountInfo', (done) => {
      spyOn(service['gigyaSDK']?.accounts, 'setAccountInfo').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );
      expect(service.updateProfileWithoutScreenSet).toBeTruthy();
      service.updateUserPasswordWithoutScreenSet('', '').subscribe({
        error: (error) => {
          expect(error).toEqual('No passwords provided');
          done();
        },
      });
      expect(
        service['gigyaSDK']?.accounts.setAccountInfo
      ).not.toHaveBeenCalled();
    });

    it('should call accounts.setAccountInfo', (done) => {
      spyOn(service['gigyaSDK']?.accounts, 'setAccountInfo').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );
      expect(service.updateUserPasswordWithoutScreenSet).toBeTruthy();
      let oldPass = 'OldPass123!';
      let newPass = 'Password1!';

      service
        .updateUserPasswordWithoutScreenSet(oldPass, newPass)
        .subscribe(() => {
          expect(
            service['gigyaSDK']?.accounts.setAccountInfo
          ).toHaveBeenCalledWith({
            password: oldPass,
            newPassword: newPass,
            callback: jasmine.any(Function),
          });
          done();
        });
    });

    it('should call accounts.setAccountInfo, but not throw error user in case CDC call to update password fails', (done) => {
      spyOn(service['gigyaSDK']?.accounts, 'setAccountInfo').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'ERROR' });
        }
      );
      expect(service.updateUserPasswordWithoutScreenSet).toBeTruthy();
      let oldPass = 'OldPass123!';
      let newPass = 'Password1!';

      service.updateUserPasswordWithoutScreenSet(oldPass, newPass).subscribe({
        error: () => {
          expect(
            service['gigyaSDK']?.accounts.setAccountInfo
          ).toHaveBeenCalledWith({
            password: oldPass,
            newPassword: newPass,
            callback: jasmine.any(Function),
          });
          done();
        },
      });
    });
  });

  describe('updateUserEmailWithoutScreenSet', () => {
    it('should not call accounts.setAccountInfo', (done) => {
      spyOn(service['gigyaSDK']?.accounts, 'setAccountInfo').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );
      expect(service.updateProfileWithoutScreenSet).toBeTruthy();
      service.updateUserEmailWithoutScreenSet('', '').subscribe({
        error: (error) => {
          expect(error).toEqual('Email or password not provided');
          done();
        },
      });
      expect(
        service['gigyaSDK']?.accounts.setAccountInfo
      ).not.toHaveBeenCalled();
    });

    it('should call accounts.setAccountInfo', (done) => {
      spyOn(service['gigyaSDK']?.accounts, 'setAccountInfo').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );
      spyOn(service['gigyaSDK']?.accounts, 'login').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );

      expect(service.updateUserEmailWithoutScreenSet).toBeTruthy();
      let pass = 'Password123!';

      service.updateUserEmailWithoutScreenSet(pass, newEmail).subscribe(() => {
        expect(
          service['gigyaSDK']?.accounts.setAccountInfo
        ).toHaveBeenCalledWith({
          profile: {
            email: newEmail,
          },
          callback: jasmine.any(Function),
        });
        expect(userProfileFacade.update).toHaveBeenCalledWith({
          uid: newEmail,
        });
        userProfileFacade
          .update({
            uid: newEmail,
          })
          .subscribe(() => {
            expect(authService.logout).toHaveBeenCalled();
            expect(service['gigyaSDK'].accounts.logout).toHaveBeenCalled();
            done();
          });
        done();
      });
    });

    it('should call accounts.setAccountInfo, but not logout the user in case CDC call to update email fails', () => {
      spyOn(service['gigyaSDK']?.accounts, 'setAccountInfo').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );
      spyOn(service['gigyaSDK']?.accounts, 'login').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'ERROR' });
        }
      );

      expect(service.updateUserEmailWithoutScreenSet).toBeTruthy();
      let pass = 'Password123!';

      service.updateUserEmailWithoutScreenSet(pass, newEmail).subscribe(() => {
        expect(
          service['gigyaSDK']?.accounts.setAccountInfo
        ).toHaveBeenCalledWith({
          profile: {
            email: newEmail,
          },
          callback: jasmine.any(Function),
        });
        expect(userProfileFacade.update).not.toHaveBeenCalledWith({
          uid: newEmail,
        });
        expect(authService.logout).not.toHaveBeenCalled();
        expect(service['gigyaSDK'].accounts.logout).not.toHaveBeenCalled();
      });
    });
  });

  describe('getLoggedInUserEmail', () => {
    it('should return the logged in user email', () => {
      userProfileFacade.get = createSpy().and.returnValue(
        of({ uid: newEmail })
      );

      service['getLoggedInUserEmail']().subscribe((user: User) => {
        expect(user).toEqual({ uid: newEmail });
      });
    });

    it('should return empty if no email is obtained', () => {
      userProfileFacade.get = createSpy().and.returnValue(of(undefined));
      service['getLoggedInUserEmail']().subscribe((user: User) => {
        expect(user).toEqual({});
      });
      expect(userProfileFacade.get).toBeTruthy();
    });
  });

  describe('updateAddressWithoutScreenSet', () => {
    it('should not call accounts.setAccountInfo', (done) => {
      spyOn(service['gigyaSDK'].accounts, 'setAccountInfo').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );
      expect(service.updateProfileWithoutScreenSet).toBeTruthy();
      service.updateAddressWithoutScreenSet('').subscribe({
        error: (error) => {
          expect(error).toEqual('No address provided');
          done();
        },
      });
      expect(
        service['gigyaSDK'].accounts.setAccountInfo
      ).not.toHaveBeenCalled();
    });

    it('should call accounts.setAccountInfo', (done) => {
      spyOn(service['gigyaSDK'].accounts, 'setAccountInfo').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );
      expect(service.updateAddressWithoutScreenSet).toBeTruthy();
      let sampleAddress = 'Address1, address2 , US';
      service.updateAddressWithoutScreenSet(sampleAddress).subscribe(() => {
        expect(
          service['gigyaSDK'].accounts.setAccountInfo
        ).toHaveBeenCalledWith({
          profile: {
            address: sampleAddress,
          },
          callback: jasmine.any(Function),
        });
        done();
      });
    });
  });

  describe('onProfileUpdateEventHandler', () => {
    it('should update personal details when response have data', () => {
      const response = {
        profile: {
          firstName: 'firstName',
          lastName: 'lastName',
          email: newEmail,
        },
      };

      service.onProfileUpdateEventHandler(response);

      expect(userProfileFacade.update).toHaveBeenCalledWith({
        firstName: response.profile.firstName,
        lastName: response.profile.lastName,
        uid: response.profile.email,
      });
    });

    it('should not update personal details when response is empty', () => {
      service.onProfileUpdateEventHandler();

      expect(userProfileFacade.update).not.toHaveBeenCalled();
    });

    it('should update personal details and logout the user when response has an updated email', () => {
      const response = {
        profile: {
          firstName: 'firstName',
          lastName: 'lastName',
          email: 'email@mail.com', //email updated
        },
      };
      userProfileFacade.get = createSpy().and.returnValue(
        of({ uid: newEmail })
      );
      spyOn(service as any, 'invokeAPI').and.returnValue(of({ status: 'OK' }));
      spyOn(authService, 'logout');
      service.onProfileUpdateEventHandler(response);

      expect(userProfileFacade.update).toHaveBeenCalledWith({
        firstName: response.profile.firstName,
        lastName: response.profile.lastName,
        uid: response.profile.email,
      });
      expect(authService.logout).toHaveBeenCalled();
      expect(service['invokeAPI']).toHaveBeenCalledWith('accounts.logout', {});
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from any subscriptions when destroyed', () => {
      spyOn(service['subscription'], 'unsubscribe');
      service.ngOnDestroy();
      expect(service['subscription'].unsubscribe).toHaveBeenCalled();
    });
  });

  describe('getOrganizationContext', () => {
    it('should retrieve organization context', (done) => {
      spyOn(
        service['gigyaSDK']?.accounts.b2b,
        'getOrganizationContext'
      ).and.returnValue(of({ orgId: orgId }));
      service.getOrganizationContext().subscribe({
        next: (response) => {
          expect(response.orgId).toEqual(orgId);
          expect(
            service['gigyaSDK']?.accounts.b2b.getOrganizationContext
          ).toHaveBeenCalledWith({ callback: jasmine.any(Function) });
        },
      });
      expect(service.getOrganizationContext).toBeTruthy();
      done();
    });
  });

  describe('openDelegatedAdminLogin', () => {
    it('should open delegate admin login', (done) => {
      spyOn(
        service['gigyaSDK'].accounts.b2b,
        'openDelegatedAdminLogin'
      ).and.returnValue(of({}));

      service.openDelegatedAdminLogin(orgId);
      expect(
        service['gigyaSDK'].accounts.b2b.openDelegatedAdminLogin
      ).toHaveBeenCalledWith({
        orgId: orgId,
      });
      expect(service.openDelegatedAdminLogin).toBeTruthy();
      done();
    });
  });

  describe('invokeAPI', () => {
    it('should invoke valid CDC API and return response', (done) => {
      spyOn(service['gigyaSDK'].accounts, 'setAccountInfo').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );
      service['invokeAPI']('accounts.setAccountInfo', {}).subscribe(
        (response) => {
          expect(response).toEqual({ status: 'OK' });
          done();
        }
      );
    });

    it('should invoke API and return error when response status is ERROR', (done) => {
      spyOn(service['gigyaSDK'].accounts, 'setAccountInfo').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'ERROR' });
        }
      );
      service['invokeAPI']('accounts.setAccountInfo', {}).subscribe({
        error: (error) => {
          expect(error).toEqual({ status: 'ERROR' });
          done();
        },
      });
    });

    it('should throw an error with invalid CDC API', (done) => {
      service['invokeAPI']('some.random.apiName', {}).subscribe({
        error: (error) => {
          expect(error).toEqual('CDC API name is incorrect');
          done();
        },
      });
    });
  });

  describe('getSdkFunctionFromName', () => {
    it('should return a function for a valid input', () => {
      spyOn(service['gigyaSDK'].accounts, 'setAccountInfo').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'ERROR' });
        }
      );
      expect(
        typeof service['getSdkFunctionFromName']('accounts.setAccountInfo')
      ).toEqual('function');
    });

    it('should not return a function type for a invalid input', () => {
      expect(
        typeof service['getSdkFunctionFromName']('some.random.apiName')
      ).not.toEqual('function');
    });
  });

  describe('logoutUser', () => {
    it('should logout the user from CDC and Commerce when invoked', () => {
      spyOn(service as any, 'invokeAPI').and.returnValue(of({ status: 'OK' }));
      spyOn(authService, 'logout');
      service['logoutUser']();
      expect(authService.logout).toHaveBeenCalled();
      expect(service['invokeAPI']).toHaveBeenCalledWith('accounts.logout', {});
    });
  });

  describe('setUserConsentPreferences', () => {
    var mockUser = 'sampleuser@mail.com';
    var userPreference = {
      others: {
        survey: {
          isConsentGranted: false,
        },
      },
    };
    var lang = 'en';
    it('should set cdc consents for a user', (done) => {
      spyOn(service as any, 'invokeAPI').and.returnValue(of({ status: 'OK' }));
      service.setUserConsentPreferences(mockUser, lang, userPreference);
      expect(service['invokeAPI']).toHaveBeenCalled();
      expect(service.setUserConsentPreferences).toBeTruthy();
      done();
    });
    it('should throw error', (done) => {
      spyOn(service as any, 'invokeAPI').and.returnValue(
        of({ status: 'ERROR' })
      );
      service.setUserConsentPreferences(mockUser, lang, userPreference);
      expect(service['invokeAPI']).toHaveBeenCalled();
      expect(service.setUserConsentPreferences).toBeTruthy();
      expect(service.setUserConsentPreferences).toThrowError();
      done();
    });
  });

  describe('getSiteConsentDetails()', () => {
    it('fetch consents from the current site without persisting into Local Storage', () => {
      spyOn(baseSiteService, 'getActive').and.returnValue(
        of('electronics-spa')
      );
      spyOn(store, 'persistCdcConsentsToStorage').and.stub();
      spyOn(service as any, 'invokeAPI').and.returnValue(of({ status: 'OK' }));
      service.getSiteConsentDetails(false).subscribe(() => {
        expect(store.persistCdcConsentsToStorage).not.toHaveBeenCalled();
      });
      expect(service['invokeAPI']).toHaveBeenCalled();
      expect(service.getSiteConsentDetails).toBeTruthy();
    });
    it('fetch consents from the current site, persisting into Local Storage', () => {
      spyOn(baseSiteService, 'getActive').and.returnValue(
        of('electronics-spa')
      );
      spyOn(store, 'persistCdcConsentsToStorage').and.stub();
      spyOn(service as any, 'invokeAPI').and.returnValue(of({ status: 'OK' }));
      service.getSiteConsentDetails(true).subscribe(() => {
        expect(store.persistCdcConsentsToStorage).toHaveBeenCalled();
      });
      expect(service['invokeAPI']).toHaveBeenCalled();
      expect(service.getSiteConsentDetails).toBeTruthy();
    });
  });
});
