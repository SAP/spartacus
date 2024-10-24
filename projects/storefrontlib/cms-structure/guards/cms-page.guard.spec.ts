import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CmsService,
  Page,
  PageContext,
  ProtectedRoutesGuard,
  RouteLoadStrategy,
  RoutingConfigService,
  RoutingService,
} from '@spartacus/core';
import { NEVER, of } from 'rxjs';
import { CmsPageGuardService } from './cms-page-guard.service';
import { CmsPageGuard } from './cms-page.guard';
import { BeforeCmsPageGuardService } from './before-cms-page-guard.service';

class MockRoutingService implements Partial<RoutingService> {
  getNextPageContext = () => of({} as any);
}

class MockCmsService implements Partial<CmsService> {
  getPage = () => of({} as any);
}

class MockCmsPageGuardService implements Partial<CmsPageGuardService> {
  canActivatePage = () => of(true);
  canActivateNotFoundPage = () => of(true);
}

class MockProtectedRoutesGuard implements Partial<ProtectedRoutesGuard> {
  canActivate = () => of(true);
}

class MockRoutingConfigService {
  getLoadStrategy = () => {};
}

class MockBeforeCmsPageGuardService
  implements Partial<BeforeCmsPageGuardService>
{
  canActivate = () => of(true);
}
const mockActivatedRouteSnapshot: ActivatedRouteSnapshot = {} as any;
const mockRouterStateSnapshot: RouterStateSnapshot = {} as any;

describe('CmsPageGuard', () => {
  let routingService: RoutingService;
  let cmsService: CmsService;
  let service: CmsPageGuardService;
  let guard: CmsPageGuard;
  let beforeCmsPageGuardService: BeforeCmsPageGuardService;

  beforeEach(() => {
    console.log('Starting CmsPageGuard test');
    TestBed.configureTestingModule({
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CmsService, useClass: MockCmsService },
        { provide: CmsPageGuardService, useClass: MockCmsPageGuardService },
        { provide: ProtectedRoutesGuard, useClass: MockProtectedRoutesGuard },
        {
          provide: RoutingConfigService,
          useClass: MockRoutingConfigService,
        },
        {
          provide: BeforeCmsPageGuardService,
          useClass: MockBeforeCmsPageGuardService,
        },
      ],
      imports: [RouterTestingModule],
    });

    routingService = TestBed.inject(RoutingService);
    cmsService = TestBed.inject(CmsService);
    service = TestBed.inject(CmsPageGuardService);
    guard = TestBed.inject(CmsPageGuard);
    beforeCmsPageGuardService = TestBed.inject(BeforeCmsPageGuardService);
  });

  describe('canActivate', () => {
    describe('when BeforeCmsPageGuardService.canActivate emits redirect url,', () => {
      const urlTree = new UrlTree();
      beforeEach(() => {
    console.log('Starting CmsPageGuard test');
        spyOn(beforeCmsPageGuardService, 'canActivate').and.returnValue(
          of(urlTree)
        );
      });

      it('should emit redirect url', () => {
        let result: boolean | UrlTree;
        guard
          .canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot)
          .subscribe((value) => (result = value))
          .unsubscribe();

        expect(result).toEqual(urlTree);
      });
    });

    describe('when BeforeCmsPageGuardService.canActivate emits true,', () => {
      beforeEach(() => {
    console.log('Starting CmsPageGuard test');
        spyOn(beforeCmsPageGuardService, 'canActivate').and.returnValue(
          of(true)
        );
      });

      it('should force loading of CMS page for the anticipated page context', () => {
        const pageContext = {} as PageContext;
        spyOn(routingService, 'getNextPageContext').and.returnValue(
          of(pageContext)
        );
        spyOn(cmsService, 'getPage').and.returnValue(NEVER);
        guard
          .canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot)
          .subscribe()
          .unsubscribe();
        expect(routingService.getNextPageContext).toHaveBeenCalled();
        expect(cmsService.getPage).toHaveBeenCalledWith(pageContext, true);
      });

      describe('and when `loadStrategy` is set to ONCE', () => {
        beforeEach(() => {
    console.log('Starting CmsPageGuard test');
          const routingConfig = TestBed.inject(RoutingConfigService);
          spyOn(routingConfig, 'getLoadStrategy').and.returnValue(
            RouteLoadStrategy.ONCE
          );
        });

        it('should get (but not force reload) CMS page for the anticipated page context', () => {
          const pageContext = {} as PageContext;
          spyOn(routingService, 'getNextPageContext').and.returnValue(
            of(pageContext)
          );
          spyOn(cmsService, 'getPage').and.returnValue(NEVER);

          guard
            .canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot)
            .subscribe()
            .unsubscribe();

          expect(routingService.getNextPageContext).toHaveBeenCalled();
          expect(cmsService.getPage).toHaveBeenCalledWith(pageContext, false);
        });
      });

      describe('and when the anticipated CMS page exists,', () => {
        it('should return result of CmsPageGuardService.canActivatePage', () => {
          const pageContext = {} as PageContext;
          const pageData = {} as Page;
          const urlTree = {} as UrlTree;
          spyOn(routingService, 'getNextPageContext').and.returnValue(
            of(pageContext)
          );
          spyOn(cmsService, 'getPage').and.returnValue(of(pageData));
          spyOn(service, 'canActivatePage').and.returnValue(of(urlTree));

          let result;
          guard
            .canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot)
            .subscribe((res) => (result = res))
            .unsubscribe();
          expect(service.canActivatePage).toHaveBeenCalledWith(
            pageContext,
            pageData,
            mockActivatedRouteSnapshot,
            mockRouterStateSnapshot
          );
          expect(result).toBe(urlTree);
        });
      });

      describe('and when the anticipated CMS page does NOT exist,', () => {
        it('should return result of CmsPageGuardService.canActivatePage', () => {
          const pageContext = {} as PageContext;
          const urlTree = {} as UrlTree;
          spyOn(routingService, 'getNextPageContext').and.returnValue(
            of(pageContext)
          );
          spyOn(cmsService, 'getPage').and.returnValue(of(null));
          spyOn(service, 'canActivateNotFoundPage').and.returnValue(
            of(urlTree)
          );

          let result;
          guard
            .canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot)
            .subscribe((res) => (result = res))
            .unsubscribe();
          expect(service.canActivateNotFoundPage).toHaveBeenCalledWith(
            pageContext,
            mockActivatedRouteSnapshot,
            mockRouterStateSnapshot
          );
          expect(result).toBe(urlTree);
        });
      });
    });
  });
});
