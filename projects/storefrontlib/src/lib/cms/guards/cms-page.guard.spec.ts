import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { CmsPageGuards } from './cms-page.guard';
import { RoutingService, PageType, CmsService } from '@spartacus/core';

class MockCmsService {
  hasPage() {}
}
const mockRoutingService = {
  routerState$: new BehaviorSubject(null)
};

describe('CmsPageGuards', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CmsPageGuards,
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: CmsService, useClass: MockCmsService }
      ],
      imports: [RouterTestingModule]
    });

    mockRoutingService.routerState$.next({
      state: {
        url: '/test',
        queryParams: {},
        params: {},
        context: { id: 'testPageId', type: PageType.CONTENT_PAGE }
      }
    });
  });

  describe('canActivate', () => {
    it('should return true when CmsService hasPage is true for the page context', inject(
      [CmsService, CmsPageGuards],
      (cmsService: CmsService, cmsPageGuards: CmsPageGuards) => {
        spyOn(cmsService, 'hasPage').and.returnValue(of(true));
        let result = false;
        cmsPageGuards.canActivate().subscribe(value => (result = value));
        expect(result).toBe(true);
      }
    ));

    it('should return false when CmsService hasPage is false for the page context', inject(
      [CmsService, CmsPageGuards],
      (cmsService: CmsService, cmsPageGuards: CmsPageGuards) => {
        spyOn(cmsService, 'hasPage').and.returnValue(of(false));
        let result = true;
        cmsPageGuards.canActivate().subscribe(value => (result = value));
        expect(result).toBe(false);
      }
    ));
  });
});
