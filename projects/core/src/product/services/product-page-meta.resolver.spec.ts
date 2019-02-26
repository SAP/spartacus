import { TestBed, inject } from '@angular/core/testing';

import { PageType } from '../../occ/occ-models/occ.models';
import { Observable, of } from 'rxjs';
import {
  Page,
  PageMetaResolver,
  CmsService,
  PageMetaService,
  PageMeta
} from '../../cms';
import { ProductService } from '../facade';
import { RoutingService } from '../../routing';
import { ProductPageMetaResolver } from './product-page-meta.resolver';

const mockProductPage: Page = {
  type: PageType.PRODUCT_PAGE,
  title: 'content page title',
  slots: {}
};

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of(mockProductPage);
  }
}

class MockRoutingService {
  getRouterState() {
    return of({
      state: {
        params: {
          productCode: '1234'
        }
      }
    });
  }
}

class MockProductService {
  get(code: string) {
    return of({
      code: code,
      name: 'Product title',
      summary: 'Product summary'
    });
  }
}

describe('ProductPageTitleResolver', () => {
  let service: PageMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PageMetaService,
        { provide: CmsService, useClass: MockCmsService },
        { provide: ProductService, useClass: MockProductService },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: PageMetaResolver,
          useExisting: ProductPageMetaResolver,
          multi: true
        }
      ]
    });

    service = TestBed.get(PageMetaService);
  });

  it('ProductTitleService should be created', inject(
    [PageMetaService],
    (pageTitleService: PageMetaService) => {
      expect(pageTitleService).toBeTruthy();
    }
  ));

  it('should resolve product page title', () => {
    let result: PageMeta;
    service
      .getMeta()
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();

    expect(result.title).toEqual('Product title');
  });

  it('should have product description', () => {
    let result: PageMeta;
    service
      .getMeta()
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();

    expect(result.description).toEqual('Product summary');
  });
});
