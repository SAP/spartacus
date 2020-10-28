import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { CmsService, Page } from '../../cms/index';
import { BaseSite } from '../../model/misc.model';
import { RoutingService } from '../../routing';
import { BaseSitesService } from '../../site-context';
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
class MockBaseSitesService {
  getBaseSiteData(): Observable<BaseSite> {
    return of({ uid: 'testSite' });
  }
}
describe('SmartEditService', () => {
  let service: SmartEditService;
  let cmsService: CmsService;
  let routingService: RoutingService;
  let baseSitesService: BaseSitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SmartEditService,
        { provide: CmsService, useClass: MockCmsService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: BaseSitesService, useClass: MockBaseSitesService },
      ],
    });

    service = TestBed.inject(SmartEditService);
    cmsService = TestBed.inject(CmsService);
    routingService = TestBed.inject(RoutingService);
    baseSitesService = TestBed.inject(BaseSitesService);

    spyOn(routingService, 'go').and.stub();
  });

  it('should SmartEditService is injected', () => {
    expect(service).toBeTruthy();
  });

  describe('should get cmsTicketId', () => {
    it('when cmsPage is empty and url has parameter cmsTicketId', () => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(of(undefined));
      spyOn(routingService, 'getRouterState').and.returnValue(
        of({
          nextState: {
            url: '/test',
            queryParams: { cmsTicketId: 'mockCmsTicketId' },
          },
        } as any)
      );
      service['getCmsTicket']();
      expect(service.cmsTicketId).toEqual('mockCmsTicketId');
    });
  });

  describe('should not get cmsTicketId', () => {
    it('when cmsPage exist', () => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(of({} as any));
      spyOn(routingService, 'getRouterState').and.returnValue(
        of({
          nextState: {
            url: '/test',
            queryParams: { cmsTicketId: 'mockCmsTicketId' },
          },
        } as any)
      );
      service['getCmsTicket']();
      expect(service.cmsTicketId).toEqual(undefined);
    });
    it('when url does not have parameter cmsTicketId', () => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(of(undefined));
      spyOn(routingService, 'getRouterState').and.returnValue(
        of({
          nextState: {
            url: '/test',
            queryParams: {},
          },
        } as any)
      );
      service['getCmsTicket']();
      expect(service.cmsTicketId).toEqual(undefined);
    });
  });

  describe('should add page contract', () => {
    it('when navigate to a new page', () => {
      spyOn(cmsService, 'getCurrentPage').and.returnValues(
        of(undefined),
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
      spyOn(routingService, 'getRouterState').and.returnValue(
        of({
          nextState: {
            url: '/test',
            queryParams: { cmsTicketId: 'mockCmsTicketId' },
          },
        } as any)
      );
      spyOn(baseSitesService, 'getBaseSiteData').and.returnValue(
        of({
          defaultPreviewProductCode: 'test product code',
          defaultPreviewCategoryCode: 'test category code',
        })
      );
      service['getCmsTicket']();
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
      spyOn(cmsService, 'getCurrentPage').and.returnValues(
        of(undefined),
        of({
          pageId: 'testPageId',
          type: 'ContentPage',
        } as any)
      );
      spyOn(routingService, 'getRouterState').and.returnValue(
        of({
          nextState: {
            url: '/test',
            queryParams: { cmsTicketId: 'mockCmsTicketId' },
          },
        } as any)
      );
      service['getCmsTicket']();
      expect(routingService.go).not.toHaveBeenCalled();
    });

    it('redirect to preview product for ProductPage', () => {
      spyOn(cmsService, 'getCurrentPage').and.returnValues(
        of(undefined),
        of({
          pageId: 'testPageId',
          type: 'ProductPage',
        } as any)
      );
      spyOn(routingService, 'getRouterState').and.returnValue(
        of({
          nextState: {
            url: '/test',
            queryParams: { cmsTicketId: 'mockCmsTicketId' },
          },
        } as any)
      );
      spyOn(baseSitesService, 'getBaseSiteData').and.returnValue(
        of({
          defaultPreviewProductCode: 'test product code',
        })
      );
      service['getCmsTicket']();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'product',
        params: { code: 'test product code', name: '' },
      });
    });

    it('redirect to preview category for CategoryPage', () => {
      spyOn(cmsService, 'getCurrentPage').and.returnValues(
        of(undefined),
        of({
          pageId: 'testPageId',
          type: 'CategoryPage',
        } as any)
      );
      spyOn(routingService, 'getRouterState').and.returnValue(
        of({
          nextState: {
            url: '/test',
            queryParams: { cmsTicketId: 'mockCmsTicketId' },
          },
        } as any)
      );
      spyOn(baseSitesService, 'getBaseSiteData').and.returnValue(
        of({
          defaultPreviewCategoryCode: 'test category code',
        })
      );
      service['getCmsTicket']();
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
});
