import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GigyaRaasComponentData } from '@spartacus/cdc/core';
import { CdcConfig, CdcJsService } from '@spartacus/cdc/root';
import {
  AuthRedirectService,
  AuthService,
  BaseSiteService,
  CmsComponent,
  LanguageService,
  MockTranslatePipe,
  RoutingService,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { GigyaRaasComponent } from './gigya-raas.component';

declare var window: Window;

interface Window {
  gigya?: any;
}

const sampleCdcConfig: CdcConfig = {
  cdc: [
    {
      baseSite: 'electronics-spa',
      javascriptUrl: 'sample-url',
      sessionExpiration: 120,
    },
  ],
};

const sampleComponentData: GigyaRaasComponentData = {
  uid: 'uid',
  name: 'name',
  screenSet: 'screenSet',
  profileEdit: 'profileEdit',
  embed: 'embed',
  startScreen: 'startScreen',
  containerID: 'containerID',
  linkText: 'linkText',
  advancedConfiguration: 'advancedConfiguration',
};

const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
  data$: of(sampleComponentData),
  uid: 'test',
};

const defaultLang = 'en';
const defaultSite = 'electronics-spa';

class BaseSiteServiceStub {
  getActive(): Observable<string> {
    return of(defaultSite);
  }
}

class CdcJsServiceStub {
  didLoad(): Observable<boolean> {
    return of(true);
  }
  didScriptFailToLoad(): Observable<boolean> {
    return of(false);
  }
}

class LanguageServiceStub {
  getActive(): Observable<string> {
    return of(defaultLang);
  }
}

class MockAuthRedirectService {
  saveCurrentNavigationUrl() {}
}
class MockRoutingService {
  go() {}
}
class MockAuthService {
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
}

