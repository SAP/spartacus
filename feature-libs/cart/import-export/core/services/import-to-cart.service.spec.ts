import { TestBed } from '@angular/core/testing';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import { Cart, MultiCartService, UserIdService } from '@spartacus/core';
import { ProcessesLoaderState } from 'projects/core/src/state/utils/utils-group';
import { of } from 'rxjs';
import { ImportToCartService } from './import-to-cart.service';
import createSpy = jasmine.createSpy;

describe('ImportToCartService', () => {
  let service: ImportToCartService;
  const userId = 'currentUserId';
  const mockCreateCart: ProcessesLoaderState<Cart> = {};

  class MockUserIdService implements Partial<UserIdService> {
    invokeWithUserId = createSpy().and.callFake((cb) => cb(userId));
  }

  class MockMultiCartService implements Partial<MultiCartService> {
    createCart() {
      return of(mockCreateCart);
    }
    addEntries() {}
  }

  class MockSavedCartService implements Partial<SavedCartService> {
    saveCart() {}
    loadSavedCarts() {}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: MultiCartService, useClass: MockMultiCartService },
        { provide: SavedCartService, useClass: MockSavedCartService },
      ],
    });
    service = TestBed.inject(ImportToCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
