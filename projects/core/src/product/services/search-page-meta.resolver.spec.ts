import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { CmsService, Page } from '../../cms';
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

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of(mockSearchPage);
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
  let service: SearchPageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        SearchPageMetaResolver,
        { provide: CmsService, useClass: MockCmsService },
        { provide: ProductSearchService, useClass: MockProductSearchService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });

    service = TestBed.inject(SearchPageMetaResolver);
  });

  it('PageTitleService should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('deprecated resolve()', () => {
    it(`should return {title: 'pageMetaResolver.search.title count:3 query:Canon'} for resolve method`, () => {
      let result: string;
      service
        .resolve()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result).toEqual(
        'pageMetaResolver.search.title count:3 query:Canon'
      );
    });
  });

  describe('resolvers', () => {
    it('should return title for resolveTitle with arguments', () => {
      let result: { title: string } | string;
      service
        .resolveTitle(100, 'MYBRAND')
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result).toEqual(
        'pageMetaResolver.search.title count:100 query:MYBRAND'
      );
    });
  });
});
