import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { RoutingService, CmsService, PageType } from '@spartacus/core';
import { ContentPageGuard } from './content-page.guard';
import { ActivatedRouteSnapshot } from '@angular/router';
import { take } from 'rxjs/operators';

describe('ContentPageGuard', () => {
  let routingService: RoutingService;
  let cmsService: CmsService;
  let guard: ContentPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContentPageGuard,
        { provide: RoutingService, useValue: { go: () => {} } },
        { provide: CmsService, useValue: { hasPage: () => {} } }
      ],
      imports: [RouterTestingModule]
    });

    routingService = TestBed.get(RoutingService);
    cmsService = TestBed.get(CmsService);
    guard = TestBed.get(ContentPageGuard);
  });

  describe('canActivate', () => {
    let route;

    beforeEach(() => {
      route = { url: [{ path: 'test1' }, { path: 'test2' }] }; // equivalent to "test1/test2"
    });

    it('should call CmsService hasPage with current path as "id" and "ContentPage" as type', () => {
      spyOn(cmsService, 'hasPage').and.returnValue(of(undefined));
      guard
        .canActivate(route as ActivatedRouteSnapshot)
        .pipe(take(1))
        .subscribe();
      expect(cmsService.hasPage).toHaveBeenCalledWith({
        id: 'test1/test2',
        type: PageType.CONTENT_PAGE
      });
    });

    it('should emit true when CmsService hasPage emits true', () => {
      spyOn(cmsService, 'hasPage').and.returnValue(of(true));
      let result;
      guard
        .canActivate(route as ActivatedRouteSnapshot)
        .pipe(take(1))
        .subscribe(value => (result = value));
      expect(result).toBe(true);
    });

    it('should emit false when CmsService hasPage emits false', () => {
      spyOn(cmsService, 'hasPage').and.returnValue(of(false));
      let result;
      guard
        .canActivate(route as ActivatedRouteSnapshot)
        .pipe(take(1))
        .subscribe(value => (result = value));
      expect(result).toBe(false);
    });

    it('should redirect to "page not found" when CmsService hasPage emits false', () => {
      spyOn(cmsService, 'hasPage').and.returnValue(of(false));
      spyOn(routingService, 'go');
      guard
        .canActivate(route as ActivatedRouteSnapshot)
        .pipe(take(1))
        .subscribe();
      expect(routingService.go).toHaveBeenCalledWith({
        route: ['pageNotFound']
      });
    });

    it('should redirect to "page not found" when CmsService hasPage throws error', () => {
      spyOn(cmsService, 'hasPage').and.returnValue(throwError('test error'));
      spyOn(routingService, 'go');
      guard
        .canActivate(route as ActivatedRouteSnapshot)
        .pipe(take(1))
        .subscribe();
      expect(routingService.go).toHaveBeenCalledWith({
        route: ['pageNotFound']
      });
    });
  });
});
