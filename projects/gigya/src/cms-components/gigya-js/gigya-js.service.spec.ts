import { TestBed } from '@angular/core/testing';
import { GigyaConfig } from '../../config';
import {
  BaseSiteService,
  LanguageService,
  ExternalJsFileLoader,
  GlobalMessageService,
  AuthRedirectService,
  UserService,
  UserToken,
  GlobalMessageType,
  User,
  OCC_USER_ID_CURRENT,
  WindowRef,
} from '@spartacus/core';
import { Observable, of, Subscription } from 'rxjs';
import { GigyaJsService } from './gigya-js.service';
import { GigyaAuthService } from '../../auth/facade/gigya-auth.service';

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
  let externalJsFileLoaderMock: ExternalJsFileLoader;
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
      ],
    });

    service = TestBed.inject(GigyaJsService);
    baseSiteService = TestBed.inject(BaseSiteService);
    languageService = TestBed.inject(LanguageService);
    externalJsFileLoaderMock = TestBed.inject(ExternalJsFileLoader);
    auth = TestBed.inject(GigyaAuthService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    authRedirectService = TestBed.inject(AuthRedirectService);
    userService = TestBed.inject(UserService);
    winRef = TestBed.inject(WindowRef);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should load gigya script', () => {
    const site = 'electronics-spa';
    const language = 'en';

    spyOn(externalJsFileLoaderMock, 'load');
    spyOn(baseSiteService, 'getActive').and.returnValue(of(site));
    spyOn(languageService, 'getActive').and.returnValue(of(language));

    service.loadGigyaJavascript();

    expect(externalJsFileLoaderMock.load).toHaveBeenCalledTimes(1);
  });

  it('should load gigya script on initializing the service and redirect on loading the token', () => {
    const site = 'electronics-spa';
    const language = 'en';

    spyOn(externalJsFileLoaderMock, 'load');
    spyOn(baseSiteService, 'getActive').and.returnValue(of(site));
    spyOn(languageService, 'getActive').and.returnValue(of(language));
    spyOn(authRedirectService, 'redirect');
    spyOn(globalMessageService, 'remove');

    const testToken = { ...mockToken, userId: OCC_USER_ID_CURRENT };
    spyOn(auth, 'getUserToken').and.returnValue(of(testToken));

    service.initialize();

    expect(externalJsFileLoaderMock.load).toHaveBeenCalledTimes(1);
    expect(globalMessageService.remove).toHaveBeenCalledTimes(1);
    expect(authRedirectService.redirect).toHaveBeenCalledTimes(1);
  });

  it('should load gigya script as empty for missing configuration', () => {
    const site = '';
    const language = 'en';

    spyOn(externalJsFileLoaderMock, 'load');
    spyOn(baseSiteService, 'getActive').and.returnValue(of(site));
    spyOn(languageService, 'getActive').and.returnValue(of(language));

    service.initialize();

    expect(externalJsFileLoaderMock.load).toHaveBeenCalledTimes(1);
  });

  it('should return script load state', () => {
    const result = service.isLoaded();

    expect(result).toBeDefined();
  });

  it('should register event handlers for gigya login', () => {
    window.gigya = {};
    spyOn(service, 'addGigyaEventHandlers');

    service.registerEventListeners();

    expect(service.addGigyaEventHandlers).toHaveBeenCalledTimes(1);
  });

  it('should add event handlers for gigya login', () => {
    spyOn(winRef.nativeWindow['gigya'].accounts, 'addEventHandlers');

    service.addGigyaEventHandlers();

    expect(
      winRef.nativeWindow['gigya'].accounts.addEventHandlers
    ).toHaveBeenCalledTimes(1);
  });

  it('should update personal details', () => {
    spyOn(userService, 'updatePersonalDetails');
    const response: any = {
      profile: {
        firstName: 'firstName',
        lastName: 'lastName',
      },
    };

    service.onProfileUpdateEventHandler(response);

    expect(userService.updatePersonalDetails).toHaveBeenCalledTimes(1);
  });

  it('should not update personal details', () => {
    spyOn(userService, 'updatePersonalDetails');
    const response: any = undefined;

    service.onProfileUpdateEventHandler(response);

    expect(userService.updatePersonalDetails).toHaveBeenCalledTimes(0);
  });

  it('should login user when on login event is triggered', () => {
    spyOn(auth, 'authorizeWithCustomGigyaFlow');

    const testToken = { ...mockToken, userId: OCC_USER_ID_CURRENT };
    spyOn(auth, 'getUserToken').and.returnValue(of(testToken));

    const response: any = {
      UID: 'UID',
      UIDSignature: 'UIDSignature',
      signatureTimestamp: 'signatureTimestamp',
      id_token: 'id_token',
    };

    service.onLoginEventHandler(response);

    expect(auth.authorizeWithCustomGigyaFlow).toHaveBeenCalledTimes(1);
  });

  it('should not login user when on login event is triggered', () => {
    spyOn(auth, 'authorizeWithCustomGigyaFlow');

    spyOn(auth, 'getUserToken').and.returnValue(of());
    spyOn(baseSiteService,'getActive').and.returnValue(of('sameplSite'));

    const response: any = {
      UID: 'UID',
      UIDSignature: 'UIDSignature',
      signatureTimestamp: 'signatureTimestamp',
      id_token: 'id_token',
    };

    service.onLoginEventHandler(response);

    expect(auth.authorizeWithCustomGigyaFlow).toHaveBeenCalledTimes(1);
  });

  it('should not login user when on login event is not triggered', () => {
    spyOn(auth, 'authorizeWithCustomGigyaFlow');

    spyOn(auth, 'getUserToken').and.returnValue(of());

    service.onLoginEventHandler(undefined);

    expect(auth.authorizeWithCustomGigyaFlow).toHaveBeenCalledTimes(0);
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    service.subscription = new Subscription();
    spyOn(service.subscription, 'unsubscribe');
    service.ngOnDestroy();
    expect(service.subscription.unsubscribe).toHaveBeenCalled();
  });

  it('should not unsubscribe from any subscriptions when they are undefined when destroyed', () => {
    service.subscription = undefined;
    service.ngOnDestroy();
    expect(service.subscription).toBeUndefined();
  });
});
