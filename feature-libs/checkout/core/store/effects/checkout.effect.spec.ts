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

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: completion1,
        c: completion2,
      });

      expect(entryEffects.setCostCenter$).toBeObservable(expected);
    });
  });
});
