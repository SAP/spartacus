import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import {
  CmsService,
  Page,
  PageMeta,
  PageMetaResolver,
  PageMetaService,
  PageRobotsMeta,
} from '../../cms';
import { I18nTestingModule } from '../../i18n';
import { Cart } from '../../model/cart.model';
import { PageType } from '../../model/cms.model';
import { CartService } from '../facade/cart.service';
import { CartPageMetaResolver } from './cart-page-meta.resolver';

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

describe('CartPageMetaResolver', () => {
  let service: CartPageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
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

    service = TestBed.inject(CartPageMetaResolver);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('deprecated resolve()', () => {
    it('should resolve content page title', () => {
      let result: PageMeta;

      service
        .resolve()
        .subscribe(meta => {
          result = meta;
        })
        .unsubscribe();

      expect(result.title).toEqual('Shopping Cart');
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

  describe('resolvers', () => {
    it(`should resolve {title: 'Shopping Cart'} for resolveTitle`, () => {
      let result: string;

      service
        .resolveTitle()
        .subscribe(meta => {
          result = meta;
        })
        .unsubscribe();

      expect(result).toEqual('Shopping Cart');
    });

    it(`should resolve {robots: ['NOFOLLOW', 'NOINDEX']} with nofollow,noindex`, () => {
      let result: string[];

      service
        .resolveRobots()
        .subscribe(meta => {
          result = meta;
        })
        .unsubscribe();

      expect(result.length).toEqual(2);
      expect(result).toContain('NOFOLLOW');
      expect(result).toContain('NOINDEX');
    });
  });
});
