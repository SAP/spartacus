import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { Cart, CartType } from '@spartacus/cart/base/root';
import { OCC_CART_ID_CURRENT } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import * as fromCartReducers from '../../store/reducers/index';
import { CartActions } from '../actions/index';
import { MULTI_CART_FEATURE } from '../multi-cart-state';
import { MultiCartEffectsService } from './multi-cart-effect.service';
import * as fromEffects from './multi-cart.effect';

const testCart: Cart = {
  code: 'xxx',
  guid: 'testGuid',
  totalItems: 0,
  totalPrice: {
    currencyIso: 'USD',
    value: 0,
  },
  totalPriceWithTax: {
    currencyIso: 'USD',
    value: 0,
  },
};

class MockMultiCartEffectsService implements Partial<MultiCartEffectsService> {
  getActiveCartTypeOnLoadSuccess(
    _action: CartActions.LoadCartSuccess
  ): CartActions.SetCartTypeIndex | undefined {
    return undefined;
  }
}

describe('Multi Cart effect', () => {
  let cartEffects: fromEffects.MultiCartEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          MULTI_CART_FEATURE,
          fromCartReducers.getMultiCartReducers()
        ),
      ],

      providers: [
        fromEffects.MultiCartEffects,
        provideMockActions(() => actions$),
        {
          provide: MultiCartEffectsService,
          useClass: MockMultiCartEffectsService,
        },
      ],
    });

    cartEffects = TestBed.inject(fromEffects.MultiCartEffects);
  });

  describe('processesIncrement$', () => {
    it('should dispatch CartProcessesIncrement action', () => {
      const payload = {
        userId: 'userId',
        cartId: 'cartId',
      };
      const action = new CartActions.CartAddVoucher({
        ...payload,
        voucherId: 'voucherId',
      });

      const processesIncrementCompletion =
        new CartActions.CartProcessesIncrement(payload.cartId);
      actions$ = hot('-b', {
        b: action,
      });
      const expected = cold('-1', {
        1: processesIncrementCompletion,
      });
      expect(cartEffects.processesIncrement$).toBeObservable(expected);
    });
  });

  describe('setSelectiveId$', () => {
    it('should set selective cart id to state', () => {
      const action = new CartActions.LoadCartSuccess({
        userId: 'userId',
        cartId: 'selectivecart-cartId',
        cart: testCart,
      });

      const setSelectiveIdAction = new CartActions.SetCartTypeIndex({
        cartType: CartType.SELECTIVE,
        cartId: 'selectivecart-cartId',
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: setSelectiveIdAction });

      expect(cartEffects.setSelectiveId$).toBeObservable(expected);
    });
  });

  describe('setActiveCartId$', () => {
    it('should clear active cart id when load current cart', () => {
      const action = new CartActions.LoadCart({
        userId: 'userId',
        cartId: OCC_CART_ID_CURRENT,
      });

      const setActiveCartIdAction = new CartActions.SetCartTypeIndex({
        cartType: CartType.ACTIVE,
        cartId: '',
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: setActiveCartIdAction });

      expect(cartEffects.setActiveCartId$).toBeObservable(expected);
    });

    it('should call MultiCartEffectsService to set cart id for LoadCartSuccess, when cart is active', () => {
      const action = new CartActions.LoadCartSuccess({
        userId: 'userId',
        cartId: 'cartId',
        cart: testCart,
        extraData: { active: true },
      });

      const setActiveCartIdAction = new CartActions.SetCartTypeIndex({
        cartType: CartType.ACTIVE,
        cartId: 'cartId',
      });

      const multiCartEffectsService = TestBed.inject(MultiCartEffectsService);
      spyOn(
        multiCartEffectsService,
        'getActiveCartTypeOnLoadSuccess'
      ).and.returnValue(setActiveCartIdAction);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: setActiveCartIdAction });

      expect(cartEffects.setActiveCartId$).toBeObservable(expected);
      expect(
        multiCartEffectsService.getActiveCartTypeOnLoadSuccess
      ).toHaveBeenCalledWith(action);
    });

    it('should call MultiCartEffectsService to set cart id for LoadCartSuccess, when the active cart is saved', () => {
      const action = new CartActions.LoadCartSuccess({
        userId: 'userId',
        cartId: 'cartId',
        cart: { code: 'test', saveTime: new Date() },
        extraData: { active: true },
      });

      const setActiveCartIdAction = new CartActions.SetCartTypeIndex({
        cartType: CartType.ACTIVE,
        cartId: '',
      });
      const multiCartEffectsService = TestBed.inject(MultiCartEffectsService);
      spyOn(
        multiCartEffectsService,
        'getActiveCartTypeOnLoadSuccess'
      ).and.returnValue(setActiveCartIdAction);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: setActiveCartIdAction });

      expect(cartEffects.setActiveCartId$).toBeObservable(expected);
      expect(
        multiCartEffectsService.getActiveCartTypeOnLoadSuccess
      ).toHaveBeenCalledWith(action);
    });

    it('should set active cart id to state for CreateCart', () => {
      const action = new CartActions.CreateCart({
        userId: 'userId',
        tempCartId: 'cartId',
        extraData: { active: true },
      });

      const setActiveCartIdAction = new CartActions.SetCartTypeIndex({
        cartType: CartType.ACTIVE,
        cartId: 'cartId',
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: setActiveCartIdAction });

      expect(cartEffects.setActiveCartId$).toBeObservable(expected);
    });

    it('should set active cart id to state for SetActiveCartId', () => {
      const action = new CartActions.SetActiveCartId('testCartId');

      const setActiveCartIdAction = new CartActions.SetCartTypeIndex({
        cartType: CartType.ACTIVE,
        cartId: 'testCartId',
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: setActiveCartIdAction });

      expect(cartEffects.setActiveCartId$).toBeObservable(expected);
    });

    it('should set new_created cart id to state for CreateCartSuccess with activve=false', () => {
      const action = new CartActions.CreateCartSuccess({
        userId: 'userId',
        tempCartId: 'tempCartId',
        cart: testCart,
        cartId: 'testCartId',
        extraData: { active: false },
      });

      const setNewCreatedCartIdAction = new CartActions.SetCartTypeIndex({
        cartType: CartType.NEW_CREATED,
        cartId: 'testCartId',
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: setNewCreatedCartIdAction });

      expect(cartEffects.setActiveCartId$).toBeObservable(expected);
    });

    it('should set active cart id to state for CreateCartSuccess with active=true', () => {
      const action = new CartActions.CreateCartSuccess({
        userId: 'userId',
        tempCartId: 'tempCartId',
        cart: testCart,
        cartId: 'testCartId',
        extraData: { active: true },
      });

      const setActiveCartIdAction = new CartActions.SetCartTypeIndex({
        cartType: CartType.ACTIVE,
        cartId: 'testCartId',
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: setActiveCartIdAction });

      expect(cartEffects.setActiveCartId$).toBeObservable(expected);
    });
  });
});
