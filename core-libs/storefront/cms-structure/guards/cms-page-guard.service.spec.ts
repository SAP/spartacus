import { TestBed } from '@angular/core/testing';
import { RouterStateSnapshot, UrlTree } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  CmsService,
  Page,
  PageContext,
  PageType,
  RoutingService,
  SemanticPathService,
} from '@spartacus/core';
import { CmsComponentsService } from '@spartacus/storefront';
import { NEVER, of } from 'rxjs';
import { CmsGuardsService } from '../services/cms-guards.service';
import { CmsI18nService } from '../services/cms-i18n.service';
import { CmsRoutesService } from '../services/cms-routes.service';
import { CmsPageGuardService } from './cms-page-guard.service';

const NOT_FOUND_ROUTE_NAME = 'notFound';
const NOT_FOUND_URL = '/not-found';

class MockSemanticPathService implements Partial<SemanticPathService> {
  // in this file we ask for nothing more than get('notFound')
  get = () => NOT_FOUND_URL;
}

class MockCmsService implements Partial<CmsService> {
  getPageComponentTypes = () => of([]);
  getPage = () => of({} as any);
  getPageIndex = () => of('');
  setPageFailIndex = () => {};
}

class MockCmsRoutesService implements Partial<CmsRoutesService> {
  handleCmsRoutesInGuard = () => true;
}

class MockCmsI18nService implements Partial<CmsI18nService> {
  loadForComponents = () => {};
}

class MockCmsGuardsService implements Partial<CmsGuardsService> {
  cmsPageCanActivate = () => of(true);
}

class MockCmsComponentsService implements Partial<CmsComponentsService> {
  determineMappings = (c) => of(c);
}

class MockRoutingService implements Partial<RoutingService> {
  changeNextPageContext = vi.fn();
}

