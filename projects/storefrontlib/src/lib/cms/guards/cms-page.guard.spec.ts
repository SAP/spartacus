import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {
  CmsActivatedRouteSnapshot,
  CmsService,
  PageType,
  RoutingService,
} from '@spartacus/core';

import { of } from 'rxjs';

import { CmsPageGuard } from './cms-page.guard';
import { CmsRoutesService } from '@spartacus/storefront';
import { CmsI18nService } from '../services/cms-i18n.service';
import { CmsGuardsService } from '../services/cms-guards.service';
import { UrlTree } from '@angular/router';

const mockPageComponentTypes = ['component1', 'component2'];
class MockCmsService {
  hasPage() {}
  getPageComponentTypes() {
    return of(mockPageComponentTypes);
  }
}
class MockRoutingService {
  getNextPageContext() {
    return of();
  }
  go() {}
}
class MockCmsRoutesService {
  cmsRouteExist() {
    return true;
  }
  handleCmsRoutesInGuard() {
    return false;
  }
}
class MockCmsI18nService {
  loadChunksForComponents = jasmine.createSpy('loadChunksForComponents');
}

class MockCmsGuardsService {
  cmsPageCanActivate = jasmine
    .createSpy('cmsPageCanActivate')
    .and.returnValue(of(true));
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
        { provide: CmsRoutesService, useClass: MockCmsRoutesService },
        { provide: CmsI18nService, useClass: MockCmsI18nService },
        { provide: CmsGuardsService, useClass: MockCmsGuardsService },
      ],
      imports: [RouterTestingModule],
    });

    routingService = TestBed.get(RoutingService);
    spyOn(routingService, 'getNextPageContext').and.returnValue(
      of({ id: 'testPageId', type: PageType.CONTENT_PAGE })
    );
  });

  describe('canActivate', () => {
    it('should return true when CmsService hasPage is true for the page context', inject(
      [CmsService, CmsPageGuard],
      (cmsService: CmsService, cmsPageGuard: CmsPageGuard) => {
        spyOn(cmsService, 'hasPage').and.returnValue(of(true));
        let result: boolean | UrlTree;
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

        let result: boolean | UrlTree;
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

    it('should load i18n chunks', inject(
      [CmsService, CmsI18nService, CmsPageGuard],
      (
        cmsService: CmsService,
        cmsI18n: CmsI18nService,
        cmsPageGuard: CmsPageGuard
      ) => {
        spyOn(cmsService, 'hasPage').and.returnValue(of(true));

        cmsPageGuard
          .canActivate(mockRouteSnapshot, undefined)
          .subscribe()
          .unsubscribe();

        expect(cmsI18n.loadChunksForComponents).toHaveBeenCalledWith(
          mockPageComponentTypes
        );
      }
    ));

    it('should process cms guards', inject(
      [CmsService, CmsGuardsService, CmsPageGuard],
      (
        cmsService: CmsService,
        cmsGuards: CmsGuardsService,
        cmsPageGuard: CmsPageGuard
      ) => {
        spyOn(cmsService, 'hasPage').and.returnValue(of(true));

        cmsPageGuard
          .canActivate(mockRouteSnapshot, undefined)
          .subscribe()
          .unsubscribe();

        expect(cmsGuards.cmsPageCanActivate).toHaveBeenCalledWith(
          mockPageComponentTypes,
          mockRouteSnapshot,
          undefined
        );
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
        spyOn(cmsRoutes, 'cmsRouteExist').and.returnValue(false);
        spyOn(cmsRoutes, 'handleCmsRoutesInGuard').and.callThrough();

        let result;
        cmsPageGuard
          .canActivate(mockRouteSnapshot, { url: '/test' } as any)
          .subscribe(res => (result = res));

        expect(result).toEqual(false);
        expect(cmsRoutes.cmsRouteExist).toHaveBeenCalledWith('testPageId');
        expect(cmsRoutes.handleCmsRoutesInGuard).toHaveBeenCalledWith(
          { id: 'testPageId', type: 'ContentPage' },
          mockPageComponentTypes,
          '/test'
        );
      }
    ));
  });
});
