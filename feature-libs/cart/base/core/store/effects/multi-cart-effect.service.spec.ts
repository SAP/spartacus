import { TestBed } from '@angular/core/testing';
import { Cart, CartType } from '@spartacus/cart/base/root';
import { CartActions } from '../actions';
import { MultiCartEffectsService } from './multi-cart-effect.service';

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

describe('MultiCartEffectsService', () => {
  let service: MultiCartEffectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultiCartEffectsService],
    });

    service = TestBed.inject(MultiCartEffectsService);
  });

  describe('getActiveCartTypeOnLoadSuccess', () => {
    it('should return active cart id being value from LoadCartSuccess', () => {
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

      expect(service.getActiveCartTypeOnLoadSuccess(action)).toEqual(
        setActiveCartIdAction
      );
    });

    it('should return empty active cart id if the cart from LoadCartSuccess is active and saved', () => {
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

      expect(service.getActiveCartTypeOnLoadSuccess(action)).toEqual(
        setActiveCartIdAction
      );
    });

    it('should return undefined if cart from LoadCartSuccess is not active', () => {
      const action = new CartActions.LoadCartSuccess({
        userId: 'userId',
        cartId: 'cartId',
        cart: testCart,
        extraData: { active: false },
      });

      expect(service.getActiveCartTypeOnLoadSuccess(action)).toBeUndefined();
    });
  });
});
