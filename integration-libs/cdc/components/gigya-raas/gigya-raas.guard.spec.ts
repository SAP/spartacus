import { TestBed } from '@angular/core/testing';
import {
  RoutingService,
  CmsService,
  AuthGuard,
  NotAuthGuard,
} from '@spartacus/core';
import { firstValueFrom, Observable, of } from 'rxjs';
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
    vi.spyOn(routingService, 'getNextPageContext');
  });
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should return false if no gigya components are found', async () => {
    vi.spyOn(cmsService, 'getPage').mockReturnValue(of(mock2));
    vi.spyOn(cmsService, 'getComponentData').mockReturnValue(of(data2));
    vi.spyOn(authGuard, 'canActivate').mockReturnValue(of(true));
    vi.spyOn(notAuthGuard, 'canActivate').mockReturnValue(of(true));
    const canActivate = await firstValueFrom(guard.canActivate());
    expect(canActivate).toEqual(false);
    expect(routingService.getNextPageContext).toHaveBeenCalled();
    expect(cmsService.getPage).toHaveBeenCalled();
    expect(cmsService.getComponentData).not.toHaveBeenCalled();
    expect(authGuard.canActivate).not.toHaveBeenCalled();
    expect(notAuthGuard.canActivate).not.toHaveBeenCalled();
  });
  it('should return home UrlTree if user is logged in and showLoggedIn is false', async () => {
    vi.spyOn(cmsService, 'getPage').mockReturnValue(of(mock3));
    vi.spyOn(cmsService, 'getComponentData').mockReturnValue(of(data1));
    vi.spyOn(authGuard, 'canActivate');
    vi.spyOn(notAuthGuard, 'canActivate').mockReturnValue(
      of({ root: 'test-home' } as any)
    );
    const canActivate = await firstValueFrom(guard.canActivate());
    expect(JSON.stringify(canActivate)).toEqual(`{"root":"test-home"}`);
    expect(routingService.getNextPageContext).toHaveBeenCalled();
    expect(cmsService.getPage).toHaveBeenCalled();
    expect(cmsService.getComponentData).toHaveBeenCalled();
    expect(authGuard.canActivate).not.toHaveBeenCalled();
    expect(notAuthGuard.canActivate).toHaveBeenCalled();
  });
  it('should return login UrlTree if user is not logged in and showAnonymous is false', async () => {
    vi.spyOn(cmsService, 'getPage').mockReturnValue(of(mock3));
    vi.spyOn(cmsService, 'getComponentData').mockReturnValue(of(data2));
    vi.spyOn(notAuthGuard, 'canActivate');
    vi.spyOn(authGuard, 'canActivate').mockReturnValue(
      of({ root: 'test-login' } as any)
    );
    const canActivate = await firstValueFrom(guard.canActivate());
    expect(JSON.stringify(canActivate)).toEqual(`{"root":"test-login"}`);
    expect(routingService.getNextPageContext).toHaveBeenCalled();
    expect(cmsService.getPage).toHaveBeenCalled();
    expect(cmsService.getComponentData).toHaveBeenCalled();
    expect(authGuard.canActivate).toHaveBeenCalled();
    expect(notAuthGuard.canActivate).not.toHaveBeenCalled();
  });
  describe('If more than 1 gigya components are found in the page', () => {
    it('should return non-true if one of the component returns false during checking', async () => {
      vi.spyOn(cmsService, 'getPage').mockReturnValue(of(mock1));
      vi.spyOn(cmsService, 'getComponentData').mockImplementation(
        (uid: string) =>
          uid === 'GigyaRaasComponentForXYZ' ? of(data2) : of(data3)
      );
      vi.spyOn(notAuthGuard, 'canActivate').mockReturnValue(of(true));
      vi.spyOn(authGuard, 'canActivate').mockReturnValue(
        of({ root: 'test-login' } as any)
      );
      const canActivate = await firstValueFrom(guard.canActivate());
      expect(JSON.stringify(canActivate)).toEqual(`{"root":"test-login"}`);
      expect(routingService.getNextPageContext).toHaveBeenCalled();
      expect(cmsService.getPage).toHaveBeenCalled();
      expect(cmsService.getComponentData).toHaveBeenCalledTimes(3);
      expect(authGuard.canActivate).toHaveBeenCalled();
      expect(notAuthGuard.canActivate).toHaveBeenCalled();
    });
    it('should return true if all components returns true  during checking', async () => {
      vi.spyOn(cmsService, 'getPage').mockReturnValue(of(mock1));
      vi.spyOn(cmsService, 'getComponentData').mockImplementation(
        (uid: string) =>
          uid === 'GigyaRaasComponentForXYZ' ? of(data1) : of(data3)
      );
      vi.spyOn(authGuard, 'canActivate').mockReturnValue(of(true));
      vi.spyOn(notAuthGuard, 'canActivate').mockReturnValue(of(true));
      const canActivate = await firstValueFrom(guard.canActivate());
      expect(canActivate).toEqual(true);
      expect(routingService.getNextPageContext).toHaveBeenCalled();
      expect(cmsService.getPage).toHaveBeenCalled();
      expect(cmsService.getComponentData).toHaveBeenCalledTimes(3);
      expect(authGuard.canActivate).not.toHaveBeenCalled();
      expect(notAuthGuard.canActivate).toHaveBeenCalled();
    });
    it('should return first non-true if more than 1 component returns non-true during checking', async () => {
      vi.spyOn(cmsService, 'getPage').mockReturnValue(of(mock1));
      vi.spyOn(cmsService, 'getComponentData').mockImplementation(
        (uid: string) =>
          uid === 'GigyaRaasComponentForXYZ' ? of(data2) : of(data3)
      );
      vi.spyOn(notAuthGuard, 'canActivate').mockReturnValue(of(false));
      vi.spyOn(authGuard, 'canActivate').mockReturnValue(
        of({ root: 'test-login' } as any)
      );
      const canActivate = await firstValueFrom(guard.canActivate());
      expect(JSON.stringify(canActivate)).toEqual(`{"root":"test-login"}`);
      expect(routingService.getNextPageContext).toHaveBeenCalled();
      expect(cmsService.getPage).toHaveBeenCalled();
      expect(cmsService.getComponentData).toHaveBeenCalledTimes(3);
      expect(authGuard.canActivate).toHaveBeenCalled();
      expect(notAuthGuard.canActivate).toHaveBeenCalled();
    });
  });
});
