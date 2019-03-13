import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {
  RoutingService,
  PageType,
  CmsService,
  CmsActivatedRouteSnapshot
} from '@spartacus/core';

import { of } from 'rxjs';

import { CmsPageGuard } from './cms-page.guard';
import { CmsRoutesService } from '@spartacus/storefront';

class MockCmsService {
  hasPage() {}
}
class MockRoutingService {
  getPageContext() {
    return of();
  }
  go() {}
}
class MockCmsRoutesService {
  contentRouteExist() {
    return true;
  }
  handleContentRoutes() {
    return of(false);
  }
}
const mockRouteSnapshot: CmsActivatedRouteSnapshot = { data: {} } as any;

describe('CmsPageGuard', () => {
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CmsPageGuard,
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CmsService, useClass: MockCmsService },
        { provide: CmsRoutesService, useClass: MockCmsRoutesService }
      ],
      imports: [RouterTestingModule]
    });

    routingService = TestBed.get(RoutingService);
    spyOn(routingService, 'getPageContext').and.returnValue(
      of({ id: 'testPageId', type: PageType.CONTENT_PAGE })
    );
  });

  describe('canActivate', () => {
    it('should return true when CmsService hasPage is true for the page context', inject(
      [CmsService, CmsPageGuard],
      (cmsService: CmsService, cmsPageGuard: CmsPageGuard) => {
        spyOn(cmsService, 'hasPage').and.returnValue(of(true));

        let result: boolean;
        cmsPageGuard
          .canActivate(mockRouteSnapshot, undefined)
          .subscribe(value => (result = value))
          .unsubscribe();

        expect(result).toBe(true);
      }
    ));

    it('should return false when CmsService hasPage is false for the page context', inject(
      [CmsService, CmsPageGuard],
      (cmsService: CmsService, cmsPageGuard: CmsPageGuard) => {
        spyOn(cmsService, 'hasPage').and.returnValue(of(false));

        let result: boolean;
        cmsPageGuard
          .canActivate(mockRouteSnapshot, undefined)
          .subscribe(value => (result = value))
          .unsubscribe();

        expect(result).toBe(false);
      }
    ));

    it('should redirect when CmsService hasPage is false for the page context', inject(
      [CmsService, CmsPageGuard],
      (cmsService: CmsService, cmsPageGuard: CmsPageGuard) => {
        spyOn(cmsService, 'hasPage').and.returnValue(of(false));
        spyOn(routingService, 'go');

        cmsPageGuard
          .canActivate(mockRouteSnapshot, undefined)
          .subscribe()
          .unsubscribe();

        expect(routingService.go).toHaveBeenCalled();
      }
    ));

    it('should switch to handleContentRoutes for generic pages', inject(
      [CmsService, CmsPageGuard, CmsRoutesService],
      (
        cmsService: CmsService,
        cmsPageGuard: CmsPageGuard,
        cmsRoutes: CmsRoutesService
      ) => {
        spyOn(cmsService, 'hasPage').and.returnValue(of(true));
        spyOn(cmsRoutes, 'contentRouteExist').and.returnValue(false);
        spyOn(cmsRoutes, 'handleContentRoutes').and.callThrough();

        let result;

        cmsPageGuard
          .canActivate(mockRouteSnapshot, { url: '/test' } as any)
          .subscribe(res => (result = res));

        expect(result).toEqual(false);
        expect(cmsRoutes.contentRouteExist).toHaveBeenCalledWith('testPageId');
        expect(cmsRoutes.handleContentRoutes).toHaveBeenCalledWith(
          { id: 'testPageId', type: 'ContentPage' },
          '/test'
        );
      }
    ));
  });
});
