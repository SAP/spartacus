import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { CartService } from '../../cart';
import {
  PageMeta,
  PageMetaResolver,
  PageMetaService,
  PageRobotsMeta,
} from '../../cms';
import { CheckoutPageMetaResolver } from './checkout-page-meta.resolver';
import { Cart } from '../../model/cart.model';
import { I18nTestingModule } from '../../i18n';

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

    service = TestBed.get(CheckoutPageMetaResolver);
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
