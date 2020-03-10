import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from '../../auth/facade/auth.service';
import { PageMeta, PageMetaService } from '../../cms';
import { I18nTestingModule } from '../../i18n';
import { ProductSearchService } from '../../product/facade/product-search.service';
import { RoutingService } from '../../routing/index';
import { FindProductPageMetaResolver } from './find-product-page-meta.resolver';

fdescribe('FindProductSearchPageMetaResolver', () => {
  let service: PageMetaService;

  const prductSearchService = jasmine.createSpyObj('PrductSearchService', [
    'getResults',
  ]);
  const routingService = jasmine.createSpyObj('RoutingService', [
    'getRouterState',
  ]);
  const authService = jasmine.createSpyObj('AuthService', ['isUserLoggedIn']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        FindProductPageMetaResolver,
        { provide: ProductSearchService, useValue: prductSearchService },
        { provide: RoutingService, useValue: routingService },
        { provide: AuthService, useValue: authService },
      ],
    });
    // authService.isUserLoggedIn.and.returnValue(of(false));
    // prductSearchService.getResults.and.returnValue(
    //   of({
    //     pagination: {
    //       totalResults: 3,
    //     },
    //   })
    // );
    // routingService.getRouterState.and.returnValue(
    //   of({
    //     state: {
    //       queryParams: {
    //         couponcode: 'coupon1',
    //       },
    //     },
    //   })
    // );

    service = TestBed.inject(PageMetaService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  xdescribe('ContentPage with customer coupon find product results', () => {
    beforeEach(() => {
      cmsService.getCurrentPage.and.returnValue(of(mockSearchPage));
    });

    it('PageTitleService should be created', inject(
      [PageMetaService],
      (pageTitleService: PageMetaService) => {
        expect(pageTitleService).toBeTruthy();
      }
    ));

    it('FindProductPageMetaResolver should resolve search results in title', () => {
      let result: PageMeta;
      service
        .getMeta()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();
      expect(result['title']).toEqual(
        'pageMetaResolver.search.findProductTitle count:3 coupon:coupon1'
      );
    });

    it('should resolve 1 breadcrumbs when anonymous search', () => {
      let result: PageMeta;
      service
        .getMeta()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result.breadcrumbs.length).toEqual(1);
      expect(result.breadcrumbs[0].label).toEqual('Home');
    });

    it('should resolve 2 breadcrumbs when customer search', () => {
      authService.isUserLoggedIn.and.returnValue(of(true));
      let result: PageMeta;
      service
        .getMeta()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result.breadcrumbs.length).toEqual(2);
      expect(result.breadcrumbs[0].label).toEqual('Home');
      expect(result.breadcrumbs[1].label).toEqual('My Coupons');
    });
  });

  xdescribe('ContentPage with search results', () => {
    beforeEach(() => {
      cmsService.getCurrentPage.and.returnValue(of(mockSearchPage));
      routingService.getRouterState.and.returnValue(
        of({
          state: {
            params: {
              query: 'ordinarySearch',
            },
          },
        })
      );
    });

    it('PageTitleService should be created', inject(
      [PageMetaService],
      (pageTitleService: PageMetaService) => {
        expect(pageTitleService).toBeTruthy();
      }
    ));

    it('FakeSearchPageTitleResolver should resolve search results in title ', () => {
      let result: PageMeta;
      service
        .getMeta()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result.title).toEqual('search page title');
    });
  });

  xdescribe('ContentPage with ordinary page', () => {
    beforeEach(() => {
      cmsService.getCurrentPage.and.returnValue(of(mockContentPage));
    });

    it('FakeContentPageTitleResolver should resolve content page title', () => {
      let result: PageMeta;
      service
        .getMeta()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result.title).toEqual('content page title');
    });
  });
});
