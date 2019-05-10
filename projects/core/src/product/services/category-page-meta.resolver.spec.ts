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
import { RoutingService } from '../../routing';
import { ProductSearchService } from '../facade';
import { CategoryPageMetaResolver } from './category-page-meta.resolver';
import { PageType } from '../../model/cms.model';

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
  getSearchResults() {
    return of({
      breadcrumbs: [
        {
          facetValueName: 'Hand-held Camcorders',
        },
      ],
      pagination: {
        totalResults: 6,
      },
    });
  }
}
class MockRoutingService {}

describe('CategoryPageTitleResolver', () => {
  let service: PageMetaService;
  let cmsService: CmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
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

      expect(result.title).toEqual('6 results for Hand-held Camcorders');
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
      console.log(result.breadcrumbs);
      expect(result.breadcrumbs[1].label).toEqual('Hand-held Camcorders');
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
