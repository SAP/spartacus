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
import { ProductSearchService } from '../facade';
import { SearchPageMetaResolver } from './search-page-meta.resolver';

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

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of(mockSearchPage);
  }
}

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

class MockProductSearchService {
  getResults() {
    return of({
      pagination: {
        totalResults: 3,
      },
    });
  }
}

class MockRoutingService {
  getRouterState() {
    return of({
      state: {
        params: {
          query: 'Canon',
        },
      },
    });
  }
}

describe('SearchPageMetaResolver', () => {
  let service: PageMetaService;
  let cmsService: CmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        PageMetaService,
        FakeContentPageTitleResolver,
        SearchPageMetaResolver,
        { provide: CmsService, useClass: MockCmsService },
        { provide: ProductSearchService, useClass: MockProductSearchService },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: PageMetaResolver,
          useExisting: FakeContentPageTitleResolver,
          multi: true,
        },
        {
          provide: PageMetaResolver,
          useExisting: SearchPageMetaResolver,
          multi: true,
        },
      ],
    });

    service = TestBed.get(PageMetaService);
    cmsService = TestBed.get(CmsService);
  });

  describe('ContentPage with search results', () => {
    beforeEach(() => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(of(mockSearchPage));
    });

    it('PageTitleService should be created', inject(
      [PageMetaService],
      (pageTitleService: PageMetaService) => {
        expect(pageTitleService).toBeTruthy();
      }
    ));

    it('should resolve search results in title ', () => {
      let result: PageMeta;
      service
        .getMeta()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result.title).toEqual(
        'pageMetaResolver.search.title count:3 query:Canon'
      );
    });
  });

  describe('ContentPage without search results', () => {
    beforeEach(() => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(of(mockContentPage));
    });

    it('should resolve content page title', () => {
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
