import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RoutingService, PageType, CmsService } from '@spartacus/core';

import { of } from 'rxjs';

import { CmsPageGuard } from './cms-page.guard';

class MockCmsService {
  hasPage() {}
}
class MockRoutingService {
  getPageContext() {
    return of();
  }
  go() {}
}

describe('CmsPageGuard', () => {
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CmsPageGuard,
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CmsService, useClass: MockCmsService }
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
          .canActivate()
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
          .canActivate()
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
          .canActivate()
          .subscribe()
          .unsubscribe();

        expect(routingService.go).toHaveBeenCalled();
      }
    ));
  });
});
