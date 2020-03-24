import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { CmsService, Page } from '../../cms';
import { I18nTestingModule } from '../../i18n';
import { PageType } from '../../model/cms.model';
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

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of(mockPageWithProductList);
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

describe('CategoryPageMetaResolver', () => {
  let service: CategoryPageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        { provide: CmsService, useClass: MockCmsService },
        { provide: ProductSearchService, useClass: MockProductSearchService },
      ],
    });

    service = TestBed.inject(CategoryPageMetaResolver);
  });

  it('should resolve title', () => {
    let result: string;
    service
      .resolveTitle()
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();

    expect(result).toEqual(
      'pageMetaResolver.category.title count:6 query:Hand-held Camcorders'
    );
  });

  it('should resolve breadcrumbs', () => {
    let result: any[];
    service
      .resolveBreadcrumbs()
      .subscribe(value => (result = value))
      .unsubscribe();

    expect(result.length).toEqual(2);
  });
});
