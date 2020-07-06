import { TestBed } from '@angular/core/testing';
import {
  AuthRedirectService,
  BaseSiteService,
  ExternalJsFileLoader,
  GlobalMessageService,
  GlobalMessageType,
  LanguageService,
  OCC_USER_ID_CURRENT,
  User,
  UserService,
  UserToken,
  WindowRef,
} from '@spartacus/core';
import { Observable, of, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { GigyaAuthService } from '../../../auth/facade/gigya-auth.service';
import { GigyaConfig } from '../../../config';
import { GigyaJsService } from './gigya-js.service';

const sampleGigyaConfig: GigyaConfig = {
  gigya: [
    {
      baseSite: 'electronics-spa',
      javascriptUrl: 'sample-url',
      sessionExpiration: 120,
    },
  ],
};

const mockToken = {
  userId: 'user@sap.com',
  refresh_token: 'foo',
  access_token: 'testToken-access-token',
} as UserToken;

class BaseSiteServiceStub {
  getActive(): Observable<string> {
    return of();
  }
}
class LanguageServiceStub {
  getActive(): Observable<string> {
    return of();
  }
}

declare var window: Window;

interface Window {
  gigya?: any;
}

class ExternalJsFileLoaderMock {
  public load(
    _src: string,
    _params?: Object,
    _callback?: EventListener
  ): void {}
}

class MockGigyaAuthService {
  authorizeWithCustomGigyaFlow(): void {}

  getUserToken(): Observable<UserToken> {
    return of();
  }
}

class MockUserService {
  updatePersonalDetails(_userDetails: User): void {}
}

class MockAuthRedirectService {
  redirect() {}
}

class MockGlobalMessageService {
  remove(_type: GlobalMessageType, _index?: number) {}
}

class MockSubscription {
  unsubscribe() {}

  add() {}
}

const gigya = {
  accounts: {
    addEventHandlers: () => {},
  },
};

const mockedWindowRef = {
  nativeWindow: {
    gigya: gigya,
  },
};

describe('GigyaJsService', () => {
  let service: GigyaJsService;
  let baseSiteService: BaseSiteService;
  let languageService: LanguageService;
  let externalJsFileLoader: ExternalJsFileLoader;
  let auth: GigyaAuthService;
  let globalMessageService: GlobalMessageService;
  let authRedirectService: AuthRedirectService;
  let userService: UserService;
  let winRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: GigyaConfig, useValue: sampleGigyaConfig },
        { provide: BaseSiteService, useClass: BaseSiteServiceStub },
        { provide: LanguageService, useClass: LanguageServiceStub },
        { provide: ExternalJsFileLoader, useClass: ExternalJsFileLoaderMock },
        { provide: GigyaAuthService, useClass: MockGigyaAuthService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: AuthRedirectService, useClass: MockAuthRedirectService },
        { provide: ExternalJsFileLoader, useClass: ExternalJsFileLoaderMock },
        { provide: UserService, useClass: MockUserService },
        { provide: WindowRef, useValue: mockedWindowRef },
        { provide: Subscription, useValue: MockSubscription },
      ],
    });

    service = TestBed.inject(GigyaJsService);
    baseSiteService = TestBed.inject(BaseSiteService);
    languageService = TestBed.inject(LanguageService);
    externalJsFileLoader = TestBed.inject(ExternalJsFileLoader);
    auth = TestBed.inject(GigyaAuthService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    authRedirectService = TestBed.inject(AuthRedirectService);
    userService = TestBed.inject(UserService);
    winRef = TestBed.inject(WindowRef);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('initialize', () => {
    it('should load the gigya script', () => {
      spyOn(service, 'loadGigyaJavascript').and.stub();

      service.initialize();

      expect(service.loadGigyaJavascript).toHaveBeenCalled();
    });
  });

  describe('didLoad', () => {
    it('should return gigya script loading state', () => {
      spyOn(externalJsFileLoader, 'load').and.callFake((_a, _b, loadCb) => {
        loadCb({} as Event);
      });

      service
        .didLoad()
        .pipe(take(1))
        .subscribe((val) => expect(val).toBe(false));

      service.loadGigyaJavascript();

      service
        .didLoad()
        .pipe(take(1))
        .subscribe((val) => expect(val).toBe(false));
    });
  });

  describe('didScriptFailToLoad', () => {
    it('should return gigya script loading error state', () => {
      spyOn(externalJsFileLoader, 'load').and.callFake(
        (_a, _b, _c, errorCb) => {
          errorCb({} as Event);
        }
      );

      service
        .didScriptFailToLoad()
        .pipe(take(1))
        .subscribe((val) => expect(val).toBe(false));

      service.loadGigyaJavascript();

      service
        .didScriptFailToLoad()
        .pipe(take(1))
        .subscribe((val) => expect(val).toBe(false));
    });
  });

  describe('loadGigyaScript', () => {
    it('should load gigya script', () => {
      const site = 'electronics-spa';
      const language = 'en';

      spyOn(externalJsFileLoader, 'load');
      spyOn(baseSiteService, 'getActive').and.returnValue(of(site));
      spyOn(languageService, 'getActive').and.returnValue(of(language));

      service.loadGigyaJavascript();

      expect(externalJsFileLoader.load).toHaveBeenCalledWith(
        'sample-url&lang=en',
        undefined,
        jasmine.any(Function),
        jasmine.any(Function)
      );
      expect(winRef.nativeWindow['__gigyaConf']).toEqual({
        include: 'id_token',
      });
    });

    it('should not load gigya script if it is not configured', () => {
      const site = 'electronics';
      const language = 'en';

      spyOn(externalJsFileLoader, 'load');
      spyOn(baseSiteService, 'getActive').and.returnValue(of(site));
      spyOn(languageService, 'getActive').and.returnValue(of(language));

      service.initialize();

      expect(externalJsFileLoader.load).not.toHaveBeenCalled();
    });
  });

  describe('registerEventListeners', () => {
    it('should register event listeners and remove message and redirect on loading the token', () => {
      const site = 'electronics-spa';
      const language = 'en';

      spyOn(externalJsFileLoader, 'load').and.callFake(() => {
        service['registerEventListeners']('electronics-spa');
      });
      spyOn(baseSiteService, 'getActive').and.returnValue(of(site));
      spyOn(languageService, 'getActive').and.returnValue(of(language));
      spyOn(authRedirectService, 'redirect');
      spyOn(globalMessageService, 'remove');

      const testToken = { ...mockToken, userId: OCC_USER_ID_CURRENT };
      spyOn(auth, 'getUserToken').and.returnValue(of(testToken));
      spyOn(service as any, 'addGigyaEventHandlers').and.stub();

      service.loadGigyaJavascript();

      expect(service['addGigyaEventHandlers']).toHaveBeenCalledWith(
        'electronics-spa'
      );
      expect(globalMessageService.remove).toHaveBeenCalledWith(
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(authRedirectService.redirect).toHaveBeenCalled();
    });
  });

  describe('addGigyaEventHandlers', () => {
    it('should add event handlers for gigya login', () => {
      spyOn(winRef.nativeWindow['gigya'].accounts, 'addEventHandlers');

      service['addGigyaEventHandlers']('electronics-spa');

      expect(
        winRef.nativeWindow['gigya'].accounts.addEventHandlers
      ).toHaveBeenCalledWith({ onLogin: jasmine.any(Function) });
    });
  });

  describe('onLoginEventHandler', () => {
    it('should login user when on login event is triggered', () => {
      spyOn(auth, 'authorizeWithCustomGigyaFlow');

      const response = {
        UID: 'UID',
        UIDSignature: 'UIDSignature',
        signatureTimestamp: 'signatureTimestamp',
        id_token: 'id_token',
      };

      service.onLoginEventHandler('electronics-spa', response);

      expect(auth.authorizeWithCustomGigyaFlow).toHaveBeenCalledWith(
        response.UID,
        response.UIDSignature,
        response.signatureTimestamp,
        response.id_token,
        'electronics-spa'
      );
    });

    it('should not login user when on login event have empty payload', () => {
      spyOn(auth, 'authorizeWithCustomGigyaFlow');

      service.onLoginEventHandler('electronics-spa');

      expect(auth.authorizeWithCustomGigyaFlow).not.toHaveBeenCalled();
    });
  });

  describe('onProfileUpdateEventHandler', () => {
    it('should update personal details when response have data', () => {
      spyOn(userService, 'updatePersonalDetails');
      const response = {
        profile: {
          firstName: 'firstName',
          lastName: 'lastName',
        },
      };

      service.onProfileUpdateEventHandler(response);

      expect(userService.updatePersonalDetails).toHaveBeenCalledWith({
        firstName: response.profile.firstName,
        lastName: response.profile.lastName,
      });
    });

    it('should not update personal details when response is empty', () => {
      spyOn(userService, 'updatePersonalDetails');

      service.onProfileUpdateEventHandler();

      expect(userService.updatePersonalDetails).not.toHaveBeenCalled();
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
