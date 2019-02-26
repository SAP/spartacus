import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RoutingService, PageType, CmsService } from '@spartacus/core';

import { of } from 'rxjs';

import { CmsPageGuards } from './cms-page.guard';
import createSpy = jasmine.createSpy;

class MockCmsService {
  hasPage() {}
}
const MockRoutingService = {
  getPageContext: createSpy('getPageContext').and.returnValue(
    of({ id: 'testPageId', type: PageType.CONTENT_PAGE })
  ),
  go: createSpy('RoutingService.go')
};

fdescribe('CmsPageGuards', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CmsPageGuards,
        { provide: RoutingService, useValue: MockRoutingService },
        { provide: CmsService, useClass: MockCmsService }
      ],
      imports: [RouterTestingModule]
    });
  });

  describe('canActivate', () => {
    it('should return true when CmsService hasPage is true for the page context', inject(
      [CmsService, CmsPageGuards],
      (cmsService: CmsService, cmsPageGuards: CmsPageGuards) => {
        spyOn(cmsService, 'hasPage').and.returnValue(of(true));

        let result: boolean;
        cmsPageGuards
          .canActivate()
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
          .canActivate()
          .subscribe(value => (result = value))
          .unsubscribe();

        expect(result).toBe(false);
      }
    ));

    it('should redirect when CmsService hasPage is false for the page context', inject(
      [CmsService, CmsPageGuards],
      (cmsService: CmsService, cmsPageGuards: CmsPageGuards) => {
        spyOn(cmsService, 'hasPage').and.returnValue(of(false));

        cmsPageGuards
          .canActivate()
          .subscribe()
          .unsubscribe();

        expect(MockRoutingService.go).toHaveBeenCalled();
      }
    ));
  });
});
