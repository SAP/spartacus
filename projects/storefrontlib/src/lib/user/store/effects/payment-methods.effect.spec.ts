import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { OccUserService } from '../../../occ/user/user.service';
import * as fromUserPaymentMethodsAction from '../actions/payment-methods.action';
import * as fromUserPaymentMethodsEffect from './payment-methods.effect';
import { PaymentDetailsList } from '@spartacus/core';

class MockOccUserService {
  loadUserPaymentMethods(_userId: string): Observable<any> {
    return;
  }
  setDefaultUserPaymentMethod(): Observable<any> {
    return of({});
  }
  deleteUserPaymentMethod(): Observable<any> {
    return of({});
  }
}

const mockUserPaymentMethods: PaymentDetailsList = {
  payments: [{ id: 'payment1' }, { id: 'payment2' }]
};

describe('User Payment Methods effect', () => {
  let userPaymentMethodsEffect: fromUserPaymentMethodsEffect.UserPaymentMethodsEffects;
  let userService: OccUserService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromUserPaymentMethodsEffect.UserPaymentMethodsEffects,
        { provide: OccUserService, useClass: MockOccUserService },
        provideMockActions(() => actions$)
      ]
    });

    userPaymentMethodsEffect = TestBed.get(
      fromUserPaymentMethodsEffect.UserPaymentMethodsEffects
    );
    userService = TestBed.get(OccUserService);

    spyOn(userService, 'loadUserPaymentMethods').and.returnValue(
      of(mockUserPaymentMethods)
    );
  });

  describe('loadUserPaymentMethods$', () => {
    it('should load user payment methods', () => {
      const action = new fromUserPaymentMethodsAction.LoadUserPaymentMethods(
        '123'
      );
      const completion = new fromUserPaymentMethodsAction.LoadUserPaymentMethodsSuccess(
        mockUserPaymentMethods.payments
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userPaymentMethodsEffect.loadUserPaymentMethods$).toBeObservable(
        expected
      );
    });
  });

  describe('setDefaultUserPaymentMethod$', () => {
    it('should set default payment method', () => {
      const action = new fromUserPaymentMethodsAction.SetDefaultUserPaymentMethod(
        {
          userId: '123',
          paymentMethodId: '123'
        }
      );
      const completion = [
        new fromUserPaymentMethodsAction.SetDefaultUserPaymentMethodSuccess({}),
        new fromUserPaymentMethodsAction.LoadUserPaymentMethods('123')
      ];

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion[0], c: completion[1] });

      expect(
        userPaymentMethodsEffect.setDefaultUserPaymentMethod$
      ).toBeObservable(expected);
    });
  });

  describe('deleteUserPaymentMethod$', () => {
    it('should delete payment method', () => {
      const action = new fromUserPaymentMethodsAction.DeleteUserPaymentMethod({
        userId: '123',
        paymentMethodId: '123'
      });
      const completion = [
        new fromUserPaymentMethodsAction.DeleteUserPaymentMethodSuccess({}),
        new fromUserPaymentMethodsAction.LoadUserPaymentMethods('123')
      ];

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion[0], c: completion[1] });

      expect(userPaymentMethodsEffect.deleteUserPaymentMethod$).toBeObservable(
        expected
      );
    });
  });
});
