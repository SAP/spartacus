import { TestBed } from '@angular/core/testing';
import {
  AuthService,
  BaseSite,
  BaseSiteService,
  GlobalMessageService,
  GlobalMessageType,
  LanguageService,
  ScriptLoader,
  User,
  WindowRef,
} from '@spartacus/core';
import { OrganizationUserRegistrationForm } from '@spartacus/organization/user-registration/root';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import {
  EMPTY,
  firstValueFrom,
  lastValueFrom,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { CdcConfig } from '../config/cdc-config';
import {
  CdcConsentsLocalStorageService,
  CdcSiteConsentTemplate,
} from '../consent-management';
import { CdcAuthFacade } from '../facade/cdc-auth.facade';
import { CdcJsService } from './cdc-js.service';

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
  get(_siteUid?: string): Observable<BaseSite | undefined> {
    return of({ uid: 'electronics-spa', channel: 'B2C' });
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
  update = vi.fn().mockReturnValue(of(undefined));
  get = vi.fn().mockReturnValue(of({ uid: newEmail }));
}

class MockSubscription {
  unsubscribe() {}

  add() {}
}

const b2b = {
  getOrganizationContext: () => {},
  openDelegatedAdminLogin: () => {},
  registerOrganization: () => {},
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
      vi.spyOn(service, 'loadCdcJavascript').mockImplementation(() => {});

      service.initialize();

      expect(service.loadCdcJavascript).toHaveBeenCalled();
    });
  });

  describe('didLoad', () => {
    it('should return CDC script loading state', async () => {
      vi.spyOn(scriptLoader, 'embedScript').mockImplementation(() => {
        (service as any)['loaded$'].next(true);
      });
      vi.spyOn(baseSiteService, 'getActive').mockReturnValue(
        of('electronics-spa')
      );
      vi.spyOn(languageService, 'getActive').mockReturnValue(of('en'));

      (service as any)['loaded$'].next(false);

      const resultPromise = lastValueFrom(
        service.didLoad().pipe(take(2), toArray())
      );
      service.loadCdcJavascript();
      const results = await resultPromise;

      expect(results[0]).toBe(false);
      expect(results[1]).toBe(true);
    });
  });

  describe('didScriptFailToLoad', () => {
    it('should return CDC script loading error state', async () => {
      vi.spyOn(scriptLoader, 'embedScript').mockImplementation(() => {
        (service as any)['errorLoading$'].next(true);
      });

      vi.spyOn(baseSiteService, 'getActive').mockReturnValue(
        of('electronics-spa')
      );
      vi.spyOn(languageService, 'getActive').mockReturnValue(of('en'));

      (service as any)['errorLoading$'].next(false);

      const resultPromise = lastValueFrom(
        service.didScriptFailToLoad().pipe(take(2), toArray())
      );
      service.loadCdcJavascript();
      const results = await resultPromise;

      expect(results[0]).toBe(false);
      expect(results[1]).toBe(true);
    });
  });

  describe('loadCdcScript', () => {
    it('should load CDC script', () => {
      const site = 'electronics-spa';
      const language = 'en';

      vi.spyOn(scriptLoader, 'embedScript');
      vi.spyOn(baseSiteService, 'getActive').mockReturnValue(of(site));
      vi.spyOn(languageService, 'getActive').mockReturnValue(of(language));

      service.loadCdcJavascript();

      expect(scriptLoader.embedScript).toHaveBeenCalledWith({
        src: 'sample-url&lang=en',
        params: undefined,
        attributes: { type: 'text/javascript' },
        callback: expect.any(Function) as any,
        errorCallback: expect.any(Function) as any,
      });
      expect(winRef?.nativeWindow['__gigyaConf']).toEqual({
        include: 'id_token, missing-required-fields, preferences',
      });
    });

    it('should not load CDC script if it is not configured', () => {
      const site = 'electronics';
      const language = 'en';

      vi.spyOn(scriptLoader, 'embedScript');
      vi.spyOn(baseSiteService, 'getActive').mockReturnValue(of(site));
      vi.spyOn(languageService, 'getActive').mockReturnValue(of(language));

      service.initialize();

      expect(scriptLoader.embedScript).not.toHaveBeenCalled();
    });
  });

  describe('registerEventListeners', () => {
    it('should register event listeners and remove message and redirect on loading the token', () => {
      const site = 'electronics-spa';
      const language = 'en';

      vi.spyOn(scriptLoader, 'embedScript').mockImplementation(() => {
        service['registerEventListeners']('electronics-spa');
      });
      vi.spyOn(baseSiteService, 'getActive').mockReturnValue(of(site));
      vi.spyOn(languageService, 'getActive').mockReturnValue(of(language));

      vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(true));
      vi.spyOn(service as any, 'addCdcEventHandlers').mockImplementation(
        () => {}
      );

      service.loadCdcJavascript();

      expect(service['addCdcEventHandlers']).toHaveBeenCalledWith(
        'electronics-spa'
      );
    });
  });

  describe('addCdcEventHandlers', () => {
    it('should add event handlers for CDC login', () => {
      vi.spyOn(service['gigyaSDK'].accounts, 'addEventHandlers');

      service['addCdcEventHandlers']('electronics-spa');

      expect(
        service['gigyaSDK'].accounts.addEventHandlers
      ).toHaveBeenCalledWith({ onLogin: expect.any(Function) });
    });
  });

  describe('onLoginEventHandler', () => {
    it('should login user when on login event is triggered', () => {
      vi.spyOn(cdcAuth, 'loginWithCustomCdcFlow');

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
      vi.spyOn(cdcAuth, 'loginWithCustomCdcFlow');

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
      vi.spyOn(cdcAuth, 'loginWithCustomCdcFlow');

      service['onLoginEventHandler']('electronics-spa');

      expect(cdcAuth.loginWithCustomCdcFlow).not.toHaveBeenCalled();
    });
  });

  describe('registerUserWithoutScreenSet', () => {
    it('should not call register', () => {
      vi.spyOn(service['gigyaSDK'].accounts, 'initRegistration');
      service.registerUserWithoutScreenSet({});
      expect(
        service['gigyaSDK'].accounts.initRegistration
      ).not.toHaveBeenCalled();
    });

    it('should call register', async () => {
      vi.spyOn(
        service['gigyaSDK'].accounts,
        'initRegistration'
      ).mockImplementation((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      vi.spyOn(service as any, 'onInitRegistrationHandler').mockReturnValue(
        of({ status: 'OK' })
      );
      expect(service.registerUserWithoutScreenSet).toBeTruthy();
      await firstValueFrom(
        service.registerUserWithoutScreenSet({
          uid: 'uid',
          password: 'password',
        })
      );
      expect(service['gigyaSDK'].accounts.initRegistration).toHaveBeenCalled();
    });
  });

  describe('onInitRegistrationHandler', () => {
    it('should register the user', async () => {
      vi.spyOn(service['gigyaSDK'].accounts, 'register').mockImplementation(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );
      expect(service['onInitRegistrationHandler']).toBeTruthy();
      await firstValueFrom(
        service['onInitRegistrationHandler'](
          {
            uid: 'uid',
            password: 'password',
            firstName: 'fname',
            lastName: 'lname',
            preferences: {},
          },
          { regToken: 'TOKEN' }
        ),
        { defaultValue: undefined }
      );
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
        callback: expect.any(Function),
      });
    });

    it('should not do anything', () => {
      vi.spyOn(service['gigyaSDK'].accounts, 'register');
      service['onInitRegistrationHandler']({}, null);
      expect(service['gigyaSDK'].accounts.register).not.toHaveBeenCalled();
    });
  });

  describe('loginUserWithoutScreenSet', () => {
    it('should login user without screenset', async () => {
      expect(service['getCurrentBaseSite']()).toBe('electronics-spa');
      vi.spyOn(service['gigyaSDK'].accounts, 'login').mockImplementation(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );
      expect(service.loginUserWithoutScreenSet).toBeTruthy();
      await firstValueFrom(
        service.loginUserWithoutScreenSet('uid', 'password')
      );
      expect(service['gigyaSDK'].accounts.login).toHaveBeenCalledWith({
        loginID: 'uid',
        password: 'password',
        ignoreInterruptions: true,
        sessionExpiry: sampleCdcConfig.cdc[0].sessionExpiration,
        callback: expect.any(Function),
      });
    });

    it('should not login user without screenset and having empty response', () => {
      vi.spyOn(service['gigyaSDK'].accounts, 'login');
      service.loginUserWithoutScreenSet('uid', 'password');

      expect(service['gigyaSDK'].accounts.login).not.toHaveBeenCalled();
    });

    it('should pass the additional context given as input ', async () => {
      vi.spyOn(service['gigyaSDK'].accounts, 'login').mockImplementation(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );
      expect(service.loginUserWithoutScreenSet).toBeTruthy();
      await firstValueFrom(
        service.loginUserWithoutScreenSet('uid', 'password', 'RESET_EMAIL')
      );
      expect(service['gigyaSDK'].accounts.login).toHaveBeenCalledWith({
        loginID: 'uid',
        password: 'password',
        ignoreInterruptions: true,
        context: 'RESET_EMAIL',
        sessionExpiry: sampleCdcConfig?.cdc[0]?.sessionExpiration,
        callback: expect.any(Function),
      });
    });
    it('should raise reconsent event in case of error code 206001', () => {
      vi.spyOn(service['gigyaSDK'].accounts, 'login').mockImplementation(
        (options: { callback: Function }) => {
          options.callback({ status: 'NOT OK', errorCode: 206001 });
        }
      );
      vi.spyOn(service, 'raiseCdcReconsentEvent').mockImplementation(() => {});
      service.loginUserWithoutScreenSet('uid', 'password').subscribe({
        error: () => {
          expect(service.raiseCdcReconsentEvent).toHaveBeenCalled();
        },
      });
    });
  });

  describe('resetPasswordWithoutScreenSet', () => {
    it('should not call accounts.resetPassword', async () => {
      vi.spyOn(
        service['gigyaSDK'].accounts,
        'resetPassword'
      ).mockImplementation((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      expect(service.resetPasswordWithoutScreenSet).toBeTruthy();
      await expect(
        firstValueFrom(service.resetPasswordWithoutScreenSet(''))
      ).rejects.toEqual('No email provided');
      expect(
        service['gigyaSDK']?.accounts.resetPassword
      ).not.toHaveBeenCalled();
    });

    it('should call accounts.resetPassword', async () => {
      vi.spyOn(
        service['gigyaSDK']?.accounts,
        'resetPassword'
      ).mockImplementation((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      expect(service.resetPasswordWithoutScreenSet).toBeTruthy();
      await firstValueFrom(
        service.resetPasswordWithoutScreenSet('test@mail.com')
      );
      expect(service['gigyaSDK']?.accounts.resetPassword).toHaveBeenCalled();
    });
  });

  describe('handleLoginError', () => {
    it('should not show anything with no response', () => {
      vi.spyOn(globalMessageService, 'remove');
      vi.spyOn(globalMessageService, 'add');
      service['handleLoginError'](null);
      expect(globalMessageService.add).not.toHaveBeenCalled();
      expect(globalMessageService.remove).not.toHaveBeenCalled();
    });

    it('should not show error messages on success', () => {
      vi.spyOn(globalMessageService, 'remove');
      vi.spyOn(globalMessageService, 'add');
      service['handleLoginError']({
        status: 'OK',
      });
      expect(globalMessageService.remove).not.toHaveBeenCalled();
      expect(globalMessageService.add).not.toHaveBeenCalled();
    });

    it('should show error', () => {
      vi.spyOn(globalMessageService, 'remove');
      vi.spyOn(globalMessageService, 'add');
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
      vi.spyOn(globalMessageService, 'remove');
      vi.spyOn(globalMessageService, 'add');
      service['handleRegisterError'](null);
      expect(globalMessageService.add).not.toHaveBeenCalled();
      expect(globalMessageService.remove).not.toHaveBeenCalled();
    });

    it('should not show error messages on success', () => {
      vi.spyOn(globalMessageService, 'remove');
      vi.spyOn(globalMessageService, 'add');
      service['handleRegisterError']({
        status: 'OK',
      });
      expect(globalMessageService.remove).not.toHaveBeenCalled();
      expect(globalMessageService.add).not.toHaveBeenCalled();
    });

    it('should show error', () => {
      vi.spyOn(globalMessageService, 'remove');
      vi.spyOn(globalMessageService, 'add');
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

  describe('handleProfileUpdateResponse', () => {
    it('should not show error message on success', () => {
      vi.spyOn(globalMessageService, 'add');
      vi.spyOn(globalMessageService, 'remove');
      service['handleProfileUpdateResponse']({
        response: { errorCode: 0 },
      });
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'cdcProfile.profileUpdateSuccess',
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
      expect(globalMessageService.remove).not.toHaveBeenCalled();
    });

    it('should show error message on failure', () => {
      vi.spyOn(globalMessageService, 'add');
      vi.spyOn(globalMessageService, 'remove');
      service['handleProfileUpdateResponse']({
        response: { errorCode: 1 },
      });
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'cdcProfile.profileUpdateFailure',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(globalMessageService.remove).not.toHaveBeenCalled();
    });
  });

  describe('handleResetPassResponse', () => {
    it('should Error with no response', () => {
      vi.spyOn(globalMessageService, 'remove');
      vi.spyOn(globalMessageService, 'add');
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
      vi.spyOn(globalMessageService, 'remove');
      vi.spyOn(globalMessageService, 'add');
      const errorResponse = { errorMessage: 'ERROR' };
      service['handleResetPassResponse'](errorResponse);
      expect(globalMessageService.add).toHaveBeenCalledWith(
        errorResponse.errorMessage,
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(globalMessageService.remove).not.toHaveBeenCalled();
    });

    it('should not show error messages on success', () => {
      vi.spyOn(globalMessageService, 'remove');
      vi.spyOn(globalMessageService, 'add');
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
      vi.spyOn(globalMessageService, 'remove');
      vi.spyOn(globalMessageService, 'add');
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
      vi.spyOn(baseSiteService, 'getActive').mockReturnValue(of(''));
      expect(service['getCurrentBaseSite']()).toBe('');
    });
  });

  describe('getCurrentBaseSiteChannel', () => {
    it('should return the channel value of the base site - B2C', () => {
      vi.spyOn(baseSiteService, 'get').mockReturnValue(
        of({ uid: 'electronics-spa', channel: 'B2C' })
      );
      expect(service['getCurrentBaseSiteChannel']()).toBe('B2C');
    });

    it('should return the channel of the base site - B2B', () => {
      vi.spyOn(baseSiteService, 'get').mockReturnValue(
        of({ uid: 'powertools-spa', channel: 'B2B' })
      );
      expect(service['getCurrentBaseSiteChannel']()).toBe('B2B');
    });
  });

  describe('updateProfileWithoutScreenSet', () => {
    it('should not call accounts.setAccountInfo', async () => {
      vi.spyOn(
        service['gigyaSDK'].accounts,
        'setAccountInfo'
      ).mockImplementation((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      expect(service.updateProfileWithoutScreenSet).toBeTruthy();
      await expect(
        firstValueFrom(service.updateProfileWithoutScreenSet({}))
      ).rejects.toEqual('User details not provided');
      expect(
        service['gigyaSDK'].accounts.setAccountInfo
      ).not.toHaveBeenCalled();
    });

    it('should call accounts.setAccountInfo', async () => {
      vi.spyOn(
        service['gigyaSDK'].accounts,
        'setAccountInfo'
      ).mockImplementation((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      expect(service.resetPasswordWithoutScreenSet).toBeTruthy();
      let sampleUser: User = {
        firstName: 'firstName',
        lastName: 'lastName',
        titleCode: 'mr',
      };

      await firstValueFrom(service.updateProfileWithoutScreenSet(sampleUser));
      expect(service['gigyaSDK'].accounts.setAccountInfo).toHaveBeenCalledWith({
        profile: {
          firstName: sampleUser.firstName,
          lastName: sampleUser.lastName,
        },
        callback: expect.any(Function),
      });
      expect(userProfileFacade.update).toHaveBeenCalledWith({
        firstName: sampleUser.firstName,
        lastName: sampleUser.lastName,
        titleCode: sampleUser.titleCode,
      });
    });
  });

  describe('updateUserPasswordWithoutScreenSet', () => {
    it('should not call accounts.setAccountInfo', async () => {
      vi.spyOn(
        service['gigyaSDK']?.accounts,
        'setAccountInfo'
      ).mockImplementation((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      expect(service.updateProfileWithoutScreenSet).toBeTruthy();
      await expect(
        firstValueFrom(service.updateUserPasswordWithoutScreenSet('', ''))
      ).rejects.toEqual('No passwords provided');
      expect(
        service['gigyaSDK']?.accounts.setAccountInfo
      ).not.toHaveBeenCalled();
    });

    it('should call accounts.setAccountInfo', async () => {
      vi.spyOn(
        service['gigyaSDK']?.accounts,
        'setAccountInfo'
      ).mockImplementation((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      expect(service.updateUserPasswordWithoutScreenSet).toBeTruthy();
      let oldPass = 'OldPass123!';
      let newPass = 'Password1!';

      await firstValueFrom(
        service.updateUserPasswordWithoutScreenSet(oldPass, newPass)
      );
      expect(service['gigyaSDK']?.accounts.setAccountInfo).toHaveBeenCalledWith(
        {
          password: oldPass,
          newPassword: newPass,
          callback: expect.any(Function),
        }
      );
    });

    it('should call accounts.setAccountInfo, but not throw error user in case CDC call to update password fails', async () => {
      vi.spyOn(
        service['gigyaSDK']?.accounts,
        'setAccountInfo'
      ).mockImplementation((options: { callback: Function }) => {
        options.callback({ status: 'ERROR' });
      });
      expect(service.updateUserPasswordWithoutScreenSet).toBeTruthy();
      let oldPass = 'OldPass123!';
      let newPass = 'Password1!';

      await expect(
        firstValueFrom(
          service.updateUserPasswordWithoutScreenSet(oldPass, newPass)
        )
      ).rejects.toBeDefined();
      expect(service['gigyaSDK']?.accounts.setAccountInfo).toHaveBeenCalledWith(
        {
          password: oldPass,
          newPassword: newPass,
          callback: expect.any(Function),
        }
      );
    });
  });

  describe('updateUserEmailWithoutScreenSet', () => {
    it('should not call accounts.setAccountInfo', async () => {
      vi.spyOn(
        service['gigyaSDK']?.accounts,
        'setAccountInfo'
      ).mockImplementation((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      expect(service.updateProfileWithoutScreenSet).toBeTruthy();
      await expect(
        firstValueFrom(service.updateUserEmailWithoutScreenSet('', ''))
      ).rejects.toEqual('Email or password not provided');
      expect(
        service['gigyaSDK']?.accounts.setAccountInfo
      ).not.toHaveBeenCalled();
    });

    it('should call accounts.setAccountInfo', async () => {
      vi.spyOn(
        service['gigyaSDK']?.accounts,
        'setAccountInfo'
      ).mockImplementation((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      vi.spyOn(service['gigyaSDK']?.accounts, 'login').mockImplementation(
        (options: { callback: Function }) => {
          options.callback({ status: 'OK' });
        }
      );

      expect(service.updateUserEmailWithoutScreenSet).toBeTruthy();
      let pass = 'Password123!';

      await firstValueFrom(
        service.updateUserEmailWithoutScreenSet(pass, newEmail)
      );
      expect(service['gigyaSDK']?.accounts.setAccountInfo).toHaveBeenCalledWith(
        {
          profile: {
            email: newEmail,
          },
          callback: expect.any(Function),
        }
      );
      expect(userProfileFacade.update).toHaveBeenCalledWith({
        uid: newEmail,
      });
    });

    it('should call accounts.setAccountInfo, but not logout the user in case CDC call to update email fails', () => {
      vi.spyOn(
        service['gigyaSDK']?.accounts,
        'setAccountInfo'
      ).mockImplementation((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      vi.spyOn(service['gigyaSDK']?.accounts, 'login').mockImplementation(
        (options: { callback: Function }) => {
          options.callback({ status: 'ERROR' });
        }
      );

      expect(service.updateUserEmailWithoutScreenSet).toBeTruthy();
      let pass = 'Password123!';

      service.updateUserEmailWithoutScreenSet(pass, newEmail).subscribe({
        next: () => {
          expect(
            service['gigyaSDK']?.accounts.setAccountInfo
          ).toHaveBeenCalledWith({
            profile: {
              email: newEmail,
            },
            callback: expect.any(Function),
          });
          expect(userProfileFacade.update).not.toHaveBeenCalledWith({
            uid: newEmail,
          });
          expect(authService.logout).not.toHaveBeenCalled();
          expect(service['gigyaSDK'].accounts.logout).not.toHaveBeenCalled();
        },
        error: () => {},
      });
    });
  });

  describe('getLoggedInUserEmail', () => {
    it('should return the logged in user email', () => {
      userProfileFacade.get = vi.fn().mockReturnValue(of({ uid: newEmail }));

      service['getLoggedInUserEmail']().subscribe((user: User) => {
        expect(user).toEqual({ uid: newEmail });
      });
    });

    it('should return empty if no email is obtained', () => {
      userProfileFacade.get = vi.fn().mockReturnValue(of(undefined));
      service['getLoggedInUserEmail']().subscribe((user: User) => {
        expect(user).toEqual({});
      });
      expect(userProfileFacade.get).toBeTruthy();
    });
  });

  describe('updateAddressWithoutScreenSet', () => {
    it('should not call accounts.setAccountInfo', async () => {
      vi.spyOn(
        service['gigyaSDK'].accounts,
        'setAccountInfo'
      ).mockImplementation((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      expect(service.updateProfileWithoutScreenSet).toBeTruthy();
      await expect(
        firstValueFrom(service.updateAddressWithoutScreenSet(''))
      ).rejects.toEqual('No address provided');
      expect(
        service['gigyaSDK'].accounts.setAccountInfo
      ).not.toHaveBeenCalled();
    });

    it('should call accounts.setAccountInfo', async () => {
      vi.spyOn(
        service['gigyaSDK'].accounts,
        'setAccountInfo'
      ).mockImplementation((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      expect(service.updateAddressWithoutScreenSet).toBeTruthy();
      let sampleAddress = 'Address1, address2 , US';
      await firstValueFrom(
        service.updateAddressWithoutScreenSet(sampleAddress)
      );
      expect(service['gigyaSDK'].accounts.setAccountInfo).toHaveBeenCalledWith({
        profile: {
          address: sampleAddress,
        },
        callback: expect.any(Function),
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
        response: {
          errorCode: 0,
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

    it('should update personal details and logout the user when password update has been triggered', () => {
      const response = {
        profile: {
          firstName: 'firstName',
          lastName: 'lastName',
        },
        response: {
          errorCode: 0,
        },
        screen: 'gigya-change-password-screen',
      };
      const isPasswordReset = true;
      userProfileFacade.get = vi.fn().mockReturnValue(of({ uid: newEmail }));
      vi.spyOn(service as any, 'invokeAPI').mockReturnValue(
        of({ status: 'OK' })
      );
      vi.spyOn(authService, 'logout');
      service.onProfileUpdateEventHandler(response, isPasswordReset);

      expect(authService.logout).toHaveBeenCalled();
      expect(service['invokeAPI']).toHaveBeenCalledWith('accounts.logout', {});
    });

    it('should update personal details and logout the user when response has an updated email', () => {
      const response = {
        profile: {
          firstName: 'firstName',
          lastName: 'lastName',
          email: 'email@mail.com', //email updated
        },
        response: {
          errorCode: 0,
        },
      };
      userProfileFacade.get = vi.fn().mockReturnValue(of({ uid: newEmail }));
      vi.spyOn(service as any, 'invokeAPI').mockReturnValue(
        of({ status: 'OK' })
      );
      vi.spyOn(authService, 'logout');
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
      vi.spyOn(service['subscription'], 'unsubscribe');
      service.ngOnDestroy();
      expect(service['subscription'].unsubscribe).toHaveBeenCalled();
    });
  });

  describe('getOrganizationContext', () => {
    it('should retrieve organization context', async () => {
      vi.spyOn(
        service['gigyaSDK']?.accounts.b2b,
        'getOrganizationContext'
      ).mockImplementation((options: { callback: Function }) => {
        options.callback({ status: 'OK', orgId: orgId });
      });
      const response = await firstValueFrom(service.getOrganizationContext());
      expect(response.orgId).toEqual(orgId);
      expect(
        service['gigyaSDK']?.accounts.b2b.getOrganizationContext
      ).toHaveBeenCalledWith({ callback: expect.any(Function) });
      expect(service.getOrganizationContext).toBeTruthy();
    });
  });

  describe('openDelegatedAdminLogin', () => {
    it('should open delegate admin login', () => {
      vi.spyOn(
        service['gigyaSDK'].accounts.b2b,
        'openDelegatedAdminLogin'
      ).mockReturnValue(of({}));

      service.openDelegatedAdminLogin(orgId);
      expect(
        service['gigyaSDK'].accounts.b2b.openDelegatedAdminLogin
      ).toHaveBeenCalledWith({
        orgId: orgId,
      });
      expect(service.openDelegatedAdminLogin).toBeTruthy();
    });
  });

  describe('invokeAPI', () => {
    it('should invoke valid CDC API and return response', async () => {
      vi.spyOn(
        service['gigyaSDK'].accounts,
        'setAccountInfo'
      ).mockImplementation((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      const response = await firstValueFrom(
        service['invokeAPI']('accounts.setAccountInfo', {})
      );
      expect(response).toEqual({ status: 'OK' });
    });

    it('should invoke API and return error when response status is ERROR', async () => {
      vi.spyOn(
        service['gigyaSDK'].accounts,
        'setAccountInfo'
      ).mockImplementation((options: { callback: Function }) => {
        options.callback({ status: 'ERROR' });
      });
      await expect(
        firstValueFrom(service['invokeAPI']('accounts.setAccountInfo', {}))
      ).rejects.toEqual({ status: 'ERROR' });
    });

    it('should throw an error with invalid CDC API', async () => {
      await expect(
        firstValueFrom(service['invokeAPI']('some.random.apiName', {}))
      ).rejects.toEqual('CDC API name is incorrect');
    });
  });

  describe('getSdkFunctionFromName', () => {
    it('should return a function for a valid input', () => {
      vi.spyOn(
        service['gigyaSDK'].accounts,
        'setAccountInfo'
      ).mockImplementation((options: { callback: Function }) => {
        options.callback({ status: 'ERROR' });
      });
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
      vi.spyOn(service as any, 'invokeAPI').mockReturnValue(
        of({ status: 'OK' })
      );
      vi.spyOn(authService, 'logout');
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
    it('should set cdc consents for a user', () => {
      vi.spyOn(service as any, 'invokeAPI').mockReturnValue(
        of({ status: 'OK' })
      );
      service.setUserConsentPreferences(mockUser, lang, userPreference);
      expect(service['invokeAPI']).toHaveBeenCalled();
      expect(service.setUserConsentPreferences).toBeTruthy();
    });
    it('should throw error', () => {
      vi.spyOn(service as any, 'invokeAPI').mockReturnValue(
        of({ status: 'ERROR' })
      );
      service.setUserConsentPreferences(mockUser, lang, userPreference);
      expect(service['invokeAPI']).toHaveBeenCalled();
      expect(service.setUserConsentPreferences).toBeTruthy();
      expect(service.setUserConsentPreferences).toThrow();
    });
  });

  describe('getSiteConsentDetails()', () => {
    it('fetch consents from the current site without persisting into Local Storage', () => {
      vi.spyOn(baseSiteService, 'getActive').mockReturnValue(
        of('electronics-spa')
      );
      vi.spyOn(store, 'persistCdcConsentsToStorage').mockImplementation(
        () => {}
      );
      vi.spyOn(service as any, 'invokeAPI').mockReturnValue(
        of({ status: 'OK' })
      );
      service.getSiteConsentDetails(false).subscribe(() => {
        expect(store.persistCdcConsentsToStorage).not.toHaveBeenCalled();
      });
      expect(service['invokeAPI']).toHaveBeenCalled();
      expect(service.getSiteConsentDetails).toBeTruthy();
    });
    it('fetch consents from the current site, persisting into Local Storage', () => {
      vi.spyOn(baseSiteService, 'getActive').mockReturnValue(
        of('electronics-spa')
      );
      vi.spyOn(store, 'persistCdcConsentsToStorage').mockImplementation(
        () => {}
      );
      vi.spyOn(service as any, 'invokeAPI').mockReturnValue(
        of({ status: 'OK' })
      );
      service.getSiteConsentDetails(true).subscribe(() => {
        expect(store.persistCdcConsentsToStorage).toHaveBeenCalled();
      });
      expect(service['invokeAPI']).toHaveBeenCalled();
      expect(service.getSiteConsentDetails).toBeTruthy();
    });
  });

  describe('registerOrganisationWithoutScreenSet', () => {
    it('should not call accounts.b2b.registerOrganization', async () => {
      vi.spyOn(
        service['gigyaSDK'].accounts.b2b,
        'registerOrganization'
      ).mockImplementation((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });
      expect(service.registerOrganisationWithoutScreenSet).toBeTruthy();
      const wrongOrgInfo: OrganizationUserRegistrationForm = {
        companyName: '',
        email: '',
        firstName: '',
        lastName: '',
      };
      await expect(
        firstValueFrom(
          service.registerOrganisationWithoutScreenSet(wrongOrgInfo)
        )
      ).rejects.toEqual('Organization details not provided');
      expect(
        service['gigyaSDK'].accounts.b2b.registerOrganization
      ).not.toHaveBeenCalled();
    });

    it('should call accounts.b2b.registerOrganization', async () => {
      vi.spyOn(
        service['gigyaSDK'].accounts.b2b,
        'registerOrganization'
      ).mockImplementation((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });

      expect(service.registerOrganisationWithoutScreenSet).toBeTruthy();
      const correctOrgInfo: OrganizationUserRegistrationForm = {
        companyName: 'ABC',
        email: 'abc@mail.com',
        firstName: 'A',
        lastName: 'User',
        addressLine1: 'Line 1',
        addressLine2: 'Line 2',
        postalCode: '12312',
        town: 'town',
        region: 'region',
        country: 'India',
        phoneNumber: '+911234567890',
        message: 'department: Dept;\nposition: Pos',
      };

      await firstValueFrom(
        service.registerOrganisationWithoutScreenSet(correctOrgInfo)
      );
      expect(
        service['gigyaSDK'].accounts.b2b.registerOrganization
      ).toHaveBeenCalledWith({
        organization: {
          name: correctOrgInfo.companyName,
          street_address:
            correctOrgInfo.addressLine1 + ' ' + correctOrgInfo.addressLine2,
          city: correctOrgInfo.town,
          state: correctOrgInfo.region,
          zip_code: correctOrgInfo.postalCode,
          country: correctOrgInfo.country,
        },
        requester: {
          firstName: correctOrgInfo.firstName,
          lastName: correctOrgInfo.lastName,
          email: correctOrgInfo.email,
          phone: correctOrgInfo.phoneNumber,
          department: 'Dept',
          jobFunction: 'Pos',
        },
        regSource: 'https://spartacus.cx',
        callback: expect.any(Function),
      });
    });

    it('should call accounts.b2b.registerOrganization and not pass phone number if empty', async () => {
      vi.spyOn(
        service['gigyaSDK'].accounts.b2b,
        'registerOrganization'
      ).mockImplementation((options: { callback: Function }) => {
        options.callback({ status: 'OK' });
      });

      expect(service.registerOrganisationWithoutScreenSet).toBeTruthy();
      const correctOrgInfo: OrganizationUserRegistrationForm = {
        companyName: 'ABC',
        email: 'abc@mail.com',
        firstName: 'A',
        lastName: 'User',
        addressLine1: 'Line 1',
        addressLine2: 'Line 2',
        postalCode: '12312',
        town: 'town',
        region: 'region',
        country: 'India',
        phoneNumber: '',
        message: 'department: Dept;\nposition: Pos',
      };

      await firstValueFrom(
        service.registerOrganisationWithoutScreenSet(correctOrgInfo)
      );
      expect(
        service['gigyaSDK'].accounts.b2b.registerOrganization
      ).toHaveBeenCalledWith({
        organization: {
          name: correctOrgInfo.companyName,
          street_address:
            correctOrgInfo.addressLine1 + ' ' + correctOrgInfo.addressLine2,
          city: correctOrgInfo.town,
          state: correctOrgInfo.region,
          zip_code: correctOrgInfo.postalCode,
          country: correctOrgInfo.country,
        },
        requester: {
          firstName: correctOrgInfo.firstName,
          lastName: correctOrgInfo.lastName,
          email: correctOrgInfo.email,
          department: 'Dept',
          jobFunction: 'Pos',
        },
        regSource: 'https://spartacus.cx',
        callback: expect.any(Function),
      });
    });
  });
});