describe('CmsPageGuardService', () => {
  let cms: CmsService;
  let cmsRoutes: CmsRoutesService;
  let cmsI18n: CmsI18nService;
  let cmsGuards: CmsGuardsService;
  let semanticPath: SemanticPathService;
  let service: CmsPageGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        { provide: CmsService, useClass: MockCmsService },
        { provide: CmsRoutesService, useClass: MockCmsRoutesService },
        { provide: CmsI18nService, useClass: MockCmsI18nService },
        { provide: CmsGuardsService, useClass: MockCmsGuardsService },
        {
          provide: CmsComponentsService,
          useClass: MockCmsComponentsService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    });

    cms = TestBed.inject(CmsService);
    cmsRoutes = TestBed.inject(CmsRoutesService);
    cmsI18n = TestBed.inject(CmsI18nService);
    cmsGuards = TestBed.inject(CmsGuardsService);
    semanticPath = TestBed.inject(SemanticPathService);

    service = TestBed.inject(CmsPageGuardService);
  });

  describe('canActivatePage', () => {
    let pageContext: PageContext;
    let pageData: Page;
    let route: CmsActivatedRouteSnapshot;
    let state: RouterStateSnapshot;

    beforeEach(() => {
      pageContext = { type: PageType.CONTENT_PAGE, id: 'pageId' };
      pageData = {};
      route = {} as any;
      state = {} as any;
    });

    it('should get component types for page', () => {
      vi.spyOn(cms, 'getPageComponentTypes').mockReturnValue(NEVER);
      service
        .canActivatePage(pageContext, pageData, route, state)
        .subscribe()
        .unsubscribe();
      expect(cms.getPageComponentTypes).toHaveBeenCalledWith(pageContext);
    });

    describe('when CmsGuardsService emits false', () => {
      beforeEach(() => {
        vi.spyOn(cmsGuards, 'cmsPageCanActivate').mockReturnValue(of(false));
      });

      it('should emit false', () => {
        let result;
        service
          .canActivatePage(pageContext, pageData, route, state)
          .subscribe((res) => (result = res))
          .unsubscribe();
        expect(result).toBe(false);
      });

      it('should not load i18n keys for the page', () => {
        vi.spyOn(cmsI18n, 'loadForComponents');
        service
          .canActivatePage(pageContext, pageData, route, state)
          .subscribe()
          .unsubscribe();
        expect(cmsI18n.loadForComponents).not.toHaveBeenCalled();
      });

      it('should not try to register cms child routes', () => {
        vi.spyOn(cmsRoutes, 'handleCmsRoutesInGuard');
        service
          .canActivatePage(pageContext, pageData, route, state)
          .subscribe()
          .unsubscribe();
        expect(cmsRoutes.handleCmsRoutesInGuard).not.toHaveBeenCalled();
      });
    });

    describe('when CmsGuardsService emits UrlTree', () => {
      let urlTree;

      beforeEach(() => {
        urlTree = new UrlTree();
        vi.spyOn(cmsGuards, 'cmsPageCanActivate').mockReturnValue(of(urlTree));
      });

      it('should emit this UrlTree', () => {
        let result;
        service
          .canActivatePage(pageContext, pageData, route, state)
          .subscribe((res) => (result = res))
          .unsubscribe();
        expect(result).toBe(urlTree);
      });

      it('should not load i18n keys for the page', () => {
        vi.spyOn(cmsI18n, 'loadForComponents');
        service
          .canActivatePage(pageContext, pageData, route, state)
          .subscribe()
          .unsubscribe();
        expect(cmsI18n.loadForComponents).not.toHaveBeenCalled();
      });

      it('should not try to register cms child routes', () => {
        vi.spyOn(cmsRoutes, 'handleCmsRoutesInGuard');
        service
          .canActivatePage(pageContext, pageData, route, state)
          .subscribe()
          .unsubscribe();
        expect(cmsRoutes.handleCmsRoutesInGuard).not.toHaveBeenCalled();
      });
    });

    describe('when CmsGuardsService emits true', () => {
      let componentTypes;

      beforeEach(() => {
        componentTypes = ['componentType1, componentType2'];

        vi.spyOn(cmsGuards, 'cmsPageCanActivate').mockReturnValue(of(true));
        vi.spyOn(cms, 'getPageComponentTypes').mockReturnValue(of(componentTypes));
      });

      it('should load i18n keys for the page', () => {
        vi.spyOn(cmsI18n, 'loadForComponents');
        service
          .canActivatePage(pageContext, pageData, route, state)
          .subscribe()
          .unsubscribe();
        expect(cmsI18n.loadForComponents).toHaveBeenCalledWith(componentTypes);
      });

      describe('when route contains `data.cxCmsRouteContext`', () => {
        beforeEach(() => {
          route = { data: { cxCmsRouteContext: {} } } as any;
        });

        it('should not try to register cms child routes', () => {
          vi.spyOn(cmsRoutes, 'handleCmsRoutesInGuard');
          service
            .canActivatePage(pageContext, pageData, route, state)
            .subscribe()
            .unsubscribe();
          expect(cmsRoutes.handleCmsRoutesInGuard).not.toHaveBeenCalled();
        });
      });

      describe('when route does NOT contain `data.cxCmsRouteContext`', () => {
        beforeEach(() => {
          route = {} as any;
          state = { url: 'url' } as any;
        });

        it('should try to register cms child routes using page.label', () => {
          pageData = { label: 'label' } as any;

          const expectedResult = {};

          vi.spyOn(cmsRoutes, 'handleCmsRoutesInGuard').mockReturnValue(
            expectedResult as any
          );

          let result;
          service
            .canActivatePage(pageContext, pageData, route, state)
            .subscribe((res) => (result = res))
            .unsubscribe();
          expect(result).toBe(expectedResult as any);
          expect(cmsRoutes.handleCmsRoutesInGuard).toHaveBeenCalledWith(
            pageContext,
            componentTypes,
            state.url,
            pageData.label
          );
        });

        it('should try to register cms child routes using pageContext.id when page.label is undefined', () => {
          pageData = {} as any;

          const expectedResult = {};

          vi.spyOn(cmsRoutes, 'handleCmsRoutesInGuard').mockReturnValue(
            expectedResult as any
          );

          let result;
          service
            .canActivatePage(pageContext, pageData, route, state)
            .subscribe((res) => (result = res))
            .unsubscribe();
          expect(result).toBe(expectedResult as any);
          expect(cmsRoutes.handleCmsRoutesInGuard).toHaveBeenCalledWith(
            pageContext,
            componentTypes,
            state.url,
            pageContext.id
          );
        });
      });
    });
  });

  describe('canActivateNotFoundPage', () => {
    let pageContext: PageContext;
    let route: CmsActivatedRouteSnapshot;
    let state: RouterStateSnapshot;

    let notFoundPageData: Page;

    beforeEach(() => {
      pageContext = { type: PageType.PRODUCT_PAGE, id: '1234' };
      route = {} as any;
      state = {} as any;
      notFoundPageData = {} as any;
    });

    it('should return false when cannot get the content of the NOT FOUND page', () => {
      vi.spyOn(cms, 'getPage').mockReturnValue(of(null));
      let result;
      service
        .canActivateNotFoundPage(pageContext, route, state)
        .subscribe((res) => (result = res))
        .unsubscribe();
      expect(result).toBe(false);
    });

    it('should use page id of the NOT FOUND page', () => {
      vi.spyOn(cms, 'getPage').mockReturnValue(of(null));
      vi.spyOn(semanticPath, 'get');
      service
        .canActivateNotFoundPage(pageContext, route, state)
        .subscribe()
        .unsubscribe();
      expect(semanticPath.get).toHaveBeenCalledWith(NOT_FOUND_ROUTE_NAME);
      expect(cms.getPage).toHaveBeenCalledWith({
        type: PageType.CONTENT_PAGE,
        id: NOT_FOUND_URL,
      });
    });

    it('should assign the content of the `not found page` for the requested page id', () => {
      const notFoundPageIndex = 'notFoundPageIndex';
      const expected = {};
      vi.spyOn(service, 'canActivatePage').mockReturnValue(of(expected as any));
      vi.spyOn(cms, 'getPage').mockReturnValue(of(notFoundPageData));
      vi.spyOn(cms, 'getPageIndex').mockImplementation((ctx: PageContext) =>
        ctx.id === NOT_FOUND_URL
          ? of(notFoundPageIndex)
          : of(undefined, notFoundPageIndex)
      );
      vi.spyOn(cms, 'setPageFailIndex');

      let result;
      service
        .canActivateNotFoundPage(pageContext, route, state)
        .subscribe((res) => (result = res))
        .unsubscribe();

      expect(cms.setPageFailIndex).toHaveBeenCalledWith(
        pageContext,
        notFoundPageIndex
      );
      expect(cms.getPageIndex).toHaveBeenCalledWith(pageContext);
      expect(service.canActivatePage).toHaveBeenCalledWith(
        pageContext,
        notFoundPageData,
        route,
        state
      );
      expect(result).toBe(expected);
    });

    it('should change the page context', () => {
      const notFoundPageIndex = 'notFoundPageIndex';
      vi.spyOn(service, 'canActivatePage').mockReturnValue(of({} as any));
      vi.spyOn(cms, 'getPage').mockReturnValue(of(notFoundPageData));
      vi.spyOn(cms, 'getPageIndex').mockImplementation((ctx: PageContext) =>
        ctx.id === NOT_FOUND_URL
          ? of(notFoundPageIndex)
          : of(undefined, notFoundPageIndex)
      );

      const notFoundCmsPageContext: PageContext = {
        type: PageType.CONTENT_PAGE,
        id: NOT_FOUND_URL,
      };

      const routingService = TestBed.inject(RoutingService);

      service
        .canActivateNotFoundPage(pageContext, route, state)
        .subscribe()
        .unsubscribe();

      expect(routingService.changeNextPageContext).toHaveBeenCalledWith(
        notFoundCmsPageContext
      );
    });
  });
});
