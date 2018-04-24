import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { OccCartService } from '../../../occ/cart/cart.service';
import { ConfigService } from '../../../occ/config.service';
import * as fromEffects from './checkout.effect';
import * as fromActions from '../actions/checkout.action';
import * as fromUserActions from '../../../user/store/actions';
import { OccOrderService } from '../../../occ/order/order.service';

@Injectable()
class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

function getActions() {
  return new TestActions();
}

describe('Checkout effect', () => {
  let cartService: OccCartService;
  let orderService: OccOrderService;
  let entryEffects: fromEffects.CheckoutEffects;
  let actions$: TestActions;

  const userId = 'testUserId';
  const cartId = 'testCartId';
  const address: any = {
    id: 'testAddressId',
    firstName: 'John',
    lastName: 'Doe',
    titleCode: 'mr',
    line1: 'Toyosaki 2 create on cart'
  };
  const modes: any = {
    mode1: 'mode1',
    mode2: 'mode2'
  };
  const orderDetails = 'orderDetails';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCartService,
        OccOrderService,
        fromEffects.CheckoutEffects,
        ConfigService,
        { provide: Actions, useFactory: getActions }
      ]
    });

    entryEffects = TestBed.get(fromEffects.CheckoutEffects);
    cartService = TestBed.get(OccCartService);
    orderService = TestBed.get(OccOrderService);
    actions$ = TestBed.get(Actions);

    spyOn(cartService, 'createAddressOnCart').and.returnValue(of(address));
    spyOn(cartService, 'setDeliveryAddress').and.returnValue(of({}));
    spyOn(cartService, 'getSupportedDeliveryModes').and.returnValue(of(modes));
    spyOn(orderService, 'placeOrder').and.returnValue(of(orderDetails));
    spyOn(cartService, 'setDeliveryMode').and.returnValue(of({}));
  });

  describe('addDeliveryAddress$', () => {
    it('should add delivery address to cart', () => {
      const action = new fromActions.AddDeliveryAddress({
        userId: userId,
        cartId: cartId,
        address: address
      });

      const completion1 = new fromUserActions.LoadUserAddresses(userId);
      const completion2 = new fromActions.SetDeliveryAddress({
        userId: userId,
        cartId: cartId,
        address: address
      });

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(entryEffects.addDeliveryAddress$).toBeObservable(expected);
    });
  });

  describe('setDeliveryAddress$', () => {
    it('should set delivery address to cart', () => {
      const action = new fromActions.SetDeliveryAddress({
        userId: userId,
        cartId: cartId,
        address: address
      });
      const completion = new fromActions.SetDeliveryAddressSuccess(address);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.setDeliveryAddress$).toBeObservable(expected);
    });
  });

  describe('loadSupportedDeliveryModes$', () => {
    it('should load all supported delivery modes from cart', () => {
      const action = new fromActions.LoadSupportedDeliveryModes({
        userId: userId,
        cartId: cartId
      });
      const completion = new fromActions.LoadSupportedDeliveryModesSuccess(
        modes
      );

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.loadSupportedDeliveryModes$).toBeObservable(expected);
    });
  });

  describe('setDeliveryMode$', () => {
    it('should set delivery mode for cart', () => {
      const action = new fromActions.SetDeliveryMode({
        userId: userId,
        cartId: cartId,
        selectedModeId: 'testSelectedModeId'
      });
      const completion = new fromActions.SetDeliveryModeSuccess(
        'testSelectedModeId'
      );

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.setDeliveryMode$).toBeObservable(expected);
    });
  });

  describe('createPaymentDetails$', () => {
    it('should create payment details for cart', () => {
      const mockPaymentDetails = {
        accountHolderName: 'test test',
        cardNumber: '4111111111111111',
        cardType: {
          code: 'visa'
        },
        expiryMonth: '01',
        expiryYear: '2019',
        cvn: '123',
        billingAddress: {
          titleCode: 'mr',
          firstName: 'test',
          lastName: 'test',
          line1: 'line1',
          line2: 'line2',
          postalCode: '12345',
          town: 'MainCity',
          country: {
            isocode: 'US'
          },
          region: {
            isocode: 'US-FL'
          }
        }
      };

      const html =
        '<div id="postFormItems">' +
        '<input type="hidden" id="billTo_city" name="billTo_city" value="MainCity" />' +
        '<input type="hidden" id="decision" name="decision" value="ACCEPT" />' +
        '<input type="hidden" id="billTo_country" name="billTo_country" value="US" />' +
        '<input type="hidden" id="billTo_lastName" name="billTo_lastName" value="test" />' +
        '<div>';

      const paymentDetails = {
        billTo_city: 'MainCity',
        decision: 'ACCEPT',
        billTo_country: 'US',
        billTo_lastName: 'test'
      };

      spyOn(cartService, 'getPaymentProviderSubInfo').and.returnValue(
        of({ url: 'testUrl', parameters: {} })
      );
      spyOn(cartService, 'createSubWithPaymentProvider').and.returnValue(
        of(html)
      );
      spyOn(cartService, 'createPaymentDetails').and.returnValue(
        of(paymentDetails)
      );

      const action = new fromActions.CreatePaymentDetails({
        userId: userId,
        cartId: cartId,
        paymentDetails: mockPaymentDetails
      });
      const completion1 = new fromUserActions.LoadUserPaymentMethods(userId);
      const completion2 = new fromActions.CreatePaymentDetailsSuccess(
        paymentDetails
      );

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(entryEffects.createPaymentDetails$).toBeObservable(expected);
    });
  });

  describe('placeOrder$', () => {
    it('should place order', () => {
      const action = new fromActions.PlaceOrder({
        userId: userId,
        cartId: cartId
      });
      const completion = new fromActions.PlaceOrderSuccess(orderDetails);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.placeOrder$).toBeObservable(expected);
    });
  });
});
