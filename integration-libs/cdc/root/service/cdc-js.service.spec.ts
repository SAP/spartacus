import { TestBed } from '@angular/core/testing';
import {
  AuthService,
  BaseSiteService,
  LanguageService,
  ScriptLoader,
  WindowRef,
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
    return of();
  }
}

class MockUserProfileFacade implements Partial<UserProfileFacade> {
  update = createSpy().and.returnValue(of(undefined));
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
  let scriptLoader: ScriptLoader;
  let userProfileFacade: UserProfileFacade;
  let cdcAuth: CdcAuthFacade;
  let winRef: WindowRef;
  let authService: AuthService;

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
