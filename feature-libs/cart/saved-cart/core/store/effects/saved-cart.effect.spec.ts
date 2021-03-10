import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import {
  ActiveCartService,
  Cart,
  CartActions,
  ClearCheckoutService,
  GlobalMessageService,
  GlobalMessageType,
  MultiCartService,
} from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SavedCartConnector } from '../../connectors/saved-cart.connector';
import { SavedCartActions } from '../actions/index';
import * as fromEffects from './saved-cart.effect';
import createSpy = jasmine.createSpy;

const mockCartId = 'test-cart';
const mockUserId = 'test-user';
const mockActiveCartId = 'test-active-cart';

const mockSavedCarts: Cart[] = [
  {
    name: 'test-cart-name',
    entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
    description: 'test-cart-description',
  },
  {
    name: 'test-cart-name2',
    entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
  },
];

class MockSavedCartConnector implements Partial<SavedCartConnector> {
  get = createSpy().and.returnValue(of(mockSavedCarts[0]));
  getList = createSpy().and.returnValue(of(mockSavedCarts));
  restoreSavedCart = createSpy().and.returnValue(of(mockSavedCarts[0]));
  saveCart = createSpy().and.returnValue(of(mockSavedCarts[0]));
}

const activeCartId$ = new BehaviorSubject<string>(mockActiveCartId);
class MockActiveCartService implements Partial<ActiveCartService> {
  getActiveCartId = () => activeCartId$.asObservable();
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

class MockClearCheckoutService implements Partial<ClearCheckoutService> {
  resetCheckoutProcesses = createSpy();
}

class MockMultiCartService implements Partial<MultiCartService> {
  createCart = createSpy().and.returnValue(of({ value: mockSavedCarts[1] }));
}

describe('SavedCart Effects', () => {
  let connector: SavedCartConnector;
  let effects: fromEffects.SavedCartEffects;
  let actions$: Observable<Action>;
  let globalMessageService: GlobalMessageService;
  let clearCheckoutService: ClearCheckoutService;
  let multiCartService: MultiCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        fromEffects.SavedCartEffects,
        {
          provide: SavedCartConnector,
          useClass: MockSavedCartConnector,
        },
        {
          provide: ActiveCartService,
          useClass: MockActiveCartService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: ClearCheckoutService,
          useClass: MockClearCheckoutService,
        },
        {
          provide: MultiCartService,
          useClass: MockMultiCartService,
        },
        provideMockActions(() => actions$),
      ],
    });

    activeCartId$.next(mockActiveCartId);
    effects = TestBed.inject(fromEffects.SavedCartEffects);
    connector = TestBed.inject(SavedCartConnector);
    globalMessageService = TestBed.inject(GlobalMessageService);
    clearCheckoutService = TestBed.inject(ClearCheckoutService);
    multiCartService = TestBed.inject(MultiCartService);
  });

  describe('loadSavedCart$', () => {
    it('get a single saved cart', () => {
      const action = new SavedCartActions.LoadSavedCart({
        userId: mockUserId,
        cartId: mockCartId,
      });
      const completion1 = new CartActions.LoadCartSuccess({
        userId: mockUserId,
        cartId: mockCartId,
        cart: mockSavedCarts[0],
      });
      const completion2 = new SavedCartActions.LoadSavedCartSuccess({
        cartId: mockCartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: completion1,
        c: completion2,
      });

      expect(effects.loadSavedCart$).toBeObservable(expected);
      expect(connector.get).toHaveBeenCalledWith(mockUserId, mockCartId);
    });
  });

  describe('loadSavedCarts$', () => {
    it('should get a list of saved carts', () => {
      const action = new SavedCartActions.LoadSavedCarts({
        userId: mockUserId,
      });
      const completion1 = new CartActions.LoadCartsSuccess(mockSavedCarts);
      const completion2 = new SavedCartActions.LoadSavedCartsSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: completion1,
        c: completion2,
      });

      expect(effects.loadSavedCarts$).toBeObservable(expected);
      expect(connector.getList).toHaveBeenCalledWith(mockUserId);
    });
  });

  describe('restoreSavedCart$', () => {
    it('should restore a saved cart and make it active and save current active cart', () => {
      const action = new SavedCartActions.RestoreSavedCart({
        userId: mockUserId,
        cartId: mockCartId,
      });

      const completion1 = new SavedCartActions.SaveCart({
        userId: mockUserId,
        cartId: mockActiveCartId,
        saveCartName: mockActiveCartId,
        saveCartDescription: '',
        extraData: { edit: true },
      });
      const completion2 = new CartActions.SetActiveCartId(mockCartId);
      const completion3 = new CartActions.LoadCartSuccess({
        userId: mockUserId,
        cartId: mockCartId,
        cart: mockSavedCarts[0],
      });
      const completion4 = new SavedCartActions.LoadSavedCarts({
        userId: mockUserId,
      });
      const completion5 = new SavedCartActions.RestoreSavedCartSuccess({
        userId: mockUserId,
        cartId: mockCartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bcdef)', {
        b: completion1,
        c: completion2,
        d: completion3,
        e: completion4,
        f: completion5,
      });

      expect(effects.restoreSavedCart$).toBeObservable(expected);
      expect(connector.restoreSavedCart).toHaveBeenCalledWith(
        mockUserId,
        mockCartId
      );
      expect(clearCheckoutService.resetCheckoutProcesses).toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'savedCartList.swapCartWithActiveCart',
          params: {
            cartName: mockCartId,
            previousCartName: mockActiveCartId,
          },
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });

    it('should restore a saved cart and make it active', () => {
      activeCartId$.next('');

      const action = new SavedCartActions.RestoreSavedCart({
        userId: mockUserId,
        cartId: mockCartId,
      });

      const completion1 = new CartActions.SetActiveCartId(mockCartId);
      const completion2 = new CartActions.LoadCartSuccess({
        userId: mockUserId,
        cartId: mockCartId,
        cart: mockSavedCarts[0],
      });
      const completion3 = new SavedCartActions.LoadSavedCarts({
        userId: mockUserId,
      });
      const completion4 = new SavedCartActions.RestoreSavedCartSuccess({
        userId: mockUserId,
        cartId: mockCartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bcde)', {
        b: completion1,
        c: completion2,
        d: completion3,
        e: completion4,
      });

      expect(effects.restoreSavedCart$).toBeObservable(expected);
      expect(connector.restoreSavedCart).toHaveBeenCalledWith(
        mockUserId,
        mockCartId
      );
      expect(clearCheckoutService.resetCheckoutProcesses).toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'savedCartList.swapCartNoActiveCart',
          params: {
            cartName: mockCartId,
            previousCartName: '',
          },
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });
  });

  describe('saveCart$', () => {
    it('save a cart when edit is true', () => {
      const action = new SavedCartActions.SaveCart({
        userId: mockUserId,
        cartId: mockCartId,
        saveCartName: mockSavedCarts[0].name,
        saveCartDescription: mockSavedCarts[0].description,
        extraData: { edit: true },
      });

      const completion1 = new CartActions.LoadCartSuccess({
        userId: mockUserId,
        cartId: mockCartId,
        cart: mockSavedCarts[0],
      });
      const completion2 = new SavedCartActions.SaveCartSuccess({
        userId: mockUserId,
        cartId: mockCartId,
        saveCartName: mockSavedCarts[0].name,
        saveCartDescription: mockSavedCarts[0].description,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: completion1,
        c: completion2,
      });

      expect(effects.saveCart$).toBeObservable(expected);
      expect(connector.saveCart).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        mockSavedCarts[0].name,
        mockSavedCarts[0].description
      );
    });

    it('save a cart when edit is false', () => {
      const action = new SavedCartActions.SaveCart({
        userId: mockUserId,
        cartId: mockCartId,
        saveCartName: mockSavedCarts[0].name,
        saveCartDescription: mockSavedCarts[0].description,
        extraData: { edit: false },
      });

      const completion1 = new CartActions.LoadCartSuccess({
        userId: mockUserId,
        cartId: mockCartId,
        cart: mockSavedCarts[0],
      });
      const completion2 = new SavedCartActions.SaveCartSuccess({
        userId: mockUserId,
        cartId: mockCartId,
        saveCartName: mockSavedCarts[0].name,
        saveCartDescription: mockSavedCarts[0].description,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: completion1,
        c: completion2,
      });

      expect(effects.saveCart$).toBeObservable(expected);
      expect(connector.saveCart).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        mockSavedCarts[0].name,
        mockSavedCarts[0].description
      );
      expect(clearCheckoutService.resetCheckoutProcesses).toHaveBeenCalled();
      expect(multiCartService.createCart).toHaveBeenCalledWith({
        userId: mockUserId,
        extraData: { active: true },
      });
    });
  });
});
