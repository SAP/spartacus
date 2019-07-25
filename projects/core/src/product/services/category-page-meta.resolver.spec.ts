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
import { CategoryPageMetaResolver } from './category-page-meta.resolver';

const mockPageWithProductList: Page = {
  type: PageType.CATEGORY_PAGE,
  slots: {
    slotA: {
      components: [
        {
          typeCode: 'CMSProductListComponent',
        },
      ],
    },
  },
};

const mockProductWithContent: Page = {
  type: PageType.CATEGORY_PAGE,
  title: 'content page title',
  slots: {},
};

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of(mockPageWithProductList);
  }
}

@Injectable()
class ContentPageTitleResolver extends PageMetaResolver {
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
      breadcrumbs: [
        {
          facetCode: 'category',
          facetValueCode: '1234',
          facetValueName: 'Hand-held Camcorders',
        },
        {
          facetCode: 'notBreadcrumbFacet',
          facetValueCode: '567',
          facetValueName: 'any',
        },
      ],
      pagination: {
        totalResults: 6,
      },
    });
  }
}
class MockRoutingService {}

describe('CategoryPageMetaResolver', () => {
  let service: PageMetaService;
  let cmsService: CmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        PageMetaService,
        ContentPageTitleResolver,
        { provide: CmsService, useClass: MockCmsService },
        { provide: ProductSearchService, useClass: MockProductSearchService },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: PageMetaResolver,
          useExisting: ContentPageTitleResolver,
          multi: true,
        },
        {
          provide: PageMetaResolver,
          useExisting: CategoryPageMetaResolver,
          multi: true,
        },
      ],
    });

    service = TestBed.get(PageMetaService);
    cmsService = TestBed.get(CmsService);
  });

  describe('CategoryPage with products', () => {
    beforeEach(() => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(
        of(mockPageWithProductList)
      );
    });

    it('PageTitleService should be created', inject(
      [PageMetaService],
      (pageTitleService: PageMetaService) => {
        expect(pageTitleService).toBeTruthy();
      }
    ));

    it('should resolve category page title with product listing', () => {
      let result: PageMeta;
      service
        .getMeta()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result.title).toEqual(
        'pageMetaResolver.category.title count:6 query:Hand-held Camcorders'
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
    });

    it('should resolve 2nd breadcrumbs with facetValueName', () => {
      let result: PageMeta;
      service
        .getMeta()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();
      expect(result.breadcrumbs[1].label).toEqual('Hand-held Camcorders');
    });

    it('should not resolve 3rd breadcrumbs for non-category facet', () => {
      let result: PageMeta;
      service
        .getMeta()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();
      expect(result.breadcrumbs.length).toEqual(2);
    });
  });

  describe('CategoryPage with only content', () => {
    beforeEach(() => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(
        of(mockProductWithContent)
      );
    });

    it('should resolve category page title', () => {
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
