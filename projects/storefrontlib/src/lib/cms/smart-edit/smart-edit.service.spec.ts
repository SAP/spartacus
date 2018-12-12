import { TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs';

import { CmsService } from '../facade/cms.service';
import { RoutingService, PageType } from '@spartacus/core';
import { SmartEditService } from './smart-edit.service';
import { Page } from '../models/page.model';

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of();
  }
}
class MockRoutingService {
  getRouterState(): Observable<any> {
    return of();
  }
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
        { provide: RoutingService, useClass: MockRoutingService }
      ]
    });

    service = TestBed.get(SmartEditService);
    cmsService = TestBed.get(CmsService);
    routingService = TestBed.get(RoutingService);
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
            queryParams: { cmsTicketId: 'mockCmsTicketId' }
          }
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
            queryParams: { cmsTicketId: 'mockCmsTicketId' }
          }
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
            queryParams: {}
          }
        })
      );
      service['getCmsTicket']();
      expect(service.cmsTicketId).toEqual(undefined);
    });
  });

  describe('should add page contract', () => {
    it('when navigate to a new page', () => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(
        of({
          pageId: 'testPageId',
          uuid: 'testPageUuid',
          catalogUuid: 'testPageCatalogUuid'
        })
      );
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
});
