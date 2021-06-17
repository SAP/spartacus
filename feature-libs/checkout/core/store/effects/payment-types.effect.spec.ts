import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { CartActions, PaymentType } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { PaymentTypeAdapter } from '../../connectors/payment-type/payment-type.adapter';
import { PaymentTypeConnector } from '../../connectors/payment-type/payment-type.connector';
import { CheckoutActions } from '../actions/index';
import { PaymentTypesEffects } from './payment-types.effect';

const mockPaymentTypes: PaymentType[] = [
  {
    code: 'card',
    displayName: 'card',
  },
  {
    code: 'account',
    displayName: 'accoun',
  },
];

describe('Payment Types effect', () => {
  let service: PaymentTypeConnector;
  let effect: PaymentTypesEffects;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PaymentTypesEffects,
        PaymentTypeConnector,
        { provide: PaymentTypeAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.inject(PaymentTypesEffects as Type<PaymentTypesEffects>);
    service = TestBed.inject(
      PaymentTypeConnector as Type<PaymentTypeConnector>
    );

    spyOn(service, 'getPaymentTypes').and.returnValue(of(mockPaymentTypes));
    spyOn(service, 'setPaymentType').and.returnValue(
      of({
        code: 'testCart',
      })
    );
  });

  describe('loadPaymentTypes$', () => {
    it('should load the payment types', () => {
      const action = new CheckoutActions.LoadPaymentTypes();
      const completion = new CheckoutActions.LoadPaymentTypesSuccess(
        mockPaymentTypes
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadPaymentTypes$).toBeObservable(expected);
    });
  });

  describe('setPaymentType$', () => {
    it('should set the payment type to cart', () => {
      const action = new CheckoutActions.SetPaymentType({
        userId: 'testUser',
        cartId: 'testCart',
        typeCode: 'ACCOUNT',
      });
      const completion1 = new CartActions.LoadCartSuccess({
        userId: 'testUser',
        cartId: 'testCart',
        cart: { code: 'testCart' },
      });
      const completion2 = new CheckoutActions.ClearCheckoutData();
      const completion3 = new CheckoutActions.SetPaymentTypeSuccess({
        code: 'testCart',
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bcd)', {
        b: completion1,
        c: completion2,
        d: completion3,
      });

      expect(effect.setPaymentType$).toBeObservable(expected);
    });
  });
});
