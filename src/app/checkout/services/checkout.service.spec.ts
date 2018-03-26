import { AddDeliveryAddress } from './../store/actions/checkout.action';
import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../routing/store';
import * as fromCart from '../../cart/store';
import * as fromCheckout from '../store';
import * as fromUser from '../../auth/store';

import { UserToken } from '../../auth/models/token-types.model';
import { CheckoutService } from './checkout.service';
import { CartService } from '../../cart/services/cart.service';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let store: Store<fromCheckout.CheckoutState>;

  const userId = 'testUserId';
  const cart = { code: 'testCartId', guid: 'testGuid' };

  const address: any = {
    firstName: 'John',
    lastName: 'Doe',
    titleCode: 'mr',
    line1: 'Toyosaki 2 create on cart'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          cart: combineReducers(fromCart.reducers),
          checkout: combineReducers(fromCheckout.reducers),
          user: combineReducers(fromUser.reducers)
        })
      ],
      providers: [CheckoutService, CartService]
    });

    service = TestBed.get(CheckoutService);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it(
    'should CheckoutService is injected',
    inject([CheckoutService], (checkoutService: CheckoutService) => {
      expect(checkoutService).toBeTruthy();
    })
  );

  describe('Create and Set Address', () => {
    it(
      'should be able to create and set address to cart',
      inject([CartService], (cartService: CartService) => {
        cartService.userId = userId;
        cartService.cart = cart;

        service.createAndSetAddress(address);

        expect(store.dispatch).toHaveBeenCalledWith(
          new fromCheckout.AddDeliveryAddress({
            userId: userId,
            cartId: cart.code,
            address: address
          })
        );
      })
    );
  });
});
