import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { CartService } from '../../cart';
import {
  PageMeta,
  PageMetaResolver,
  PageMetaService,
  PageRobotsMeta,
} from '../../cms';
import { I18nTestingModule } from '../../i18n';
import { Cart } from '../../model/cart.model';
import { CheckoutPageMetaResolver } from './checkout-page-meta.resolver';

const mockCart: Cart = {
  code: '1234',
  totalItems: 5,
};

class MockCartService {
  getActive(): Observable<Cart> {
    return of(mockCart);
  }
}

describe('CheckoutPageMetaResolver', () => {
  let service: CheckoutPageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        PageMetaService,
        { provide: CartService, useClass: MockCartService },
        {
          provide: PageMetaResolver,
          useExisting: CheckoutPageMetaResolver,
          multi: true,
        },
      ],
    });

    service = TestBed.inject(CheckoutPageMetaResolver);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('deprecated resolve() ', () => {
    it('should resolve content page title with cart code', () => {
      let result: PageMeta;

      service
        .resolve()
        .subscribe(meta => {
          result = meta;
        })
        .unsubscribe();

      expect(result.title).toEqual('pageMetaResolver.checkout.title count:5');
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
    it(`should return 'pageMetaResolver.checkout.title count:5' for resolveTitle()`, () => {
      let result: string;

      service
        .resolveTitle()
        .subscribe(meta => {
          result = meta;
        })
        .unsubscribe();

      expect(result).toEqual('pageMetaResolver.checkout.title count:5');
    });

    it(`should resolve {robots:['NOFOLLOW', 'NOINDEX']} for resolveRobots`, () => {
      let result: string[];

      service
        .resolveRobots()
        .subscribe(meta => {
          result = meta;
        })
        .unsubscribe();

      expect(result.length).toEqual(2);
      expect(result).toContain(PageRobotsMeta.NOINDEX);
      expect(result).toContain(PageRobotsMeta.NOFOLLOW);
    });
  });
});
