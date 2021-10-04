import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import {
  Address,
  AuthActions,
  CartActions,
  DeliveryMode,
  Order,
  PaymentDetails,
  SiteContextActions,
  UserActions,
} from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import {
  CheckoutCostCenterConnector,
  CheckoutDeliveryConnector,
  CheckoutPaymentConnector,
} from '../../connectors';
import { CheckoutConnector } from '../../connectors/checkout';
import { CheckoutDetails } from '../../models/checkout.model';
import { CheckoutActions } from '../actions/index';
import * as fromEffects from './checkout.effect';
import createSpy = jasmine.createSpy;

const userId = 'testUserId';
const cartId = 'testCartId';
const termsChecked = true;

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
  deliveryMode: {},
  paymentInfo: {},
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

class MockCheckoutPaymentConnector {
  set = createSpy().and.returnValue(of({}));
  create = createSpy().and.returnValue(of(paymentDetails));
}

class MockCheckoutCostCenterConnector {
  setCostCenter = createSpy().and.returnValue(of({}));
}

class MockCheckoutConnector {
  loadCheckoutDetails = createSpy().and.returnValue(of(details));
  placeOrder = () => of({});
  clearCheckoutDeliveryAddress = () => of({});
  clearCheckoutDeliveryMode = () => of({});
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
        {
          provide: CheckoutCostCenterConnector,
          useClass: MockCheckoutCostCenterConnector,
        },
        { provide: CheckoutConnector, useClass: MockCheckoutConnector },
        fromEffects.CheckoutEffects,
        provideMockActions(() => actions$),
      ],
    });

    entryEffects = TestBed.inject(fromEffects.CheckoutEffects);
    checkoutConnector = TestBed.inject(CheckoutConnector);

    spyOn(checkoutConnector, 'placeOrder').and.returnValue(of(orderDetails));
  });

  describe('clearCheckoutMiscsDataOnLanguageChange$', () => {
    it('should dispatch checkout clear miscs data action on language change', () => {
      const action = new SiteContextActions.LanguageChange({
        previous: 'previous',
        current: 'current',
      });
      const completion2 = new CheckoutActions.ResetLoadPaymentTypesProcess();
      const completion3 = new CheckoutActions.CheckoutClearMiscsData();

      actions$ = hot('-a', { a: action });
      const expected = cold('-(cd)', {
        c: completion2,
        d: completion3,
      });

      expect(
        entryEffects.clearCheckoutMiscsDataOnLanguageChange$
      ).toBeObservable(expected);
    });
  });

  describe('clearCheckoutDataOnLogout$', () => {
    it('should dispatch clear checkout data action on logout', () => {
      const action = new AuthActions.Logout();
      const completion1 = new CheckoutActions.ClearCheckoutData();
      const completion3 = new CheckoutActions.ResetLoadPaymentTypesProcess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bd)', {
        b: completion1,
        d: completion3,
      });

      expect(entryEffects.clearCheckoutDataOnLogout$).toBeObservable(expected);
    });
  });

  describe('clearCheckoutDataOnLogin$', () => {
    it('should dispatch clear checkout data action on login', () => {
      const action = new AuthActions.Login();
      const completion = new CheckoutActions.ClearCheckoutData();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.clearCheckoutDataOnLogin$).toBeObservable(expected);
    });
  });

  describe('createPaymentDetails$', () => {
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
    it('should create payment details for cart', () => {
      const action = new CheckoutActions.CreatePaymentDetails({
        userId: userId,
        cartId: cartId,
        paymentDetails: mockPaymentDetails,
      });
      const completion1 = new UserActions.LoadUserPaymentMethods(userId);
      const completion2 = new CheckoutActions.CreatePaymentDetailsSuccess(
        paymentDetails
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(entryEffects.createPaymentDetails$).toBeObservable(expected);
    });

    it('should create payment details for guest user', () => {
      const action = new CheckoutActions.CreatePaymentDetails({
        userId: 'anonymous',
        cartId: cartId,
        paymentDetails: mockPaymentDetails,
      });
      const completion = new CheckoutActions.CreatePaymentDetailsSuccess(
        paymentDetails
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.createPaymentDetails$).toBeObservable(expected);
    });
  });

  describe('setPaymentDetails$', () => {
    it('should set payment details', () => {
      const action = new CheckoutActions.SetPaymentDetails({
        userId: userId,
        cartId: cartId,
        paymentDetails,
      });
      const completion = new CheckoutActions.SetPaymentDetailsSuccess(
        paymentDetails
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.setPaymentDetails$).toBeObservable(expected);
    });
  });

  describe('placeOrder$', () => {
    it('should place order', () => {
      const action = new CheckoutActions.PlaceOrder({
        userId,
        cartId,
        termsChecked,
      });
      const removeCartCompletion = new CartActions.RemoveCart({ cartId });
      const placeOrderSuccessCompletion = new CheckoutActions.PlaceOrderSuccess(
        orderDetails
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: removeCartCompletion,
        c: placeOrderSuccessCompletion,
      });

      expect(entryEffects.placeOrder$).toBeObservable(expected);
    });
  });

  describe('loadCheckoutDetails$', () => {
    it('should load checkout details from cart', () => {
      const action = new CheckoutActions.LoadCheckoutDetails({
        userId: userId,
        cartId: cartId,
      });
      const completion = new CheckoutActions.LoadCheckoutDetailsSuccess(
        details
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.loadCheckoutDetails$).toBeObservable(expected);
    });
  });

  describe('clearCheckoutDeliveryAddress$', () => {
    it('should clear checkout delivery address', () => {
      const action = new CheckoutActions.ClearCheckoutDeliveryAddress({
        userId: userId,
        cartId: cartId,
      });
      const completion =
        new CheckoutActions.ClearCheckoutDeliveryAddressSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.clearCheckoutDeliveryAddress$).toBeObservable(
        expected
      );
    });
  });

  describe('clearCheckoutDeliveryMode$', () => {
    it('should clear checkout delivery modes', () => {
      const action = new CheckoutActions.ClearCheckoutDeliveryMode({
        userId: userId,
        cartId: cartId,
      });
      const completion1 = new CheckoutActions.ClearCheckoutDeliveryModeSuccess({
        userId: userId,
        cartId: cartId,
      });
      const completion2 = new CartActions.LoadCart({
        userId: userId,
        cartId: cartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(entryEffects.clearCheckoutDeliveryMode$).toBeObservable(expected);
    });
  });

  describe('setCostCenter$', () => {
    it('should set cost center to cart', () => {
      const action = new CheckoutActions.SetCostCenter({
        userId: userId,
        cartId: cartId,
        costCenterId: 'testId',
      });
      const completion1 = new CartActions.LoadCart({
        userId,
        cartId,
      });
      const completion2 = new CheckoutActions.SetCostCenterSuccess('testId');
      const completion3 = new CheckoutActions.ClearCheckoutDeliveryAddress({
        userId,
        cartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bcd)', {
        b: completion1,
        c: completion2,
        d: completion3,
      });

      expect(entryEffects.setCostCenter$).toBeObservable(expected);
    });
  });
});
