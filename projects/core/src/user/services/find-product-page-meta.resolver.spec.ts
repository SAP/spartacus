import { Injectable } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import {
  CmsService,
  Page,
  PageMeta,
  PageMetaResolver,
  PageMetaService,
} from '../../cms';
import { I18nTestingModule } from '../../i18n';
import { PageType } from '../../model/cms.model';
import { RoutingService } from '../../routing';

import { FindProductPageMetaResolver } from './find-product-page-meta.resolver';
import { ProductSearchService } from '../../product/facade/product-search.service';

const mockSearchPage: Page = {
  type: PageType.CONTENT_PAGE,
  template: 'SearchResultsListPageTemplate',
  slots: {},
};

const mockContentPage: Page = {
  type: PageType.CONTENT_PAGE,
  template: 'AnyOrdinaryPage',
  title: 'content page title',
  slots: {},
};

@Injectable()
class FakeContentPageTitleResolver extends PageMetaResolver {
  constructor(protected cms: CmsService) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
  }

  resolve(): Observable<PageMeta> {
    return of({
      title: 'content page title',
    });
  }
}

@Injectable()
class FakeSearchPageTitleResolver extends PageMetaResolver {
  constructor(protected cms: CmsService) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'SearchResultsListPageTemplate';
  }

  resolve(): Observable<PageMeta> {
    return of({
      title: 'search page title',
    });
  }
}

describe('FindProductSearchPageMetaResolver', () => {
  let service: PageMetaService;
  let cmsService = jasmine.createSpyObj('CmsService', ['getCurrentPage']);
  const prductSearchService = jasmine.createSpyObj('PrductSearchService', [
    'getResults',
  ]);
  const routingService = jasmine.createSpyObj('RoutingService', [
    'getRouterState',
  ]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        PageMetaService,
        FakeContentPageTitleResolver,
        FakeSearchPageTitleResolver,
        FindProductPageMetaResolver,
        { provide: CmsService, useValue: cmsService },
        { provide: ProductSearchService, useValue: prductSearchService },
        { provide: RoutingService, useValue: routingService },
        {
          provide: PageMetaResolver,
          useExisting: FakeContentPageTitleResolver,
          multi: true,
        },
        {
          provide: PageMetaResolver,
          useExisting: FakeSearchPageTitleResolver,
          multi: true,
        },
        {
          provide: PageMetaResolver,
          useExisting: FindProductPageMetaResolver,
          multi: true,
        },
      ],
    });
    cmsService.getCurrentPage.and.returnValue(of());
    prductSearchService.getResults.and.returnValue(
      of({
        pagination: {
          totalResults: 3,
        },
      })
    );

    service = TestBed.get(PageMetaService);
    cmsService = TestBed.get(CmsService);
  });

  describe('ContentPage with customer coupon find product results', () => {
    beforeEach(() => {
      cmsService.getCurrentPage.and.returnValue(of(mockSearchPage));
      routingService.getRouterState.and.returnValue(
        of({
          state: {
            params: {
              query: ':relevance:category:1:couponTest',
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

    it('FindProductPageMetaResolver should resolve search results in title', () => {
      let result: PageMeta;
      service
        .getMeta()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result.title).toEqual(
        'pageMetaResolver.search.findProductTitle count:3'
      );
    });

    it('should resolve 2 breadcrumbs', () => {
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

  describe('ContentPage with search results', () => {
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

  describe('ContentPage with ordinary page', () => {
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
