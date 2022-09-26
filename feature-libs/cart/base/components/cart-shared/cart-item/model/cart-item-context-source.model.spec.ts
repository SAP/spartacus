import { TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import {
  CartItemComponentOptions,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { CartItemContextSource } from './cart-item-context-source.model';

describe('CartItemContextSource', () => {
  let contextSource: CartItemContextSource;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartItemContextSource],
    });

    contextSource = TestBed.inject(CartItemContextSource);
  });

  it('should replay latest value of "compact"', (done) => {
    contextSource.compact$.next(true);
    contextSource.compact$.subscribe((value) => {
      expect(value).toBe(true);
      done();
    });
  });

  it('should replay latest value of "readonly"', (done) => {
    contextSource.readonly$.next(false);
    contextSource.readonly$.subscribe((value) => {
      expect(value).toBe(false);
      done();
    });
  });

  it('should replay latest value of "item"', (done) => {
    const item: OrderEntry = { orderCode: '123' };
    contextSource.item$.next(item);
    contextSource.item$.subscribe((value) => {
      expect(value).toBe(item);
      done();
    });
  });

  it('should replay latest value of "quantityControl"', (done) => {
    const quantityControl = new UntypedFormControl();
    contextSource.quantityControl$.next(quantityControl);
    contextSource.quantityControl$.subscribe((value) => {
      expect(value).toBe(quantityControl);
      done();
    });
  });

  it('should replay latest value of "promotionLocation"', (done) => {
    const promotionLocation: PromotionLocation = PromotionLocation.Order;
    contextSource.location$.next(promotionLocation);
    contextSource.location$.subscribe((value) => {
      expect(value).toBe(promotionLocation);
      done();
    });
  });

  it('should replay latest value of "options"', (done) => {
    const options: CartItemComponentOptions = { isSaveForLater: true };
    contextSource.options$.next(options);
    contextSource.options$.subscribe((value) => {
      expect(value).toBe(options);
      done();
    });
  });
});
