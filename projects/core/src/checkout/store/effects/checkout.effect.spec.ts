import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { CartDataService } from 'projects/core/src/cart';
import { Observable, of } from 'rxjs';
import * as fromAuthActions from '../../../auth/store/actions/index';
import {
  CheckoutDeliveryConnector,
  CheckoutPaymentConnector,
} from '../../../checkout/connectors';
import { Address } from '../../../model/address.model';
import { PaymentDetails } from '../../../model/cart.model';
import { DeliveryMode, Order } from '../../../model/order.model';
import * as fromSiteContextActions from '../../../site-context/store/actions/index';
import { LoadUserAddresses, LoadUserPaymentMethods } from '../../../user';
import { CheckoutConnector } from '../../connectors/checkout';
import { CheckoutDetails } from '../../models/checkout.model';
import * as fromActions from '../actions/checkout.action';
import * as fromIndexActions from '../actions/index';
import * as fromCartActions from './../../../cart/store/actions/index';
import * as fromEffects from './checkout.effect';

import createSpy = jasmine.createSpy;

const userId = 'testUserId';
const cartId = 'testCartId';
const address: Address = {
  id: 'testAddressId',
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart',
  town: 'Montreal',
  postalCode: 'L6M1P9',
  country: { isocode: 'CA' },
};
const modes: DeliveryMode[] = [{ code: 'code1' }, { code: 'code2' }];
const orderDetails: Order = { entries: [] };

const details: CheckoutDetails = {
  deliveryAddress: address,
};

const paymentDetails: PaymentDetails = {
  accountHolderName: 'test',
  defaultPayment: false,
  billingAddress: {
    line1: '123 Montreal',
  },
};

class MockCheckoutDeliveryConnector {
  createAddress = createSpy().and.returnValue(of(address));
  setAddress = createSpy().and.returnValue(of({}));
  getSupportedModes = createSpy().and.returnValue(of(modes));
  setMode = createSpy().and.returnValue(of({}));
}

class MockCartDataService {
  cartId = 'cartId';
  userId = 'userId';
}

class MockCheckoutPaymentConnector {
  set = createSpy().and.returnValue(of({}));
  create = createSpy().and.returnValue(of(paymentDetails));
}

class MockCheckoutConnector {
  loadCheckoutDetails = createSpy().and.returnValue(of(details));
  placeOrder = () => of({});
}

