import { TestBed } from '@angular/core/testing';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { Cart, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SavedCartDetailsService } from './saved-cart-details.service';

const mockCartId = 'test-cart';
const mockSavedCart: Cart = {
  name: 'test-cart-name',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
  description: 'test-cart-description',
};

const mockRouterState = {
  state: {
    params: {
      savedCartId: mockCartId,
    },
  },
};

class MockRoutingService {
  getRouterState() {
    return of(mockRouterState);
  }
}
class MockSavedCartFacade implements Partial<SavedCartFacade> {
  loadSavedCart(_cartId: string): void {}
  get(_cartId: string): Observable<Cart> {
    return of(mockSavedCart);
  }
}

describe('SavedCartDetailsService', () => {
  let service: SavedCartDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: SavedCartFacade, useClass: MockSavedCartFacade },
      ],
    });

    service = TestBed.inject(SavedCartDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the saved cart id', () => {
    let result: string | undefined;

    service
      .getSavedCartId()
      .subscribe((data) => (result = data))
      .unsubscribe();
    expect(result).toEqual(mockCartId);
  });

  it('should get the saved cart details', () => {
    let result: Cart | undefined;

    service
      .getCartDetails()
      .subscribe((data) => (result = data))
      .unsubscribe();
    expect(result).toEqual(mockSavedCart);
  });
});
