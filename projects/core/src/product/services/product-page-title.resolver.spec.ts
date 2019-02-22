import { TestBed, inject } from '@angular/core/testing';

import { PageType } from '../../occ/occ-models/occ.models';
import { Observable, of } from 'rxjs';
import {
  Page,
  PageTitleResolver,
  CmsService,
  PageTitleService
} from '../../cms/';
import { ProductService } from '../facade';
import { RoutingService } from '../../routing';
import { ProductPageTitleResolver } from './product-page-title.resolver';

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
      name: 'Product title'
    });
  }
}

describe('ProductPageTitleResolver', () => {
  let service: PageTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PageTitleService,
        { provide: CmsService, useClass: MockCmsService },
        { provide: ProductService, useClass: MockProductService },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: PageTitleResolver,
          useExisting: ProductPageTitleResolver,
          multi: true
        }
      ]
    });

    service = TestBed.get(PageTitleService);
  });

  it('ProductTitleService should be created', inject(
    [PageTitleService],
    (pageTitleService: PageTitleService) => {
      expect(pageTitleService).toBeTruthy();
    }
  ));

  it('should resolve product page title', () => {
    let result: string;
    service
      .getTitle()
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();

    expect(result).toEqual('Product title');
  });
});
