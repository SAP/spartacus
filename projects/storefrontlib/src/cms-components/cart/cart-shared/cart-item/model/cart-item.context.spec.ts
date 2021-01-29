import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { OrderEntry, PromotionLocation } from '@spartacus/core';
import { CartItemComponentOptions } from '../cart-item.component';
import { CartItemContextSource } from './cart-item.context';

describe('CartItemContextSource', () => {
  let contextSource: CartItemContextSource;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartItemContextSource],
    });

    contextSource = TestBed.inject(CartItemContextSource);
  });

  it('should transmit compact', (done) => {
    contextSource._compact$.next(true);
    contextSource.compact$.subscribe((value) => {
      expect(value).toBe(true);
      done();
    });
  });

  it('should transmit readonly', (done) => {
    contextSource._readonly$.next(false);
    contextSource.readonly$.subscribe((value) => {
      expect(value).toBe(false);
      done();
    });
  });

  it('should transmit item', (done) => {
    const item: OrderEntry = { orderCode: '123' };
    contextSource._item$.next(item);
    contextSource.item$.subscribe((value) => {
      expect(value).toBe(item);
      done();
    });
  });

  it('should transmit quantityControl', (done) => {
    const quantityControl = new FormControl();
    contextSource._quantityControl$.next(quantityControl);
    contextSource._quantityControl$.subscribe((value) => {
      expect(value).toBe(quantityControl);
      done();
    });
  });

  it('should transmit promotionLocation', (done) => {
    const promotionLocation: PromotionLocation = PromotionLocation.Order;
    contextSource._promotionLocation$.next(promotionLocation);
    contextSource.promotionLocation$.subscribe((value) => {
      expect(value).toBe(promotionLocation);
      done();
    });
  });

  it('should transmit options', (done) => {
    const options: CartItemComponentOptions = { isSaveForLater: true };
    contextSource._options$.next(options);
    contextSource.options$.subscribe((value) => {
      expect(value).toBe(options);
      done();
    });
  });
});