describe('GigyaRaasComponent', () => {
  let component: GigyaRaasComponent;
  let fixture: ComponentFixture<GigyaRaasComponent>;
  let baseSiteService: BaseSiteService;
  let cdcJsService: CdcJsService;
  let authService: AuthService;
  let routingService: RoutingService;
  let authRedirectService: AuthRedirectService;
  let langService: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GigyaRaasComponent, MockTranslatePipe],
      providers: [
        { provide: CdcConfig, useValue: sampleCdcConfig },
        { provide: CmsComponentData, useValue: MockCmsComponentData },
        { provide: BaseSiteService, useClass: BaseSiteServiceStub },
        { provide: CdcJsService, useClass: CdcJsServiceStub },
        { provide: LanguageService, useClass: LanguageServiceStub },
        { provide: AuthService, useClass: MockAuthService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: AuthRedirectService, useClass: MockAuthRedirectService },
      ],
    });
    baseSiteService = TestBed.inject(BaseSiteService);
    authService = TestBed.inject(AuthService);
    routingService = TestBed.inject(RoutingService);
    authRedirectService = TestBed.inject(AuthRedirectService);
    cdcJsService = TestBed.inject(CdcJsService);
    langService = TestBed.inject(LanguageService);
    fixture = TestBed.createComponent(GigyaRaasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('displayInEmbedMode', () => {
    it('should return true when embed and containerId are set', () => {
      const sampleData: GigyaRaasComponentData = {
        embed: 'true',
        containerID: 'containerID',
      };

      expect(component.displayInEmbedMode(sampleData)).toBeTrue();
    });

    it('should return false when containerId is not set', () => {
      const sampleData: GigyaRaasComponentData = {
        embed: 'true',
        containerID: '',
      };

      expect(component.displayInEmbedMode(sampleData)).toBeFalse();
    });

    it('should return false when embed is false', () => {
      const sampleData: GigyaRaasComponentData = {
        embed: 'false',
        containerID: 'containerID',
      };

      expect(component.displayInEmbedMode(sampleData)).toBeFalse();
    });
  });

  describe('showScreenSet', () => {
    beforeEach(() => {
      window.gigya = {
        accounts: {
          showScreenSet: () => {},
        },
      };
      spyOn(window.gigya.accounts, 'showScreenSet');
    });

    it('should invoke displayScreenSet', () => {
      component.displayScreenSet(sampleComponentData, 'en');
      expect(window.gigya.accounts.showScreenSet).toHaveBeenCalledWith({
        screenSet: 'screenSet',
        startScreen: 'startScreen',
        lang: 'en',
        sessionExpiration: 120,
      });
    });

    it('should show login embed according to component data', () => {
      component.showScreenSet(
        {
          ...sampleComponentData,
          profileEdit: '',
          embed: 'true',
        },
        defaultLang
      );
      expect(window.gigya.accounts.showScreenSet).toHaveBeenCalledWith({
        screenSet: 'screenSet',
        startScreen: 'startScreen',
        lang: 'en',
        containerID: 'containerID',
        sessionExpiration: 120,
      });
    });

    it('should show profile update embed according to component data', () => {
      component.showScreenSet(
        {
          ...sampleComponentData,
          profileEdit: 'true',
          embed: 'true',
        },
        defaultLang
      );
      expect(window.gigya.accounts.showScreenSet).toHaveBeenCalledWith({
        screenSet: 'screenSet',
        startScreen: 'startScreen',
        lang: 'en',
        containerID: 'containerID',
        onAfterSubmit: jasmine.any(Function),
      });
    });

    it('should show login link according to component data', () => {
      spyOn(baseSiteService, 'getActive').and.callFake(() => of('electronics'));
      component.showScreenSet(
        {
          ...sampleComponentData,
          containerID: '',
          embed: 'false',
          profileEdit: '',
        },
        defaultLang
      );
      expect(window.gigya.accounts.showScreenSet).toHaveBeenCalledWith({
        screenSet: 'screenSet',
        startScreen: 'startScreen',
        lang: 'en',
        sessionExpiration: 3600,
      });
    });

    it('should show profile update link according to component data', () => {
      component.showScreenSet(
        {
          ...sampleComponentData,
          containerID: '',
          embed: 'false',
          profileEdit: 'true',
        },
        defaultLang
      );
      expect(window.gigya.accounts.showScreenSet).toHaveBeenCalledWith({
        screenSet: 'screenSet',
        startScreen: 'startScreen',
        lang: 'en',
        onAfterSubmit: jasmine.any(Function),
      });
    });
  });

  it('should not render anything if script is not loaded', () => {
    spyOn(cdcJsService, 'didLoad').and.callFake(() => of(false));
    component.ngOnInit();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.popup-link'))).toBeFalsy();
  });

  it('should render error message if script failed to load', () => {
    spyOn(cdcJsService, 'didLoad').and.callFake(() => of(false));
    spyOn(cdcJsService, 'didScriptFailToLoad').and.callFake(() => of(true));
    component.ngOnInit();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.js-error'))).toBeTruthy();
  });

  describe('canActivate()', () => {
    it('should return true if showAnonymous is true and user is not logged in', (done) => {
      const mockData: GigyaRaasComponentData = {
        showAnonymous: 'true',
      };
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
      spyOn(authRedirectService, 'saveCurrentNavigationUrl').and.callThrough();
      spyOn(routingService, 'go').and.callThrough();
      component.canActivate(mockData).subscribe((canActivate) => {
        expect(canActivate).toEqual(true);
        expect(routingService.go).not.toHaveBeenCalled();
        expect(
          authRedirectService.saveCurrentNavigationUrl
        ).not.toHaveBeenCalled();
        done();
      });
    });
    it('should return true if showLoggedIn is true and user is logged in', (done) => {
      const mockData: GigyaRaasComponentData = {
        showLoggedIn: 'true',
      };
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
      spyOn(authRedirectService, 'saveCurrentNavigationUrl').and.callThrough();
      spyOn(routingService, 'go').and.callThrough();
      component.canActivate(mockData).subscribe((canActivate) => {
        expect(canActivate).toEqual(true);
        expect(routingService.go).not.toHaveBeenCalled();
        expect(
          authRedirectService.saveCurrentNavigationUrl
        ).not.toHaveBeenCalled();
        done();
      });
    });
    it('should navigate to login page if showAnonymous is false and user is not logged in', (done) => {
      const mockData: GigyaRaasComponentData = {
        showAnonymous: 'false',
      };
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
      spyOn(authRedirectService, 'saveCurrentNavigationUrl').and.callThrough();
      spyOn(routingService, 'go').and.callThrough();
      component.canActivate(mockData).subscribe((canActivate) => {
        expect(canActivate).toEqual(false);
        expect(authRedirectService.saveCurrentNavigationUrl).toHaveBeenCalled();
        expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
        done();
      });
    });
    it('should navigate to home page if showLoggedIn is false and user is logged in', (done) => {
      const mockData: GigyaRaasComponentData = {
        showLoggedIn: 'false',
      };
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
      spyOn(authRedirectService, 'saveCurrentNavigationUrl').and.callThrough();
      spyOn(routingService, 'go').and.callThrough();

      component.canActivate(mockData).subscribe((canActivate) => {
        expect(canActivate).toEqual(false);
        expect(
          authRedirectService.saveCurrentNavigationUrl
        ).not.toHaveBeenCalled();
        expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
        done();
      });
    });
  });

  it('should not render anything if canActivate is false', () => {
    spyOn(cdcJsService, 'didLoad').and.callThrough();
    spyOn(cdcJsService, 'didScriptFailToLoad').and.callThrough();
    spyOn(langService, 'getActive').and.returnValue(of('en'));
    spyOn(component, 'canActivate').and.returnValue(of(false));
    component.component = { uid: 'xcv', data$: of({}) };
    component.ngOnInit();
    fixture.detectChanges();
    expect(cdcJsService.didLoad).not.toHaveBeenCalled();
    expect(cdcJsService.didScriptFailToLoad).not.toHaveBeenCalled();
    expect(langService.getActive).not.toHaveBeenCalled();
  });
});
