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
import { CategoryPageTitleResolver } from './category-page-title.resolver';

const mockPageWithProductList: Page = {
  type: PageType.CATEGORY_PAGE,
  slots: {
    slotA: {
      components: [
        {
          typeCode: 'CMSProductListComponent'
        }
      ]
    }
  }
};

const mockProductWithContent: Page = {
  type: PageType.CATEGORY_PAGE,
  title: 'content page title',
  slots: {}
};

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of(mockPageWithProductList);
  }
}

@Injectable({
  providedIn: 'root'
})
class ContentPageTitleResolver extends PageTitleResolver {
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
      breadcrumbs: [
        {
          facetValueName: 'Hand-held Camcorders'
        }
      ],
      pagination: {
        totalResults: 6
      }
    });
  }
}
class MockRoutingService {}

fdescribe('CategoryPageTitleResolver', () => {
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
          useExisting: ContentPageTitleResolver,
          multi: true
        },
        {
          provide: PageTitleResolver,
          useExisting: CategoryPageTitleResolver,
          multi: true
        }
      ]
    });

    service = TestBed.get(PageTitleService);
    cmsService = TestBed.get(CmsService);
  });

  describe('CategoryPage with products', () => {
    beforeEach(() => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(
        of(mockPageWithProductList)
      );
    });

    it('PageTitleService should be created', inject(
      [PageTitleService],
      (pageTitleService: PageTitleService) => {
        expect(pageTitleService).toBeTruthy();
      }
    ));

    it('should resolve category page title with product listing', () => {
      let result: string;
      const subscription = service.getTitle().subscribe(value => {
        result = value;
      });
      subscription.unsubscribe();

      expect(result).toEqual('6 results for Hand-held Camcorders');
    });
  });

  describe('CategoryPage with only content', () => {
    beforeEach(() => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(
        of(mockProductWithContent)
      );
    });

    it('should resolve category page title', () => {
      let result: string;
      const subscription = service.getTitle().subscribe(value => {
        result = value;
      });
      subscription.unsubscribe();

      expect(result).toEqual('content page title');
    });
  });
});
