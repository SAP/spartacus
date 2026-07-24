import { TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import {
  CartItemComponentOptions,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { firstValueFrom } from 'rxjs';
import { CartItemContextSource } from './cart-item-context-source.model';

describe('CartItemContextSource', () => {
  let contextSource: CartItemContextSource;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartItemContextSource],
    });

    contextSource = TestBed.inject(CartItemContextSource);
  });

  it('should replay latest value of "compact"', async () => {
    contextSource.compact$.next(true);
    const value = await firstValueFrom(contextSource.compact$);
    expect(value).toBe(true);
  });

  it('should replay latest value of "readonly"', async () => {
    contextSource.readonly$.next(false);
    const value = await firstValueFrom(contextSource.readonly$);
    expect(value).toBe(false);
  });

  it('should replay latest value of "item"', async () => {
    const item: OrderEntry = { orderCode: '123' };
    contextSource.item$.next(item);
    const value = await firstValueFrom(contextSource.item$);
    expect(value).toBe(item);
  });

  it('should replay latest value of "quantityControl"', async () => {
    const quantityControl = new UntypedFormControl();
    contextSource.quantityControl$.next(quantityControl);
    const value = await firstValueFrom(contextSource.quantityControl$);
    expect(value).toBe(quantityControl);
  });

  it('should replay latest value of "promotionLocation"', async () => {
    const promotionLocation: PromotionLocation = PromotionLocation.Order;
    contextSource.location$.next(promotionLocation);
    const value = await firstValueFrom(contextSource.location$);
    expect(value).toBe(promotionLocation);
  });

  it('should replay latest value of "options"', async () => {
    const options: CartItemComponentOptions = { isSaveForLater: true };
    contextSource.options$.next(options);
    const value = await firstValueFrom(contextSource.options$);
    expect(value).toBe(options);
  });
});
