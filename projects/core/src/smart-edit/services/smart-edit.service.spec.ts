import { TestBed } from '@angular/core/testing';

import { of, Observable } from 'rxjs';

import { CmsService, Page } from '../../cms/index';
import { RoutingService } from '../../routing';

import { SmartEditService } from './smart-edit.service';

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of();
  }
  refreshLatestPage() {}
  refreshComponent() {}
}
class MockRoutingService {
  getRouterState(): Observable<any> {
    return of();
  }
  go() {}
}
describe('SmartEditService', () => {
  let service: SmartEditService;
  let cmsService: CmsService;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SmartEditService,
        { provide: CmsService, useClass: MockCmsService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });

    service = TestBed.get(SmartEditService);
    cmsService = TestBed.get(CmsService);
    routingService = TestBed.get(RoutingService);

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
          state: {
            url: '/test',
            queryParams: { cmsTicketId: 'mockCmsTicketId' },
          },
        })
      );
      service['getCmsTicket']();
      expect(service.cmsTicketId).toEqual('mockCmsTicketId');
    });
  });

  describe('should not get cmsTicketId', () => {
    it('when cmsPage exist', () => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(of({}));
      spyOn(routingService, 'getRouterState').and.returnValue(
        of({
          state: {
            url: '/test',
            queryParams: { cmsTicketId: 'mockCmsTicketId' },
          },
        })
      );
      service['getCmsTicket']();
      expect(service.cmsTicketId).toEqual(undefined);
    });
    it('when url does not have parameter cmsTicketId', () => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(of(undefined));
      spyOn(routingService, 'getRouterState').and.returnValue(
        of({
          state: {
            url: '/test',
            queryParams: {},
          },
        })
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
        })
      );
      spyOn(routingService, 'getRouterState').and.returnValue(
        of({
          state: {
            url: '/test',
            queryParams: { cmsTicketId: 'mockCmsTicketId' },
          },
        })
      );
      service['getCmsTicket']();
      service['addPageContract']();
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
        })
      );
      spyOn(routingService, 'getRouterState').and.returnValue(
        of({
          state: {
            url: '/test',
            queryParams: { cmsTicketId: 'mockCmsTicketId' },
          },
        })
      );
      service['getCmsTicket']();
      service['addPageContract']();
      expect(routingService.go).not.toHaveBeenCalled();
    });

    it('redirect to preview product for ProductPage', () => {
      spyOn(cmsService, 'getCurrentPage').and.returnValues(
        of(undefined),
        of({
          pageId: 'testPageId',
          type: 'ProductPage',
        })
      );
      spyOn(routingService, 'getRouterState').and.returnValue(
        of({
          state: {
            url: '/test',
            queryParams: { cmsTicketId: 'mockCmsTicketId' },
          },
        })
      );
      service['getCmsTicket']();
      service['addPageContract']();
      expect(routingService.go).toHaveBeenCalledWith({
        route: [{ name: 'product', params: { code: 2053367 } }],
      });
    });

    it('redirect to preview category for CategoryPage', () => {
      spyOn(cmsService, 'getCurrentPage').and.returnValues(
        of(undefined),
        of({
          pageId: 'testPageId',
          type: 'CategoryPage',
        })
      );
      spyOn(routingService, 'getRouterState').and.returnValue(
        of({
          state: {
            url: '/test',
            queryParams: { cmsTicketId: 'mockCmsTicketId' },
          },
        })
      );
      service['getCmsTicket']();
      service['addPageContract']();
      expect(routingService.go).toHaveBeenCalledWith({
        route: [{ name: 'category', params: { code: 575 } }],
      });
    });
  });

  describe('should render cms components', () => {
    it('should render a slot', () => {
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
