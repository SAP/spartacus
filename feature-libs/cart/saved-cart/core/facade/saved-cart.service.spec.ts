import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  Cart,
  MultiCartService,
  ProcessModule,
  StateUtils,
  StateWithMultiCart,
  User,
  UserIdService,
  UserService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { SavedCartActions } from '../store/actions/index';
import { SavedCartService } from './saved-cart.service';

import createSpy = jasmine.createSpy;

const mockUserId = 'test-user';
const mockCartId = 'test-cart';
const mockCartName = 'test-cart-name';
const mockCartDescription = 'test-cart-description';
const mockError = 'test-error';

const mockUser: User = {
  customerId: 'test-customer',
};

const mockSavedCarts: Cart[] = [
  {
    code: mockCartId,
    name: 'test-cart-name',
    entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
    description: 'test-cart-description',
    saveTime: new Date('1994-01-11T00:00Z'),
  },
  {
    name: 'test-cart-name2',
    entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
    saveTime: new Date('1994-01-11T00:00Z'),
  },
];

const mockSavedCartsWithWishListAndSelectiveCart: Cart[] = [
  ...mockSavedCarts,
  {
    name: `wishlist${mockUser.customerId}`,
    entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
    saveTime: new Date('1994-01-11T00:00Z'),
  },
  {
    code: 'selectivecart-test-cart-name4',
    name: 'test-cart-name4',
    entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
    saveTime: new Date('1994-01-11T00:00Z'),
  },
];

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.returnValue(of(mockUserId));
}

class MockUserService implements Partial<UserService> {
  get = createSpy().and.returnValue(of(mockUser));
}

class MockMultiCartService implements Partial<MultiCartService> {
  getCartEntity = createSpy().and.returnValue(of({}));
  isStable = createSpy().and.returnValue(of(true));
  getCarts = createSpy().and.returnValue(of(mockSavedCarts));
  deleteCart = createSpy();
}