describe('Checkout effect', () => {
  let checkoutConnector: CheckoutConnector;
  let entryEffects: fromEffects.CheckoutEffects;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CheckoutPaymentConnector,
        {
          provide: CheckoutDeliveryConnector,
          useClass: MockCheckoutDeliveryConnector,
        },
        {
          provide: CheckoutPaymentConnector,
          useClass: MockCheckoutPaymentConnector,
        },
        { provide: CheckoutConnector, useClass: MockCheckoutConnector },
        { provide: CartDataService, useClass: MockCartDataService },
        fromEffects.CheckoutEffects,
        provideMockActions(() => actions$),
      ],
    });

    entryEffects = TestBed.get(fromEffects.CheckoutEffects);
    checkoutConnector = TestBed.get(CheckoutConnector);

    spyOn(checkoutConnector, 'placeOrder').and.returnValue(of(orderDetails));
  });

  describe('addDeliveryAddress$', () => {
    it('should add delivery address to cart', () => {
      const action = new fromActions.AddDeliveryAddress({
        userId: userId,
        cartId: cartId,
        address: address,
      });

      const completion1 = new LoadUserAddresses(userId);
      const completion2 = new fromActions.SetDeliveryAddress({
        userId: userId,
        cartId: cartId,
        address: address,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(entryEffects.addDeliveryAddress$).toBeObservable(expected);
    });
  });

  describe('setDeliveryAddress$', () => {
    it('should set delivery address to cart', () => {
      const action = new fromActions.SetDeliveryAddress({
        userId: userId,
        cartId: cartId,
        address: address,
      });
      const completion = new fromActions.SetDeliveryAddressSuccess(address);
      const completion2 = new fromActions.LoadSupportedDeliveryModes({
        userId,
        cartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion, c: completion2 });

      expect(entryEffects.setDeliveryAddress$).toBeObservable(expected);
    });
  });

  describe('loadSupportedDeliveryModes$', () => {
    it('should load all supported delivery modes from cart', () => {
      const action = new fromActions.LoadSupportedDeliveryModes({
        userId: userId,
        cartId: cartId,
      });
      const completion = new fromActions.LoadSupportedDeliveryModesSuccess(
        modes
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.loadSupportedDeliveryModes$).toBeObservable(expected);
    });
  });

  describe('clearCheckoutMiscsDataOnLanguageChange$', () => {
    it('should dispatch checkout clear miscs data action on language change', () => {
      const action = new fromSiteContextActions.LanguageChange();
      const completion = new fromIndexActions.CheckoutClearMiscsData();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(
        entryEffects.clearCheckoutMiscsDataOnLanguageChange$
      ).toBeObservable(expected);
    });
  });

  describe('clearDeliveryModesOnCurrencyChange$', () => {
    it('should dispatch clear supported delivery modes action on currency change', () => {
      const action = new fromSiteContextActions.CurrencyChange();
      const completion = new fromIndexActions.ClearSupportedDeliveryModes();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.clearDeliveryModesOnCurrencyChange$).toBeObservable(
        expected
      );
    });
  });

  describe('clearCheckoutDataOnLogout$', () => {
    it('should dispatch clear checkout data action on logout', () => {
      const action = new fromAuthActions.Logout();
      const completion = new fromIndexActions.ClearCheckoutData();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.clearCheckoutDataOnLogout$).toBeObservable(expected);
    });
  });

  describe('setDeliveryMode$', () => {
    it('should set delivery mode for cart', () => {
      const action = new fromActions.SetDeliveryMode({
        userId: userId,
        cartId: cartId,
        selectedModeId: 'testSelectedModeId',
      });
      const setDeliveryModeSuccess = new fromActions.SetDeliveryModeSuccess(
        'testSelectedModeId'
      );
      const loadCart = new fromCartActions.LoadCart({
        userId,
        cartId,
        details: true,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: setDeliveryModeSuccess,
        c: loadCart,
      });

      expect(entryEffects.setDeliveryMode$).toBeObservable(expected);
    });
  });

  describe('createPaymentDetails$', () => {
    it('should create payment details for cart', () => {
      const mockPaymentDetails: PaymentDetails = {
        accountHolderName: 'test test',
        cardNumber: '4111111111111111',
        cardType: {
          code: 'visa',
        },
        defaultPayment: false,
        expiryMonth: '01',
        expiryYear: '2019',
        cvn: '123',
        billingAddress: {
          firstName: 'test',
          lastName: 'test',
          line1: 'line1',
          line2: 'line2',
          postalCode: '12345',
          town: 'MainCity',
          country: {
            isocode: 'US',
          },
        },
      };

      const action = new fromActions.CreatePaymentDetails({
        userId: userId,
        cartId: cartId,
        paymentDetails: mockPaymentDetails,
      });
      const completion1 = new LoadUserPaymentMethods(userId);
      const completion2 = new fromActions.CreatePaymentDetailsSuccess(
        paymentDetails
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(entryEffects.createPaymentDetails$).toBeObservable(expected);
    });
  });

  describe('setPaymentDetails$', () => {
    it('should set payment details', () => {
      const action = new fromActions.SetPaymentDetails({
        userId: userId,
        cartId: cartId,
        paymentDetails,
      });
      const completion = new fromActions.SetPaymentDetailsSuccess(
        paymentDetails
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.setPaymentDetails$).toBeObservable(expected);
    });
  });

  describe('placeOrder$', () => {
    it('should place order', () => {
      const action = new fromActions.PlaceOrder({
        userId: userId,
        cartId: cartId,
      });
      const completion1 = new fromActions.PlaceOrderSuccess(orderDetails);

      actions$ = hot('-a', { a: action });
      const expected = cold('-(b)', { b: completion1 });

      expect(entryEffects.placeOrder$).toBeObservable(expected);
    });
  });

  describe('loadCheckoutDetails$', () => {
    it('should load checkout details from cart', () => {
      const action = new fromActions.LoadCheckoutDetails({
        userId: userId,
        cartId: cartId,
      });
      const completion = new fromActions.LoadCheckoutDetailsSuccess(details);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.loadCheckoutDetails$).toBeObservable(expected);
    });
  });
});
