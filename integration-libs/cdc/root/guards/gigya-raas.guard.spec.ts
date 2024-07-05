import { TestBed } from '@angular/core/testing';
import {
  RoutingService,
  CmsService,
  AuthService,
  AuthRedirectService,
  SemanticPathService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { GigyaRaasGuard } from './gigya-raas.guard';
import { Router, UrlTree } from '@angular/router';

const mock1 = {
  name: 'Gigya XYZ page',
  type: 'ContentPage',
  label: '/abc/xyz',
  template: 'AccountPageTemplate',
  pageId: 'xyz',
  title: 'XYZ Details',
  slots: {
    BodyContent: {
      components: [
        {
          uid: 'GigyaRaasComponentForXYZ',
          typeCode: 'GigyaRaasComponent',
          flexType: 'GigyaRaasComponent',
        },
        {
          uid: 'GigyaRaasComponentForABC',
          typeCode: 'GigyaRaasComponent',
          flexType: 'GigyaRaasComponent',
        },
      ],
    },
    SideContent: {},
    NavigationBar: {
      components: [
        {
          uid: 'ElectronicsCategoryNavComponent',
          typeCode: 'CategoryNavigationComponent',
          flexType: 'CategoryNavigationComponent',
        },
        {
          uid: 'GigyaRaasComponentForXYZ',
          typeCode: 'GigyaRaasComponent',
          flexType: 'GigyaRaasComponent',
        },
      ],
    },
  },
};
const mock2 = {
  name: 'Gigya XYZ page',
  type: 'ContentPage',
  label: '/abc/xyz',
  template: 'AccountPageTemplate',
  pageId: 'xyz',
  title: 'XYZ Details',
  slots: {
    NavigationBar: {
      components: [
        {
          uid: 'ElectronicsCategoryNavComponent',
          typeCode: 'CategoryNavigationComponent',
          flexType: 'CategoryNavigationComponent',
        },
      ],
    },
  },
};
const mock3 = {
  name: 'Gigya XYZ page',
  type: 'ContentPage',
  label: '/abc/xyz',
  template: 'AccountPageTemplate',
  pageId: 'xyz',
  title: 'XYZ Details',
  slots: {
    BodyContent: {
      components: [
        {
          uid: 'GigyaRaasComponentForXYZ',
          typeCode: 'GigyaRaasComponent',
          flexType: 'GigyaRaasComponent',
        },
      ],
    },
  },
};

const data1 = {
  uid: 'GigyaRaasComponentForXYZ',
  typeCode: 'GigyaRaasComponent',
  showAnonymous: 'true',
  showLoggedIn: 'false',
};

const data2 = {
  uid: 'GigyaRaasComponentForLogin',
  typeCode: 'GigyaRaasComponent',
  showAnonymous: 'false',
  showLoggedIn: 'true',
};

class MockRoutingService {
  getNextPageContext(): Observable<any> {
    return of({
      id: '/abc/xyz',
      type: 'ContentPage',
    });
  }
}
class MockCmsService {
  getPage(): Observable<any> {
    return of({});
  }
  getComponentData(): Observable<any[]> {
    return of([]);
  }
}
class MockAuthService {
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
}

class MockSemanticPathService {
  get(): any {
    return {};
  }
}
class MockAuthRedirectService {
  saveCurrentNavigationUrl() {}
}
class MockRouter implements Partial<Router> {
  parseUrl(_url: string): UrlTree {
    return { root: 'test-url' } as any;
  }
}

describe('GigyaRaasGuard', () => {
  let guard: GigyaRaasGuard;
  let routingService: RoutingService;
  let cmsService: CmsService;
  let authService: AuthService;
  let authRedirectService: AuthRedirectService;
  let router: Router;
  let semanticPathService: SemanticPathService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CmsService, useClass: MockCmsService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
        { provide: AuthRedirectService, useClass: MockAuthRedirectService },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
      ],
    });
    guard = TestBed.inject(GigyaRaasGuard);
    routingService = TestBed.inject(RoutingService);
    cmsService = TestBed.inject(CmsService);
    authService = TestBed.inject(AuthService);
    authRedirectService = TestBed.inject(AuthRedirectService);
    router = TestBed.inject(Router);
    semanticPathService = TestBed.inject(SemanticPathService);
    spyOn(routingService, 'getNextPageContext').and.callThrough();
    spyOn(authRedirectService, 'saveCurrentNavigationUrl').and.callThrough();
    spyOn(semanticPathService, 'get')
      .withArgs('login')
      .and.returnValue('/go/login')
      .withArgs('home')
      .and.returnValue('/go/home');
    spyOn(router, 'parseUrl')
      .withArgs('/go/login')
      .and.returnValue({ root: 'test-login' } as any)
      .withArgs('/go/home')
      .and.returnValue({ root: 'test-home' } as any);
  });
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should return false if no gigya components are found', (done) => {
    spyOn(cmsService, 'getPage').and.returnValue(of(mock2));
    spyOn(cmsService, 'getComponentData').and.returnValue(of(data2));
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toEqual(false);
      expect(routingService.getNextPageContext).toHaveBeenCalled();
      expect(cmsService.getPage).toHaveBeenCalled();
      expect(cmsService.getComponentData).not.toHaveBeenCalled();
      expect(authService.isUserLoggedIn).not.toHaveBeenCalled();
      expect(
        authRedirectService.saveCurrentNavigationUrl
      ).not.toHaveBeenCalled();
      expect(semanticPathService.get).not.toHaveBeenCalled();
      done();
    });
  });
  it('should return false if more than 1 components are found', (done) => {
    spyOn(cmsService, 'getPage').and.returnValue(of(mock1));
    spyOn(cmsService, 'getComponentData').and.returnValue(of(data2));
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toEqual(false);
      expect(routingService.getNextPageContext).toHaveBeenCalled();
      expect(cmsService.getPage).toHaveBeenCalled();
      expect(cmsService.getComponentData).not.toHaveBeenCalled();
      expect(authService.isUserLoggedIn).not.toHaveBeenCalled();
      expect(
        authRedirectService.saveCurrentNavigationUrl
      ).not.toHaveBeenCalled();
      expect(semanticPathService.get).not.toHaveBeenCalled();
      done();
    });
  });
  it('should return home UrlTree if user is logged in and showLoggedIn is false', (done) => {
    spyOn(cmsService, 'getPage').and.returnValue(of(mock3));
    spyOn(cmsService, 'getComponentData').and.returnValue(of(data1));
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    guard.canActivate().subscribe((canActivate) => {
      expect(JSON.stringify(canActivate)).toEqual(`{"root":"test-home"}`);
      expect(routingService.getNextPageContext).toHaveBeenCalled();
      expect(cmsService.getPage).toHaveBeenCalled();
      expect(cmsService.getComponentData).toHaveBeenCalled();
      expect(authService.isUserLoggedIn).toHaveBeenCalled();
      expect(
        authRedirectService.saveCurrentNavigationUrl
      ).not.toHaveBeenCalled();
      expect(semanticPathService.get).toHaveBeenCalled();
      done();
    });
  });
  it('should return login UrlTree if user is not logged in and showAnonymous is false', (done) => {
    spyOn(cmsService, 'getPage').and.returnValue(of(mock3));
    spyOn(cmsService, 'getComponentData').and.returnValue(of(data2));
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
    guard.canActivate().subscribe((canActivate) => {
      expect(JSON.stringify(canActivate)).toEqual(`{"root":"test-login"}`);
      expect(routingService.getNextPageContext).toHaveBeenCalled();
      expect(cmsService.getPage).toHaveBeenCalled();
      expect(cmsService.getComponentData).toHaveBeenCalled();
      expect(authService.isUserLoggedIn).toHaveBeenCalled();
      expect(authRedirectService.saveCurrentNavigationUrl).toHaveBeenCalled();
      expect(semanticPathService.get).toHaveBeenCalled();
      done();
    });
  });
  it('should return true if user is logged in and showLoggedIn is true', (done) => {
    spyOn(cmsService, 'getPage').and.returnValue(of(mock3));
    spyOn(cmsService, 'getComponentData').and.returnValue(of(data2));
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toEqual(true);
      expect(routingService.getNextPageContext).toHaveBeenCalled();
      expect(cmsService.getPage).toHaveBeenCalled();
      expect(cmsService.getComponentData).toHaveBeenCalled();
      expect(authService.isUserLoggedIn).toHaveBeenCalled();
      expect(
        authRedirectService.saveCurrentNavigationUrl
      ).not.toHaveBeenCalled();
      expect(semanticPathService.get).not.toHaveBeenCalled();
      done();
    });
  });
  it('should return true if user is not logged in and showAnonymous is true', (done) => {
    spyOn(cmsService, 'getPage').and.returnValue(of(mock3));
    spyOn(cmsService, 'getComponentData').and.returnValue(of(data1));
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toEqual(true);
      expect(routingService.getNextPageContext).toHaveBeenCalled();
      expect(cmsService.getPage).toHaveBeenCalled();
      expect(cmsService.getComponentData).toHaveBeenCalled();
      expect(authService.isUserLoggedIn).toHaveBeenCalled();
      expect(
        authRedirectService.saveCurrentNavigationUrl
      ).not.toHaveBeenCalled();
      expect(semanticPathService.get).not.toHaveBeenCalled();
      done();
    });
  });
});