describe('SavedCartService', () => {
  let service: SavedCartService;
  let store: Store<StateWithMultiCart>;
  let userIdService: UserIdService;
  let multiCartService: MultiCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), ProcessModule.forRoot()],
      providers: [
        SavedCartService,
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: UserService, useClass: MockUserService },
        { provide: MultiCartService, useClass: MockMultiCartService },
      ],
    });

    service = TestBed.inject(SavedCartService);
    store = TestBed.inject(Store);
    userIdService = TestBed.inject(UserIdService);
    multiCartService = TestBed.inject(MultiCartService);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Single saved cart', () => {
    it('should dispatch a load a single saved cart details ', () => {
      service.loadSavedCart(mockCartId);
      expect(store.dispatch).toHaveBeenCalledWith(
        new SavedCartActions.LoadSavedCart({
          userId: mockUserId,
          cartId: mockCartId,
        })
      );
    });

    it('should be able to trigger loadSavedCart(userId) when state is not in store', () => {
      let result: Cart | undefined;
      service
        .get(mockCartId)
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(result).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new SavedCartActions.LoadSavedCart({
          userId: mockUserId,
          cartId: mockCartId,
        })
      );
    });

    it('should not trigger loadSavedCart(userId) when state is in store', () => {
      multiCartService.getCartEntity = createSpy().and.returnValue(
        of({
          value: mockSavedCarts[0],
          loading: false,
          success: true,
          error: false,
        })
      );

      let result: Cart | undefined;
      service
        .get(mockCartId)
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(userIdService.takeUserId).not.toHaveBeenCalledWith();
      expect(result).toEqual(mockSavedCarts[0]);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new SavedCartActions.LoadSavedCart({
          userId: mockUserId,
          cartId: mockCartId,
        })
      );
    });
  });

  it('should return state of the saved cart', () => {
    multiCartService.getCartEntity = createSpy().and.returnValue(
      of({
        value: mockSavedCarts[0],
        loading: false,
        success: true,
        error: false,
      })
    );

    let result: StateUtils.ProcessesLoaderState<Cart> | undefined;

    service
      .getSavedCart(mockCartId)
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toEqual({
      value: mockSavedCarts[0],
      loading: false,
      success: true,
      error: false,
    });
  });

  it('should return stability of the saved cart', () => {
    let result: boolean | undefined;

    service
      .isStable(mockCartId)
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toEqual(true);
  });

  describe('List of Saved Carts', () => {
    it('should dispatch a load for a list of saved carts ', () => {
      multiCartService.getCarts = createSpy().and.returnValue(
        of(mockSavedCarts)
      );

      service.loadSavedCarts();
      expect(store.dispatch).toHaveBeenCalledWith(
        new SavedCartActions.LoadSavedCarts({
          userId: mockUserId,
        })
      );
    });

    it('should be able to trigger loadSavedCarts() when state is not in store', () => {
      let result: Cart[] | undefined;
      service
        .getList()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(result).toEqual(mockSavedCarts);
      expect(store.dispatch).toHaveBeenCalledWith(
        new SavedCartActions.LoadSavedCarts({
          userId: mockUserId,
        })
      );
    });

    it('should NOT trigger loadSavedCarts when state is in store', () => {
      store.dispatch(
        new SavedCartActions.LoadSavedCartsSuccess({ userId: mockUserId })
      );

      let result: Cart[] | undefined;
      service
        .getList()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(userIdService.takeUserId).not.toHaveBeenCalledWith();
      expect(result).toEqual(mockSavedCarts);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new SavedCartActions.LoadSavedCarts({
          userId: mockUserId,
        })
      );
    });

    it('should filter saved carts without wishlist and selective carts', () => {
      multiCartService.getCarts = createSpy().and.returnValue(
        of(mockSavedCartsWithWishListAndSelectiveCart)
      );

      store.dispatch(
        new SavedCartActions.LoadSavedCartsSuccess({ userId: mockUserId })
      );

      let result: Cart[] | undefined;
      service
        .getList()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(userIdService.takeUserId).not.toHaveBeenCalledWith();
      expect(result).toEqual(mockSavedCarts);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new SavedCartActions.LoadSavedCarts({
          userId: mockUserId,
        })
      );
    });

    it('should return the loader state', () => {
      store.dispatch(
        new SavedCartActions.LoadSavedCartsSuccess({ userId: mockUserId })
      );

      let result: StateUtils.LoaderState<any> | undefined;

      service
        .getSavedCartListProcess()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        success: true,
        error: false,
        value: { userId: mockUserId },
      });
    });

    it('should clear the saved cart process list state', () => {
      service.clearSavedCarts();

      expect(store.dispatch).toHaveBeenCalledWith(
        new SavedCartActions.ClearSavedCarts()
      );
    });
  });

  describe('Restore saved cart', () => {
    it('should dispatch a restore of a single saved cart ', () => {
      service.restoreSavedCart(mockCartId);
      expect(store.dispatch).toHaveBeenCalledWith(
        new SavedCartActions.RestoreSavedCart({
          userId: mockUserId,
          cartId: mockCartId,
        })
      );
    });

    it('should clear the restore saved cart process state', () => {
      service.clearRestoreSavedCart();

      expect(store.dispatch).toHaveBeenCalledWith(
        new SavedCartActions.ClearRestoreSavedCart()
      );
    });

    it('should return the loading flag', () => {
      store.dispatch(
        new SavedCartActions.RestoreSavedCartSuccess({
          userId: mockUserId,
          cartId: mockCartId,
        })
      );

      let result: boolean | undefined;

      service
        .getRestoreSavedCartProcessLoading()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(false);
    });

    it('should return the success flag', () => {
      store.dispatch(
        new SavedCartActions.RestoreSavedCartSuccess({
          userId: mockUserId,
          cartId: mockCartId,
        })
      );

      let result: boolean | undefined;

      service
        .getRestoreSavedCartProcessSuccess()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should return the error flag', () => {
      store.dispatch(
        new SavedCartActions.RestoreSavedCartFail({
          userId: mockUserId,
          cartId: mockCartId,
          error: mockError,
        })
      );

      let result: boolean | undefined;

      service
        .getRestoreSavedCartProcessError()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });

  describe('Delete a saved cart', () => {
    it('should dispatch a delete of a single saved cart ', () => {
      service.deleteSavedCart(mockCartId);
      expect(multiCartService.deleteCart).toHaveBeenCalledWith(
        mockCartId,
        mockUserId
      );
    });
  });

  describe('Edit a saved cart', () => {
    it('should dispatch an edit saved cart ', () => {
      service.editSavedCart({
        cartId: mockCartId,
        saveCartName: mockCartName,
        saveCartDescription: mockCartDescription,
      });

      expect(store.dispatch).toHaveBeenCalledWith(
        new SavedCartActions.EditSavedCart({
          userId: mockUserId,
          cartId: mockCartId,
          saveCartName: mockCartName,
          saveCartDescription: mockCartDescription,
        })
      );
    });

    it('should return the loading flag', () => {
      store.dispatch(
        new SavedCartActions.EditSavedCartSuccess({
          userId: mockUserId,
          cartId: mockCartId,
        })
      );

      let result: boolean | undefined;

      service
        .getSaveCartProcessLoading()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(false);
    });

    it('should return the success flag', () => {
      store.dispatch(
        new SavedCartActions.EditSavedCartSuccess({
          userId: mockUserId,
          cartId: mockCartId,
        })
      );

      let result: boolean | undefined;

      service
        .getSaveCartProcessSuccess()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should return the error flag', () => {
      store.dispatch(
        new SavedCartActions.EditSavedCartFail({
          userId: mockUserId,
          cartId: mockCartId,
          error: mockError,
        })
      );

      let result: boolean | undefined;

      service
        .getSaveCartProcessError()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });

  describe('Save cart', () => {
    it('should dispatch a save cart ', () => {
      service.saveCart({
        cartId: mockCartId,
        saveCartName: mockCartName,
        saveCartDescription: mockCartDescription,
      });
      expect(store.dispatch).toHaveBeenCalledWith(
        new SavedCartActions.SaveCart({
          userId: mockUserId,
          cartId: mockCartId,
          saveCartName: mockCartName,
          saveCartDescription: mockCartDescription,
        })
      );
    });

    it('should clear the save cart process state', () => {
      service.clearSaveCart();

      expect(store.dispatch).toHaveBeenCalledWith(
        new SavedCartActions.ClearSaveCart()
      );
    });

    it('should return the loading flag', () => {
      store.dispatch(
        new SavedCartActions.SaveCartSuccess({
          userId: mockUserId,
          cartId: mockCartId,
        })
      );

      let result: boolean | undefined;

      service
        .getSaveCartProcessLoading()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(false);
    });

    it('should return the success flag', () => {
      store.dispatch(
        new SavedCartActions.SaveCartSuccess({
          userId: mockUserId,
          cartId: mockCartId,
        })
      );

      let result: boolean | undefined;

      service
        .getSaveCartProcessSuccess()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should return the error flag', () => {
      store.dispatch(
        new SavedCartActions.SaveCartFail({
          userId: mockUserId,
          cartId: mockCartId,
          error: mockError,
        })
      );

      let result: boolean | undefined;

      service
        .getSaveCartProcessError()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });

  describe('Clone saved cart', () => {
    it('should dispatch a clone of a single saved cart ', () => {
      service.cloneSavedCart(mockCartId, mockCartName);
      expect(store.dispatch).toHaveBeenCalledWith(
        new SavedCartActions.CloneSavedCart({
          userId: mockUserId,
          cartId: mockCartId,
          saveCartName: mockCartName,
        })
      );
    });

    it('should clear the clone saved cart process state', () => {
      service.clearCloneSavedCart();

      expect(store.dispatch).toHaveBeenCalledWith(
        new SavedCartActions.ClearCloneSavedCart()
      );
    });

    it('should return the loading flag', () => {
      store.dispatch(
        new SavedCartActions.CloneSavedCartSuccess({
          userId: mockUserId,
          cartId: mockCartId,
          saveCartName: mockCartName,
        })
      );

      let result: boolean | undefined;

      service
        .getCloneSavedCartProcessLoading()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(false);
    });

    it('should return the success flag', () => {
      store.dispatch(
        new SavedCartActions.CloneSavedCartSuccess({
          userId: mockUserId,
          cartId: mockCartId,
          saveCartName: mockCartName,
        })
      );

      let result: boolean | undefined;

      service
        .getCloneSavedCartProcessSuccess()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should return the error flag', () => {
      store.dispatch(
        new SavedCartActions.CloneSavedCartFail({
          userId: mockUserId,
          cartId: mockCartId,
          saveCartName: mockCartName,
          error: mockError,
        })
      );

      let result: boolean | undefined;

      service
        .getCloneSavedCartProcessError()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });
});
