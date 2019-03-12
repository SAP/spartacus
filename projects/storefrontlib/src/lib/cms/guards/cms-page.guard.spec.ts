import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {
  RoutingService,
  PageType,
  CmsService,
  CmsActivatedRouteSnapshot
} from '@spartacus/core';

import { of } from 'rxjs';

import { CmsPageGuards } from './cms-page.guard';
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
}
const mockRouteSnapshot: CmsActivatedRouteSnapshot = { data: {} } as any;

describe('CmsPageGuards', () => {
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CmsPageGuards,
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
      [CmsService, CmsPageGuards],
      (cmsService: CmsService, cmsPageGuards: CmsPageGuards) => {
        spyOn(cmsService, 'hasPage').and.returnValue(of(true));

        let result: boolean;
        cmsPageGuards
          .canActivate(mockRouteSnapshot, undefined)
          .subscribe(value => (result = value))
          .unsubscribe();

        expect(result).toBe(true);
      }
    ));

    it('should return false when CmsService hasPage is false for the page context', inject(
      [CmsService, CmsPageGuards],
      (cmsService: CmsService, cmsPageGuards: CmsPageGuards) => {
        spyOn(cmsService, 'hasPage').and.returnValue(of(false));

        let result: boolean;
        cmsPageGuards
          .canActivate(mockRouteSnapshot, undefined)
          .subscribe(value => (result = value))
          .unsubscribe();

        expect(result).toBe(false);
      }
    ));

    it('should redirect when CmsService hasPage is false for the page context', inject(
      [CmsService, CmsPageGuards],
      (cmsService: CmsService, cmsPageGuards: CmsPageGuards) => {
        spyOn(cmsService, 'hasPage').and.returnValue(of(false));
        spyOn(routingService, 'go');

        cmsPageGuards
          .canActivate(mockRouteSnapshot, undefined)
          .subscribe()
          .unsubscribe();

        expect(routingService.go).toHaveBeenCalled();
      }
    ));
  });
});
