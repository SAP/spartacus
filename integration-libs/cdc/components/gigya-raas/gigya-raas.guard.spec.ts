import { TestBed } from '@angular/core/testing';
import {
  RoutingService,
  CmsService,
  AuthGuard,
  NotAuthGuard,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { GigyaRaasGuard } from './gigya-raas.guard';

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
  profileEdit: 'false',
};

const data2 = {
  uid: 'GigyaRaasComponentForXYZ',
  typeCode: 'GigyaRaasComponent',
  showAnonymous: 'false',
  showLoggedIn: 'true',
  profileEdit: 'false',
};
const data3 = {
  uid: 'GigyaRaasComponentForABC',
  typeCode: 'GigyaRaasComponent',
  showAnonymous: 'true',
  showLoggedIn: 'false',
  profileEdit: 'false',
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
class MockAuthGuard implements Partial<AuthGuard> {
  canActivate(): Observable<boolean> {
    return of(true);
  }
}

class MockNotAuthGuard implements Partial<NotAuthGuard> {
  canActivate(): any {
    return of(true);
  }
}

describe('GigyaRaasGuard', () => {
  let guard: GigyaRaasGuard;
  let routingService: RoutingService;
  let cmsService: CmsService;
  let authGuard: AuthGuard;
  let notAuthGuard: NotAuthGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthGuard, useClass: MockAuthGuard },
        { provide: NotAuthGuard, useClass: MockNotAuthGuard },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CmsService, useClass: MockCmsService },
      ],
    });
    guard = TestBed.inject(GigyaRaasGuard);
    routingService = TestBed.inject(RoutingService);
    cmsService = TestBed.inject(CmsService);
    authGuard = TestBed.inject(AuthGuard);
    notAuthGuard = TestBed.inject(NotAuthGuard);
    spyOn(routingService, 'getNextPageContext').and.callThrough();
  });
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should return false if no gigya components are found', (done) => {
    spyOn(cmsService, 'getPage').and.returnValue(of(mock2));
    spyOn(cmsService, 'getComponentData').and.returnValue(of(data2));
    spyOn(authGuard, 'canActivate').and.returnValue(of(true));
    spyOn(notAuthGuard, 'canActivate').and.returnValue(of(true));
    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toEqual(false);
      expect(routingService.getNextPageContext).toHaveBeenCalled();
      expect(cmsService.getPage).toHaveBeenCalled();
      expect(cmsService.getComponentData).not.toHaveBeenCalled();
      expect(authGuard.canActivate).not.toHaveBeenCalled();
      expect(notAuthGuard.canActivate).not.toHaveBeenCalled();
      done();
    });
  });
  it('should return home UrlTree if user is logged in and showLoggedIn is false', (done) => {
    spyOn(cmsService, 'getPage').and.returnValue(of(mock3));
    spyOn(cmsService, 'getComponentData').and.returnValue(of(data1));
    spyOn(authGuard, 'canActivate').and.callThrough();
    spyOn(notAuthGuard, 'canActivate').and.returnValue(
      of({ root: 'test-home' } as any)
    );
    guard.canActivate().subscribe((canActivate) => {
      expect(JSON.stringify(canActivate)).toEqual(`{"root":"test-home"}`);
      expect(routingService.getNextPageContext).toHaveBeenCalled();
      expect(cmsService.getPage).toHaveBeenCalled();
      expect(cmsService.getComponentData).toHaveBeenCalled();
      expect(authGuard.canActivate).not.toHaveBeenCalled();
      expect(notAuthGuard.canActivate).toHaveBeenCalled();
      done();
    });
  });
  it('should return login UrlTree if user is not logged in and showAnonymous is false', (done) => {
    spyOn(cmsService, 'getPage').and.returnValue(of(mock3));
    spyOn(cmsService, 'getComponentData').and.returnValue(of(data2));
    spyOn(notAuthGuard, 'canActivate').and.callThrough();
    spyOn(authGuard, 'canActivate').and.returnValue(
      of({ root: 'test-login' } as any)
    );
    guard.canActivate().subscribe((canActivate) => {
      expect(JSON.stringify(canActivate)).toEqual(`{"root":"test-login"}`);
      expect(routingService.getNextPageContext).toHaveBeenCalled();
      expect(cmsService.getPage).toHaveBeenCalled();
      expect(cmsService.getComponentData).toHaveBeenCalled();
      expect(authGuard.canActivate).toHaveBeenCalled();
      expect(notAuthGuard.canActivate).not.toHaveBeenCalled();
      done();
    });
  });
  describe('If more than 1 gigya components are found in the page', () => {
    it('should return non-true if one of the component returns false during checking', (done) => {
      spyOn(cmsService, 'getPage').and.returnValue(of(mock1));
      spyOn(cmsService, 'getComponentData')
        .withArgs('GigyaRaasComponentForXYZ')
        .and.returnValue(of(data2))
        .withArgs('GigyaRaasComponentForABC')
        .and.returnValue(of(data3));
      spyOn(notAuthGuard, 'canActivate').and.returnValue(of(true));
      spyOn(authGuard, 'canActivate').and.returnValue(
        of({ root: 'test-login' } as any)
      );
      guard.canActivate().subscribe((canActivate) => {
        expect(JSON.stringify(canActivate)).toEqual(`{"root":"test-login"}`);
        expect(routingService.getNextPageContext).toHaveBeenCalled();
        expect(cmsService.getPage).toHaveBeenCalled();
        expect(cmsService.getComponentData).toHaveBeenCalledTimes(3);
        expect(authGuard.canActivate).toHaveBeenCalled();
        expect(notAuthGuard.canActivate).toHaveBeenCalled();
        done();
      });
    });
    it('should return true if all components returns true  during checking', (done) => {
      spyOn(cmsService, 'getPage').and.returnValue(of(mock1));
      spyOn(cmsService, 'getComponentData')
        .withArgs('GigyaRaasComponentForXYZ')
        .and.returnValue(of(data1))
        .withArgs('GigyaRaasComponentForABC')
        .and.returnValue(of(data3));
      spyOn(authGuard, 'canActivate').and.returnValue(of(true));
      spyOn(notAuthGuard, 'canActivate').and.returnValue(of(true));
      guard.canActivate().subscribe((canActivate) => {
        expect(canActivate).toEqual(true);
        expect(routingService.getNextPageContext).toHaveBeenCalled();
        expect(cmsService.getPage).toHaveBeenCalled();
        expect(cmsService.getComponentData).toHaveBeenCalledTimes(3);
        expect(authGuard.canActivate).not.toHaveBeenCalled();
        expect(notAuthGuard.canActivate).toHaveBeenCalled();
        done();
      });
    });
    it('should return first non-true if more than 1 component returns non-true during checking', (done) => {
      spyOn(cmsService, 'getPage').and.returnValue(of(mock1));
      spyOn(cmsService, 'getComponentData')
        .withArgs('GigyaRaasComponentForXYZ')
        .and.returnValue(of(data2))
        .withArgs('GigyaRaasComponentForABC')
        .and.returnValue(of(data3));
      spyOn(notAuthGuard, 'canActivate').and.returnValue(of(false));
      spyOn(authGuard, 'canActivate').and.returnValue(
        of({ root: 'test-login' } as any)
      );
      guard.canActivate().subscribe((canActivate) => {
        expect(JSON.stringify(canActivate)).toEqual(`{"root":"test-login"}`);
        expect(routingService.getNextPageContext).toHaveBeenCalled();
        expect(cmsService.getPage).toHaveBeenCalled();
        expect(cmsService.getComponentData).toHaveBeenCalledTimes(3);
        expect(authGuard.canActivate).toHaveBeenCalled();
        expect(notAuthGuard.canActivate).toHaveBeenCalled();
        done();
      });
    });
  });
});
