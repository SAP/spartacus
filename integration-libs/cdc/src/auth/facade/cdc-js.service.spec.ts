import { TestBed } from '@angular/core/testing';
import {
  AuthService,
  BaseSiteService,
  ExternalJsFileLoader,
  LanguageService,
  User,
  UserService,
  WindowRef,
} from '@spartacus/core';
import { Observable, of, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CdcConfig } from '../../config';
import { CdcAuthService } from './cdc-auth.service';
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

class BaseSiteServiceStub implements Partial<BaseSiteService> {
  getActive(): Observable<string> {
    return of();
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

class ExternalJsFileLoaderMock {
  public addScript(
    _src: string,
    _params?: Object,
    _attributes?: Object,
    _callback?: EventListener
  ): void {}
}

class MockCdcAuthService implements Partial<CdcAuthService> {
  loginWithCustomCdcFlow(): void {}
}

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of();
  }
}

class MockUserService implements Partial<UserService> {
  updatePersonalDetails(_userDetails: User): void {}
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

describe('CdcJsService', () => {
  let service: CdcJsService;
  let baseSiteService: BaseSiteService;
  let languageService: LanguageService;
  let externalJsFileLoader: ExternalJsFileLoader;
  let cdcAuth: CdcAuthService;
  let userService: UserService;
  let winRef: WindowRef;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CdcConfig, useValue: sampleCdcConfig },
        { provide: BaseSiteService, useClass: BaseSiteServiceStub },
        { provide: LanguageService, useClass: LanguageServiceStub },
        { provide: ExternalJsFileLoader, useClass: ExternalJsFileLoaderMock },
        { provide: CdcAuthService, useClass: MockCdcAuthService },
        { provide: UserService, useClass: MockUserService },
        { provide: WindowRef, useValue: mockedWindowRef },
        { provide: Subscription, useValue: MockSubscription },
        { provide: AuthService, useClass: MockAuthService },
      ],
    });

    service = TestBed.inject(CdcJsService);
    baseSiteService = TestBed.inject(BaseSiteService);
    languageService = TestBed.inject(LanguageService);
    externalJsFileLoader = TestBed.inject(ExternalJsFileLoader);
    cdcAuth = TestBed.inject(CdcAuthService);
    userService = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    winRef = TestBed.inject(WindowRef);
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
    it('should return CDC script loading state', () => {
      spyOn(externalJsFileLoader, 'addScript').and.callFake(
        (_a, _b, _c, loadCb) => {
          loadCb({} as Event);
        }
      );

      service
        .didLoad()
        .pipe(take(1))
        .subscribe((val) => expect(val).toBe(false));

      service.loadCdcJavascript();

      service
        .didLoad()
        .pipe(take(1))
        .subscribe((val) => expect(val).toBe(false));
    });
  });

  describe('didScriptFailToLoad', () => {
    it('should return CDC script loading error state', () => {
      spyOn(externalJsFileLoader, 'addScript').and.callFake(
        (_a, _b, _c, _d, errorCb) => {
          errorCb({} as Event);
        }
      );

      service
        .didScriptFailToLoad()
        .pipe(take(1))
        .subscribe((val) => expect(val).toBe(false));

      service.loadCdcJavascript();

      service
        .didScriptFailToLoad()
        .pipe(take(1))
        .subscribe((val) => expect(val).toBe(false));
    });
  });

  describe('loadCdcScript', () => {
    it('should load CDC script', () => {
      const site = 'electronics-spa';
      const language = 'en';

      spyOn(externalJsFileLoader, 'addScript');
      spyOn(baseSiteService, 'getActive').and.returnValue(of(site));
      spyOn(languageService, 'getActive').and.returnValue(of(language));

      service.loadCdcJavascript();

      expect(externalJsFileLoader.addScript).toHaveBeenCalledWith(
        'sample-url&lang=en',
        undefined,
        { type: 'text/javascript', async: true, defer: true },
        jasmine.any(Function),
        jasmine.any(Function)
      );
      expect(winRef.nativeWindow['__gigyaConf']).toEqual({
        include: 'id_token',
      });
    });

    it('should not load CDC script if it is not configured', () => {
      const site = 'electronics';
      const language = 'en';

      spyOn(externalJsFileLoader, 'addScript');
      spyOn(baseSiteService, 'getActive').and.returnValue(of(site));
      spyOn(languageService, 'getActive').and.returnValue(of(language));

      service.initialize();

      expect(externalJsFileLoader.addScript).not.toHaveBeenCalled();
    });
  });

  describe('registerEventListeners', () => {
    it('should register event listeners and remove message and redirect on loading the token', () => {
      const site = 'electronics-spa';
      const language = 'en';

      spyOn(externalJsFileLoader, 'addScript').and.callFake(() => {
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

      service.onLoginEventHandler('electronics-spa', response);

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

      service.onLoginEventHandler('electronics-spa');

      expect(cdcAuth.loginWithCustomCdcFlow).not.toHaveBeenCalled();
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
