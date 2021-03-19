import { TestBed } from '@angular/core/testing';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import { Cart, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SavedCartDetailService } from './saved-cart-detail.service';

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
class MockSavedCartService implements Partial<SavedCartService> {
  loadSavedCart(_cartId: string): void {}
  get(_cartId: string): Observable<Cart> {
    return of(mockSavedCart);
  }
}

describe('SavedCartDetailService', () => {
  let service: SavedCartDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: SavedCartService, useClass: MockSavedCartService },
      ],
    });

    service = TestBed.inject(SavedCartDetailService);
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
