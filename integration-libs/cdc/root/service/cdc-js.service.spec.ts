import { TestBed } from '@angular/core/testing';
import {
  AuthService,
  BaseSiteService,
  GlobalMessageService,
  GlobalMessageType,
  LanguageService,
  ScriptLoader,
  User,
  WindowRef
} from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { Observable, of, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CdcConfig } from '../config/cdc-config';
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
    return of();
  }
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
  }): void { }
}

class MockCdcAuthFacade implements Partial<CdcAuthFacade> {
  loginWithCustomCdcFlow(): void { }
}

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of();
  }
}

class MockUserProfileFacade implements Partial<UserProfileFacade> {
  update = createSpy().and.returnValue(of(undefined));
  get = createSpy().and.returnValue(of({ uid: newEmail }));
}

class MockSubscription {
  unsubscribe() { }

  add() { }
}

const gigya = {
  accounts: {
    addEventHandlers: () => { },
    register: () => { },
    initRegistration: () => { },
    login: () => { },
    resetPassword: () => { },
    setAccountInfo: () => { },
  },
};

const mockedWindowRef = {
  nativeWindow: {
    gigya: gigya,
  },
};

const mockedGlobalMessageService = {
  add: () => { },
  remove: () => { },
};

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
      expect(winRef.nativeWindow['__gigyaConf']).toEqual({
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
      spyOn(winRef.nativeWindow['gigya'].accounts, 'addEventHandlers');

      service['addCdcEventHandlers']('electronics-spa');

      expect(
        winRef.nativeWindow['gigya'].accounts.addEventHandlers
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

    it('should not login user when on login event have empty payload', () => {
      spyOn(cdcAuth, 'loginWithCustomCdcFlow');

      service['onLoginEventHandler']('electronics-spa');

      expect(cdcAuth.loginWithCustomCdcFlow).not.toHaveBeenCalled();
    });
  });

  describe('registerUserWithoutScreenSet', () => {
    it('should not call register', () => {
      spyOn(winRef.nativeWindow['gigya'].accounts, 'initRegistration');
      service.registerUserWithoutScreenSet({});
      expect(
        winRef.nativeWindow['gigya'].accounts.initRegistration
      ).not.toHaveBeenCalled();
    });

    it('should call register', (done) => {
      spyOn(
        winRef.nativeWindow['gigya'].accounts,
        'initRegistration'
      ).and.callFake((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
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
            winRef.nativeWindow['gigya'].accounts.initRegistration
          ).toHaveBeenCalled();
          done();
        });
    });
  });

  describe('onInitRegistrationHandler', () => {
    it('should register the user', (done) => {
      spyOn(winRef.nativeWindow['gigya'].accounts, 'register').and.callFake(
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
        },
        { regToken: 'TOKEN' }
      ).subscribe({
        complete: () => {
          expect(
            winRef.nativeWindow['gigya'].accounts.register
          ).toHaveBeenCalledWith({
            email: 'uid',
            password: 'password',
            profile: {
              firstName: 'fname',
              lastName: 'lname',
            },
            regToken: 'TOKEN',
            finalizeRegistration: true,
            callback: jasmine.any(Function),
          });
          done();
        },
      });
    });

    it('should not do anything', () => {
      spyOn(winRef.nativeWindow['gigya'].accounts, 'register');
      service['onInitRegistrationHandler']({}, null);
      expect(
        winRef.nativeWindow['gigya'].accounts.register
      ).not.toHaveBeenCalled();
    });
  });

  describe('loginUserWithoutScreenSet', () => {
    it('should login user without screenset', (done) => {
      spyOn(winRef.nativeWindow['gigya'].accounts, 'login').and.callFake(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );
      expect(service.loginUserWithoutScreenSet).toBeTruthy();
      service.loginUserWithoutScreenSet('uid', 'password').subscribe(() => {
        expect(
          winRef.nativeWindow['gigya'].accounts.login
        ).toHaveBeenCalledWith({
          loginID: 'uid',
          password: 'password',
          sessionExpiry: sampleCdcConfig.cdc[0].sessionExpiration,
          callback: jasmine.any(Function),
        });
        done();
      });
    });

    it('should not login user without screenset and having empty response', () => {
      spyOn(winRef.nativeWindow['gigya'].accounts, 'login');
      service.loginUserWithoutScreenSet('uid', 'password');

      expect(
        winRef.nativeWindow['gigya'].accounts.login
      ).not.toHaveBeenCalled();
    });
  });

  describe('resetPasswordWithoutScreenSet', () => {
    it('should not call reset password', (done) => {
      spyOn(
        winRef.nativeWindow['gigya'].accounts,
        'resetPassword'
      ).and.callFake((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      expect(service.resetPasswordWithoutScreenSet).toBeTruthy();
      service.resetPasswordWithoutScreenSet('').subscribe(() => {
        expect(
          winRef.nativeWindow['gigya'].accounts.resetPassword
        ).not.toHaveBeenCalled();
      });
      done();
    });

    it('should call reset password', (done) => {
      spyOn(
        winRef.nativeWindow['gigya'].accounts,
        'resetPassword'
      ).and.callFake((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      expect(service.resetPasswordWithoutScreenSet).toBeTruthy();
      service.resetPasswordWithoutScreenSet('test@mail.com').subscribe(() => {
        expect(
          winRef.nativeWindow['gigya'].accounts.resetPassword
        ).toHaveBeenCalled();
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
        errorDetails: 'Error',
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
    it('should not show Error with no response', () => {
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
      expect(service['getSessionExpirationValue']()).toBe(120);
    });

    it('should return the default value if no configurations found', () => {
      service['cdcConfig'] = {};
      expect(service['getSessionExpirationValue']()).toBe(3600);
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
    it('should not call update profile', (done) => {
      spyOn(
        winRef.nativeWindow['gigya'].accounts,
        'setAccountInfo'
      ).and.callFake((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      expect(service.updateProfileWithoutScreenSet).toBeTruthy();
      service.updateProfileWithoutScreenSet({}).subscribe(() => {
        expect(
          winRef.nativeWindow['gigya'].accounts.setAccountInfo
        ).not.toHaveBeenCalled();
      });
      done();
    });

    it('should call update profile', (done) => {
      spyOn(
        winRef.nativeWindow['gigya'].accounts,
        'setAccountInfo'
      ).and.callFake((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      expect(service.resetPasswordWithoutScreenSet).toBeTruthy();
      let sampleUser: User = {
        firstName: 'firstName',
        lastName: 'lastName',
        titleCode: 'mr',
      };

      service.updateProfileWithoutScreenSet(sampleUser).subscribe(() => {
        service.updateProfileWithoutScreenSet({}).subscribe(() => {
          expect(
            winRef.nativeWindow['gigya'].accounts.setAccountInfo
          ).toHaveBeenCalledWith({
            profile: {
              firstName: sampleUser.firstName,
              lastName: sampleUser.lastName
            }
          });
          expect(userProfileFacade.update).toHaveBeenCalledWith({
            firstName: sampleUser.firstName,
            lastName: sampleUser.lastName,
            titleCode: sampleUser.titleCode,
          });
        });
      });
      done();
    });
  });


  describe('updateUserPasswordWithoutScreenSet', () => {
    it('should not call updateUserPasswordWithoutScreenSet', (done) => {
      spyOn(
        winRef.nativeWindow['gigya'].accounts,
        'setAccountInfo'
      ).and.callFake((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      expect(service.updateProfileWithoutScreenSet).toBeTruthy();
      service.updateUserPasswordWithoutScreenSet('', '').subscribe(() => {
        expect(
          winRef.nativeWindow['gigya'].accounts.setAccountInfo
        ).not.toHaveBeenCalled();
      });
      done();
    });

    it('should call updateUserPasswordWithoutScreenSet', (done) => {
      spyOn(
        winRef.nativeWindow['gigya'].accounts,
        'setAccountInfo'
      ).and.callFake((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      expect(service.updateUserPasswordWithoutScreenSet).toBeTruthy();
      let oldPass = 'OldPass123!';
      let newPass = 'Password1!';

      service.updateUserPasswordWithoutScreenSet(oldPass, newPass).subscribe(() => {
        expect(
          winRef.nativeWindow['gigya'].accounts.setAccountInfo
        ).toHaveBeenCalledWith({
          password: oldPass,
          newPassword: newPass,
          callback: jasmine.any(Function),
        });
      });
      done();
    });
  });

  describe('updateUserEmailWithoutScreenSet', () => {
    it('should not call updateUserEmailWithoutScreenSet', (done) => {
      spyOn(
        winRef.nativeWindow['gigya'].accounts,
        'setAccountInfo'
      ).and.callFake((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      expect(service.updateProfileWithoutScreenSet).toBeTruthy();
      service.updateUserEmailWithoutScreenSet('', '').subscribe(() => {
        expect(
          winRef.nativeWindow['gigya'].accounts.setAccountInfo
        ).not.toHaveBeenCalled();
      });
      done();
    });

    it('should call updateUserEmailWithoutScreenSet', (done) => {
      spyOn(
        winRef.nativeWindow['gigya'].accounts,
        'setAccountInfo'
      ).and.callFake((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      spyOn(
        winRef.nativeWindow['gigya'].accounts,
        'login'
      ).and.callFake((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });

      expect(service.updateUserEmailWithoutScreenSet).toBeTruthy();
      let pass = 'Password123!';

      service.updateUserEmailWithoutScreenSet(pass, newEmail).subscribe(() => {
        expect(
          winRef.nativeWindow['gigya'].accounts.setAccountInfo
        ).toHaveBeenCalledWith({
          profile: {
            email: newEmail,
          },
          callback: jasmine.any(Function),
        });
        expect(userProfileFacade.update).toHaveBeenCalledWith({
          uid: newEmail,
        });
      });
      done();
    });
  });

  describe('getLoggedInUserEmail', () => {
    it('should return the logged in user email', () => {
      userProfileFacade.get = createSpy().and.returnValue(of({ uid: newEmail }));

      expect(
        service['getLoggedInUserEmail']()
      ).toEqual(newEmail);
    });

    it('should return empty if no email is obtained', () => {
      userProfileFacade.get = createSpy().and.returnValue(of({}));

      expect(
        service['getLoggedInUserEmail']()
      ).toEqual('');
    });
  });

  describe('updateAddressWithoutScreenSet', () => {
    it('should not call updateAddressWithoutScreenSet', (done) => {
      spyOn(
        winRef.nativeWindow['gigya'].accounts,
        'setAccountInfo'
      ).and.callFake((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      expect(service.updateProfileWithoutScreenSet).toBeTruthy();
      service.updateAddressWithoutScreenSet('').subscribe(() => {
        expect(
          winRef.nativeWindow['gigya'].accounts.setAccountInfo
        ).not.toHaveBeenCalled();
      });
      done();
    });

    it('should call updateAddressWithoutScreenSet', (done) => {
      spyOn(
        winRef.nativeWindow['gigya'].accounts,
        'setAccountInfo'
      ).and.callFake((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      expect(service.updateAddressWithoutScreenSet).toBeTruthy();
      let sampleAddress = 'Address1, address2 , US';
      service.updateAddressWithoutScreenSet(sampleAddress).subscribe(() => {
        expect(
          winRef.nativeWindow['gigya'].accounts.setAccountInfo
        ).toHaveBeenCalledWith({
          profile: {
            address: sampleAddress,
          },
          callback: jasmine.any(Function),
        });
      });
      done();
    });
  });

  describe('onProfileUpdateEventHandler', () => {
    it('should update personal details when response have data', () => {
      const response = {
        profile: {
          firstName: 'firstName',
          lastName: 'lastName',
        },
      };

      service.onProfileUpdateEventHandler(response);

      expect(userProfileFacade.update).toHaveBeenCalledWith({
        firstName: response.profile.firstName,
        lastName: response.profile.lastName,
      });
    });

    it('should not update personal details when response is empty', () => {
      service.onProfileUpdateEventHandler();

      expect(userProfileFacade.update).not.toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from any subscriptions when destroyed', () => {
      spyOn(service['subscription'], 'unsubscribe');
      service.ngOnDestroy();
      expect(service['subscription'].unsubscribe).toHaveBeenCalled();
    });
  });
});
