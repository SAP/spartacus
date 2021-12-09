import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { Cart, MultiCartFacade, ProductData } from '@spartacus/cart/main/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { UserIdService } from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { NewSavedCartOrderEntriesContext } from './new-saved-cart-order-entries.context';
import createSpy = jasmine.createSpy;

const mockActionsSubject = new Subject<Action>();

const mockUserId = 'test-user';
const mockCartId = '00004546';

const mockSavedCart = { name: 'mockSavedCart', description: 'mock saved cart' };

const mockCartData: Cart = {
  code: mockCartId,
};

const mockProductData: ProductData[] = [
  { productCode: '693923', quantity: 1 },
  { productCode: '232133', quantity: 2 },
];

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.returnValue(of(mockUserId));
}

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  createCart = createSpy().and.returnValue(of(mockCartData));
  addEntries = createSpy().and.callThrough();
}

class MockSavedCartService implements Partial<SavedCartFacade> {
  saveCart = createSpy().and.callThrough();
  loadSavedCarts = createSpy().and.callThrough();
  getSaveCartProcessLoading = createSpy().and.returnValue(of(false));
}

describe('NewSavedCartOrderEntriesContext', () => {
  let service: NewSavedCartOrderEntriesContext;
  let multiCartService: MultiCartFacade;
  let savedCartService: SavedCartFacade;
  let userIdService: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { useValue: mockActionsSubject, provide: ActionsSubject },
        { useClass: MockSavedCartService, provide: SavedCartFacade },
        { useClass: MockMultiCartFacade, provide: MultiCartFacade },
        { useClass: MockUserIdService, provide: UserIdService },
      ],
    });
    service = TestBed.inject(NewSavedCartOrderEntriesContext);
    multiCartService = TestBed.inject(MultiCartFacade);
    savedCartService = TestBed.inject(SavedCartFacade);
    userIdService = TestBed.inject(UserIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addEntries', () => {
    it('should create, save and load cart', () => {
      service.addEntries(mockProductData, mockSavedCart).subscribe();

      expect(userIdService.takeUserId).toHaveBeenCalledWith();
      expect(multiCartService.createCart).toHaveBeenCalledWith({
        userId: mockUserId,
        extraData: { active: false },
      });
      expect(savedCartService.saveCart).toHaveBeenCalledWith({
        cartId: mockCartId,
        saveCartName: mockSavedCart.name,
        saveCartDescription: mockSavedCart.description,
      });
      expect(savedCartService.loadSavedCarts).toHaveBeenCalled();
      expect(multiCartService.addEntries).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        mockProductData
      );
    });
  });
});
