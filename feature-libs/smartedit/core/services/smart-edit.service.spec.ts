import { RendererFactory2 } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import {
  BaseSite,
  BaseSiteService,
  CmsService,
  Page,
  RoutingService,
  ScriptLoader,
} from '@spartacus/core';
import { defaultSmartEditConfig } from 'feature-libs/smartedit/root/config/default-smart-edit-config';
import { SmartEditConfig } from 'feature-libs/smartedit/root/config/smart-edit-config';
import { Observable, of } from 'rxjs';
import { SmartEditService } from './smart-edit.service';

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of();
  }
  refreshLatestPage() {}
  refreshPageById() {}
  refreshComponent() {}
}
class MockRoutingService {
  getRouterState(): Observable<any> {
    return of();
  }
  go() {}
}
class MockBaseSiteService {
  get(): Observable<BaseSite> {
    return of();
  }
}

class MockScriptLoader {
  public embedScript(): void {}
}
describe('SmartEditService', () => {
  let service: SmartEditService;
  let cmsService: CmsService;
  let routingService: RoutingService;
  let baseSiteService: BaseSiteService;
  let scriptLoader: ScriptLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SmartEditService,
        { provide: SmartEditConfig, useValue: defaultSmartEditConfig },
        { provide: CmsService, useClass: MockCmsService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: ScriptLoader, useClass: MockScriptLoader },
      ],
    });

    service = TestBed.inject(SmartEditService);
    cmsService = TestBed.inject(CmsService);
    routingService = TestBed.inject(RoutingService);
    baseSiteService = TestBed.inject(BaseSiteService);
    scriptLoader = TestBed.inject(ScriptLoader);

    spyOn(routingService, 'go').and.stub();
    spyOn(scriptLoader, 'embedScript').and.callThrough();
  });

  it('should SmartEditService is injected', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to load webApplicationInjector.js', () => {
    service['loadScript']();
    expect(scriptLoader.embedScript).toHaveBeenCalled();
  });

  describe('should add page contract', () => {
    it('should add CSS classes in body tag', () => {
      spyOn(baseSiteService, 'get').and.returnValue(
        of({
          defaultPreviewProductCode: 'test product code',
          defaultPreviewCategoryCode: 'test category code',
        })
      );
      spyOn(cmsService, 'getCurrentPage').and.returnValues(
        of({
          pageId: 'testPageId',
          properties: {
            smartedit: {
              classes:
                'smartedit-page-uid-testPageId smartedit-page-uuid-testPageUuid smartedit-catalog-version-uuid-testPageCatalogUuid',
            },
          },
        } as any)
      );
      service.processCmsPage();
      expect(
        document.body.classList.contains('smartedit-page-uid-testPageId')
      ).toBeTruthy();
      expect(
        document.body.classList.contains('smartedit-page-uuid-testPageUuid')
      ).toBeTruthy();
      expect(
        document.body.classList.contains(
          'smartedit-catalog-version-uuid-testPageCatalogUuid'
        )
      ).toBeTruthy();
    });
  });

  describe('should go to the preview page', () => {
    it('no redirect for ContentPage', () => {
      const cmsPage = {
        pageId: 'testPageId',
        type: 'ContentPage',
      };
      service['isPreviewPage'] = false;
      service['goToPreviewPage'](cmsPage);

      expect(routingService.go).not.toHaveBeenCalled();
    });

    it('redirect to preview product for ProductPage', () => {
      const cmsPage = {
        pageId: 'testPageId',
        type: 'ProductPage',
      };
      service['isPreviewPage'] = false;
      service['defaultPreviewProductCode'] = 'test product code';
      service['goToPreviewPage'](cmsPage);

      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'product',
        params: { code: 'test product code', name: '' },
      });
    });

    it('redirect to preview category for CategoryPage', () => {
      const cmsPage = {
        pageId: 'testPageId',
        type: 'CategoryPage',
      };
      service['isPreviewPage'] = false;
      service['defaultPreviewCategoryCode'] = 'test category code';
      service['goToPreviewPage'](cmsPage);

      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'category',
        params: { code: 'test category code' },
      });
    });
  });

  describe('should render cms components', () => {
    it('should render a slot (refresh page by Id)', () => {
      spyOn(cmsService, 'refreshPageById').and.stub();
      service['_currentPageId'] = 'testPageId';
      service['renderComponent']('test-slot');
      expect(cmsService.refreshPageById).toHaveBeenCalledWith('testPageId');
    });
    it('should render a slot (refresh latest page)', () => {
      spyOn(cmsService, 'refreshLatestPage').and.stub();
      service['renderComponent']('test-slot');
      expect(cmsService.refreshLatestPage).toHaveBeenCalled();
    });
    it('should render a component', () => {
      spyOn(cmsService, 'refreshComponent').and.stub();
      service['renderComponent']('test-component', 'banner', 'test-slot');
      expect(cmsService.refreshComponent).toHaveBeenCalledWith(
        'test-component'
      );
    });
  });

  describe('should add smartedit contract', () => {
    it('should be able to add smartedit properties into HTML element', inject(
      [RendererFactory2],
      (factory: RendererFactory2) => {
        const renderer = factory.createRenderer(null, null);
        const element = renderer.createElement('div');
        const properties = {
          smartedit: {
            componentId: 'testId',
            catalogVersionUuid: 'test uuid',
            classes: 'class1 class2',
          },
          group: { prop1: 'groupProp1', prop2: 'groupProp2' },
        };

        service.addSmartEditContract(element, renderer, properties);
        expect(element.getAttribute('data-smartedit-component-id')).toEqual(
          'testId'
        );
        expect(
          element.getAttribute('data-smartedit-catalog-version-uuid')
        ).toEqual('test uuid');
        expect(element.classList.contains('class1')).toBeTruthy();
        expect(element.classList.contains('class2')).toBeTruthy();

        expect(element.getAttribute('data-group-prop1')).toEqual('groupProp1');
        expect(element.getAttribute('data-group-prop2')).toEqual('groupProp2');
      }
    ));
  });
});
