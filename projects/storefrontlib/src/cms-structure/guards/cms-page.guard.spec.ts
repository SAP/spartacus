import { inject, TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CmsActivatedRouteSnapshot,
  CmsService,
  PageType,
  ProtectedRoutesGuard,
  RoutingService,
  SemanticPathService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { CmsGuardsService } from '../services/cms-guards.service';
import { CmsI18nService } from '../services/cms-i18n.service';
import { CmsRoutesService } from '../services/cms-routes.service';
import { CmsPageGuard } from './cms-page.guard';

const mockPageComponentTypes = ['component1', 'component2'];
class MockCmsService {
  getPage() {}
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

class MockProtectedRoutesGuard {
  canActivate = () => of(true);
}

class MockSemanticPathService {
  get() {}
}

const mockRouteSnapshot: CmsActivatedRouteSnapshot = { data: {} } as any;

describe('CmsPageGuard', () => {
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CmsService, useClass: MockCmsService },
        { provide: CmsRoutesService, useClass: MockCmsRoutesService },
        { provide: CmsI18nService, useClass: MockCmsI18nService },
        { provide: CmsGuardsService, useClass: MockCmsGuardsService },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        { provide: ProtectedRoutesGuard, useClass: MockProtectedRoutesGuard },
      ],
      imports: [RouterTestingModule],
    });

    routingService = TestBed.inject(RoutingService);
    spyOn(routingService, 'getNextPageContext').and.returnValue(
      of({ id: 'testPageId', type: PageType.CONTENT_PAGE })
    );
  });

  describe('canActivate', () => {
    it('should emit result of ProtectedRoutesGuard when it emits false', inject(
      [ProtectedRoutesGuard, CmsPageGuard],
      (
        protectedRoutesGuard: ProtectedRoutesGuard,
        cmsPageGuard: CmsPageGuard
      ) => {
        spyOn(protectedRoutesGuard, 'canActivate').and.returnValue(of(false));
        let result: boolean | UrlTree;
        cmsPageGuard
          .canActivate(mockRouteSnapshot, undefined)
          .subscribe(value => (result = value))
          .unsubscribe();

        expect(result).toBe(false);
      }
    ));

    it('should return true when CmsService getPage is truthy for the page context', inject(
      [CmsService, CmsPageGuard],
      (cmsService: CmsService, cmsPageGuard: CmsPageGuard) => {
        spyOn(cmsService, 'getPage').and.returnValue(of({} as any));
        let result: boolean | UrlTree;
        cmsPageGuard
          .canActivate(mockRouteSnapshot, undefined)
          .subscribe(value => (result = value))
          .unsubscribe();

        expect(result).toBe(true);
      }
    ));

    it('should return false when CmsService getPage is null for the page context', inject(
      [CmsService, CmsPageGuard],
      (cmsService: CmsService, cmsPageGuard: CmsPageGuard) => {
        spyOn(cmsService, 'getPage').and.returnValue(of(null));

        let result: boolean | UrlTree;
        cmsPageGuard
          .canActivate(mockRouteSnapshot, undefined)
          .subscribe(value => (result = value))
          .unsubscribe();

        expect(result).toBe(false);
      }
    ));

    it('should ask for notFound page data when CmsService getPage is null for the page context', inject(
      [CmsService, CmsPageGuard, SemanticPathService],
      (
        cmsService: CmsService,
        cmsPageGuard: CmsPageGuard,
        semanticPathService: SemanticPathService
      ) => {
        spyOn(cmsService, 'getPage').and.returnValue(of(null));
        spyOn(routingService, 'go');
        spyOn(semanticPathService, 'get').and.returnValue('');

        cmsPageGuard
          .canActivate(mockRouteSnapshot, undefined)
          .subscribe()
          .unsubscribe();

        expect(semanticPathService.get).toHaveBeenCalledWith('notFound');
      }
    ));

    it('should load i18n chunks', inject(
      [CmsService, CmsI18nService, CmsPageGuard],
      (
        cmsService: CmsService,
        cmsI18n: CmsI18nService,
        cmsPageGuard: CmsPageGuard
      ) => {
        spyOn(cmsService, 'getPage').and.returnValue(of({} as any));

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
        spyOn(cmsService, 'getPage').and.returnValue(of({} as any));

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
        spyOn(cmsService, 'getPage').and.returnValue(
          of({ label: '/testPageLabel' } as any)
        );
        spyOn(cmsRoutes, 'cmsRouteExist').and.returnValue(false);
        spyOn(cmsRoutes, 'handleCmsRoutesInGuard').and.callThrough();

        let result;
        cmsPageGuard
          .canActivate(mockRouteSnapshot, { url: '/test' } as any)
          .subscribe(res => (result = res));

        expect(result).toEqual(false);
        expect(cmsRoutes.cmsRouteExist).toHaveBeenCalledWith('/testPageLabel');
        expect(cmsRoutes.handleCmsRoutesInGuard).toHaveBeenCalledWith(
          { id: 'testPageId', type: 'ContentPage' } as any,
          mockPageComponentTypes,
          '/test',
          '/testPageLabel'
        );
      }
    ));
  });
});
