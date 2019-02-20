import { TestBed, inject } from '@angular/core/testing';

import { Injectable } from '@angular/core';
import { PageType } from '../../occ/occ-models/occ.models';
import { Observable, of } from 'rxjs';
import {
  Page,
  PageTitleResolver,
  CmsService,
  PageTitleService
} from '../../cms/';
import { ProductSearchService } from '../facade';
import { RoutingService } from '../../routing';
import { SearchPageTitleResolver } from './search-page-title.resolver';

const mockSearchPage: Page = {
  type: PageType.CONTENT_PAGE,
  template: 'SearchResultsListPageTemplate',
  slots: {}
};

const mockContentPage: Page = {
  type: PageType.CONTENT_PAGE,
  template: 'AnyOrdinaryPage',
  title: 'content page title',
  slots: {}
};

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of(mockSearchPage);
  }
}

@Injectable()
class FakeContentPageTitleResolver extends PageTitleResolver {
  constructor(protected cms: CmsService) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
  }

  resolve(): Observable<string> {
    return of('content page title');
  }
}

class MockProductSearchService {
  getSearchResults() {
    return of({
      pagination: {
        totalResults: 3
      }
    });
  }
}

class MockRoutingService {
  getRouterState() {
    return of({
      state: {
        params: {
          query: 'Canon'
        }
      }
    });
  }
}

describe('SearchPageTitleResolver', () => {
  let service: PageTitleService;
  let cmsService: CmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PageTitleService,
        { provide: CmsService, useClass: MockCmsService },
        { provide: ProductSearchService, useClass: MockProductSearchService },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: PageTitleResolver,
          useExisting: FakeContentPageTitleResolver,
          multi: true
        },
        {
          provide: PageTitleResolver,
          useExisting: SearchPageTitleResolver,
          multi: true
        }
      ]
    });

    service = TestBed.get(PageTitleService);
    cmsService = TestBed.get(CmsService);
  });

  describe('ContentPage with search results', () => {
    beforeEach(() => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(of(mockSearchPage));
    });

    it('PageTitleService should be created', inject(
      [PageTitleService],
      (pageTitleService: PageTitleService) => {
        expect(pageTitleService).toBeTruthy();
      }
    ));

    it('should resolve search results in title ', () => {
      let result: string;
      const subscription = service.getTitle().subscribe(value => {
        result = value;
      });
      subscription.unsubscribe();

      expect(result).toEqual('3 results for "Canon"');
    });
  });

  describe('ContentPage without search results', () => {
    beforeEach(() => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(of(mockContentPage));
    });

    it('should resolve content page title', () => {
      let result: string;
      const subscription = service.getTitle().subscribe(value => {
        result = value;
      });
      subscription.unsubscribe();

      expect(result).toEqual('content page title');
    });
  });
});
