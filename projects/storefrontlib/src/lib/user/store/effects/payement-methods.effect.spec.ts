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
});
