import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { CartService } from '../../cart';
import {
  CmsService,
  Page,
  PageMeta,
  PageMetaResolver,
  PageMetaService,
  PageRobotsMeta,
} from '../../cms';
import { CartPageMetaResolver } from './cart-page-meta.resolver';
import { PageType } from '../../model/cms.model';
import { Cart } from '../../model/cart.model';

const mockContentPage: Page = {
  type: PageType.CONTENT_PAGE,
  template: 'CartPageTemplate',
  title: 'Shopping Cart',
  slots: {},
};

const mockCart: Cart = {
  code: '1234',
};

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of(mockContentPage);
  }
}

class MockCartService {
  getActive(): Observable<Cart> {
    return of(mockCart);
  }
}

describe('CartPageTitleResolver', () => {
  let service: CartPageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PageMetaService,
        { provide: CartService, useClass: MockCartService },
        { provide: CmsService, useClass: MockCmsService },
        {
          provide: PageMetaResolver,
          useExisting: CartPageMetaResolver,
          multi: true,
        },
      ],
    });

    service = TestBed.get(CartPageMetaResolver);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve content page title with cart code', () => {
    let result: PageMeta;

    service
      .resolve()
      .subscribe(meta => {
        result = meta;
      })
      .unsubscribe();

    expect(result.title).toEqual('Shopping Cart (1234)');
  });

  it('should resolve robots with nofollow,noindex', () => {
    let result: PageMeta;

    service
      .resolve()
      .subscribe(meta => {
        result = meta;
      })
      .unsubscribe();

    expect(result.robots).toContain(PageRobotsMeta.NOFOLLOW);
    expect(result.robots).toContain(PageRobotsMeta.NOINDEX);
    expect(result.robots).not.toContain(PageRobotsMeta.FOLLOW);
    expect(result.robots).not.toContain(PageRobotsMeta.INDEX);
  });
});
