import { TestBed } from '@angular/core/testing';
import { RouterStateSnapshot, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CmsActivatedRouteSnapshot,
  CmsService,
  Page,
  PageContext,
  PageType,
  SemanticPathService,
} from '@spartacus/core';
import { NEVER, of } from 'rxjs';
import { CmsGuardsService } from '../services/cms-guards.service';
import { CmsI18nService } from '../services/cms-i18n.service';
import { CmsRoutesService } from '../services/cms-routes.service';
import { CmsPageGuardService } from './cms-page-guard.service';

class MockSemanticPathService implements Partial<SemanticPathService> {
  get = () => '';
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

fdescribe('CmsPageGuardService', () => {
  // let semanticPath: SemanticPathService;
  let cms: CmsService;
  let cmsRoutes: CmsRoutesService;
  let cmsI18n: CmsI18nService;
  let cmsGuards: CmsGuardsService;
  let service: CmsPageGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        { provide: CmsService, useClass: MockCmsService },
        { provide: CmsRoutesService, useClass: MockCmsRoutesService },
        { provide: CmsI18nService, useClass: MockCmsI18nService },
        { provide: CmsGuardsService, useClass: MockCmsGuardsService },
      ],
      imports: [RouterTestingModule],
    });

    // semanticPath = TestBed.inject(SemanticPathService);
    cms = TestBed.inject(CmsService);
    cmsRoutes = TestBed.inject(CmsRoutesService);
    cmsI18n = TestBed.inject(CmsI18nService);
    cmsGuards = TestBed.inject(CmsGuardsService);

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
      spyOn(cms, 'getPageComponentTypes').and.returnValue(NEVER);
      service
        .canActivatePage(pageContext, pageData, route, state)
        .subscribe()
        .unsubscribe();
      expect(cms.getPageComponentTypes).toHaveBeenCalledWith(pageContext);
    });

    describe('when CmsGuardsService emits false', () => {
      beforeEach(() => {
        spyOn(cmsGuards, 'cmsPageCanActivate').and.returnValue(of(false));
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
        spyOn(cmsI18n, 'loadForComponents');
        service
          .canActivatePage(pageContext, pageData, route, state)
          .subscribe()
          .unsubscribe();
        expect(cmsI18n.loadForComponents).not.toHaveBeenCalled();
      });

      it('should not try to register cms child routes', () => {
        spyOn(cmsRoutes, 'handleCmsRoutesInGuard');
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
        spyOn(cmsGuards, 'cmsPageCanActivate').and.returnValue(of(urlTree));
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
        spyOn(cmsI18n, 'loadForComponents');
        service
          .canActivatePage(pageContext, pageData, route, state)
          .subscribe()
          .unsubscribe();
        expect(cmsI18n.loadForComponents).not.toHaveBeenCalled();
      });

      it('should not try to register cms child routes', () => {
        spyOn(cmsRoutes, 'handleCmsRoutesInGuard');
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

        spyOn(cmsGuards, 'cmsPageCanActivate').and.returnValue(of(true));
        spyOn(cms, 'getPageComponentTypes').and.returnValue(of(componentTypes));
      });

      it('should load i18n keys for the page', () => {
        spyOn(cmsI18n, 'loadForComponents');
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
          spyOn(cmsRoutes, 'handleCmsRoutesInGuard');
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

          spyOn(cmsRoutes, 'handleCmsRoutesInGuard').and.returnValue(
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

          spyOn(cmsRoutes, 'handleCmsRoutesInGuard').and.returnValue(
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
});
