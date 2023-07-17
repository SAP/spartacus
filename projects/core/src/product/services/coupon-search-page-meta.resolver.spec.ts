import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Params,
} from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../auth/user-auth/facade/auth.service';
import { BreadcrumbMeta, Page } from '../../cms';
import { I18nTestingModule } from '../../i18n';
import { PageType } from '../../model';
import { ProductSearchService } from '../../product/facade/product-search.service';
import { SemanticPathService } from '../../routing';
import { CouponSearchPageResolver } from './coupon-search-page-meta.resolver';

const mockSearchPage: Page = {
  type: PageType.CONTENT_PAGE,
  template: 'SearchResultsListPageTemplate',
  slots: {},
};

const mockAnyContentPage: Page = {
  type: PageType.CONTENT_PAGE,
  template: 'otherPageTemplate',
  slots: {},
};

const mockProductPage: Page = {
  type: PageType.PRODUCT_PAGE,
  template: 'otherPageTemplate',
  slots: {},
};

describe('CouponSearchPageResolver', () => {
  let service: CouponSearchPageResolver;
  let route: ActivatedRoute;
  const authService = jasmine.createSpyObj('AuthService', ['isUserLoggedIn']);
  const semanticPathService = jasmine.createSpyObj('SemanticPathService', [
    'transform',
  ]);

  class MockActivatedRoute {
    getSnapshot = jasmine.createSpy('getSnapshot');
    // we need to spyOnProperty...
    get snapshot() {
      return this.getSnapshot();
    }
  }

  class MockSearchService {
    getResults() {
      return of({
        pagination: {
          totalResults: 3,
        },
      });
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        CouponSearchPageResolver,
        { provide: ProductSearchService, useClass: MockSearchService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: AuthService, useValue: authService },
        { provide: SemanticPathService, useValue: semanticPathService },
      ],
    });

    service = TestBed.inject(CouponSearchPageResolver);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('scoring', () => {
    describe('with coupon', () => {
      beforeEach(() => {
        spyOnProperty(route, 'snapshot').and.returnValue({
          queryParams: {
            couponcode: 'a',
          } as Params,
        } as ActivatedRouteSnapshot);
      });
      it('should score 3 for search page', () => {
        expect(service.getScore(mockSearchPage)).toEqual(3);
      });

      it('should score 1 for other content pages', () => {
        expect(service.getScore(mockAnyContentPage)).toEqual(1);
      });

      it('should score -1 for other pages', () => {
        expect(service.getScore(mockProductPage)).toEqual(-1);
      });
    });

    describe('without coupon', () => {
      beforeEach(() => {
        spyOnProperty(route, 'snapshot').and.returnValue({});
      });

      it('should score 1 for search page without couponcode', () => {
        expect(service.getScore(mockSearchPage)).toEqual(1);
      });

      it('should score -1 for other content pages', () => {
        expect(service.getScore(mockAnyContentPage)).toEqual(-1);
      });

      it('should score -3 for other pages', () => {
        expect(service.getScore(mockProductPage)).toEqual(-3);
      });
    });
  });

  describe('resolve metadata', () => {
    beforeEach(() => {
      spyOnProperty(route, 'snapshot').and.returnValue({
        queryParams: {
          couponcode: 'coupon1',
        } as Params,
      } as ActivatedRouteSnapshot);
    });

    it('should resolve title with count and coupon', () => {
      let result;
      service
        .resolveTitle()
        .subscribe((title) => (result = title))
        .unsubscribe();
      expect(result).toEqual(
        'pageMetaResolver.search.findProductTitle count:3 coupon:coupon1'
      );
    });

    it('should resolve 1 breadcrumbs for anonymous search', () => {
      authService.isUserLoggedIn.and.returnValue(of(false));

      let result: BreadcrumbMeta[];
      service
        .resolveBreadcrumbs()
        .subscribe((breadcrumb) => (result = breadcrumb))
        .unsubscribe();

      expect(result.length).toEqual(1);
      expect(result[0].label).toEqual('common.home');
    });

    it('should resolve 2 breadcrumbs for known user search', () => {
      authService.isUserLoggedIn.and.returnValue(of(true));

      let result: BreadcrumbMeta[];
      service
        .resolveBreadcrumbs()
        .subscribe((breadcrumb) => (result = breadcrumb))
        .unsubscribe();

      expect(result.length).toEqual(2);
      expect(result[0].label).toEqual('common.home');
      expect(result[1].label).toEqual('myCoupons.myCoupons');
    });
  });
});
