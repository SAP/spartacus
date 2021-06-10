import { TestBed } from '@angular/core/testing';
import { RouterState } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CmsService, Page, PageRobotsMeta } from '../../cms';
import { BasePageMetaResolver } from '../../cms/page/base-page-meta.resolver';
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

const mockRouteData: RouterState = {
  state: {
    params: {
      query: 'Canon',
    },
  },
} as any;

const mockRoute = new BehaviorSubject<RouterState>(mockRouteData);

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
    return mockRoute.asObservable();
  }
}
class MockBasePageMetaResolver {
  resolveRobots() {
    return of([]);
  }
  resolveCanonicalUrl(): Observable<string> {
    return of();
  }
}

describe('SearchPageMetaResolver', () => {
  let resolver: SearchPageMetaResolver;
  let basePageMetaResolver: BasePageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        SearchPageMetaResolver,
        { provide: CmsService, useClass: MockCmsService },
        { provide: ProductSearchService, useClass: MockProductSearchService },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: BasePageMetaResolver,
          useClass: MockBasePageMetaResolver,
        },
      ],
    });

    resolver = TestBed.inject(SearchPageMetaResolver);
    basePageMetaResolver = TestBed.inject(BasePageMetaResolver);

    mockRoute.next(mockRouteData);
  });

  it('PageTitleService should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve title', () => {
    let result: string | undefined;
    resolver
      .resolveTitle()
      .subscribe((value) => {
        result = value;
      })
      .unsubscribe();

    expect(result).toEqual('pageMetaResolver.search.title count:3 query:Canon');
  });

  it('should resolve title when no query is given', () => {
    mockRoute.next({
      state: {
        params: {},
      },
    } as any);

    let result: string | undefined;
    resolver
      .resolveTitle()
      .subscribe((value) => {
        result = value;
      })
      .unsubscribe();

    expect(result).toEqual(
      'pageMetaResolver.search.title count:3 query:pageMetaResolver.search.default_title'
    );
  });

  it('should resolve robots from the BasePageMetaResolver', async () => {
    spyOn(basePageMetaResolver, 'resolveRobots').and.returnValue(
      of([PageRobotsMeta.FOLLOW, PageRobotsMeta.INDEX])
    );
    let result: PageRobotsMeta[] | undefined;
    resolver
      .resolveRobots()
      .subscribe((robots) => (result = robots))
      .unsubscribe();
    expect(result).toContain(PageRobotsMeta.FOLLOW);
    expect(result).toContain(PageRobotsMeta.INDEX);
  });

  it('should resolve canonical url from the BasePageMetaResolver.resolveCanonicalUrl()', async () => {
    spyOn(basePageMetaResolver, 'resolveCanonicalUrl').and.callThrough();
    resolver.resolveCanonicalUrl().subscribe().unsubscribe();
    expect(basePageMetaResolver.resolveCanonicalUrl).toHaveBeenCalled();
  });
});
