import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import {
  CartActions,
  normalizeHttpError,
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
} from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { CheckoutReplenishmentOrderConnector } from '../../connectors/index';
import { CheckoutActions } from '../actions/index';
import * as fromEffects from './replenishment-order.effect';

const mockCartId = 'test-cart';
const mockTermsChecked = true;
const mockUserId = 'test-user';
const mockError = 'test-error';

const mockReplenishmentOrderFormData: ScheduleReplenishmentForm = {
  numberOfDays: 'test-number-days',
};

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
};

class MockReplenishmentOrderConnector {
  scheduleReplenishmentOrder(
    _cartId: string,
    _scheduleReplenishmentForm: ScheduleReplenishmentForm,
    _termsChecked: boolean,
    _userId: string
  ): Observable<ReplenishmentOrder> {
    return of({});
  }
}

describe('Replenishment Order Effects', () => {
  let connector: CheckoutReplenishmentOrderConnector;
  let effects: fromEffects.ReplenishmentOrderEffects;
  let actions$: Observable<Action>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: CheckoutReplenishmentOrderConnector,
            useClass: MockReplenishmentOrderConnector,
          },
          fromEffects.ReplenishmentOrderEffects,
          provideMockActions(() => actions$),
        ],
      });
    })
  );

  beforeEach(() => {
    connector = TestBed.inject(CheckoutReplenishmentOrderConnector);
    effects = TestBed.inject(fromEffects.ReplenishmentOrderEffects);
  });

  describe('scheduleReplenishmentOrder$', () => {
    it('should schedule a replenishment order', () => {
      spyOn(connector, 'scheduleReplenishmentOrder').and.returnValue(
        of(mockReplenishmentOrder)
      );

      const action = new CheckoutActions.ScheduleReplenishmentOrder({
        cartId: mockCartId,
        scheduleReplenishmentForm: mockReplenishmentOrderFormData,
        termsChecked: mockTermsChecked,
        userId: mockUserId,
      });
      const completion1 = new CartActions.RemoveCart({ cartId: mockCartId });
      const completion2 = new CheckoutActions.ScheduleReplenishmentOrderSuccess(
        mockReplenishmentOrder
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: completion1,
        c: completion2,
      });

      expect(effects.scheduleReplenishmentOrder$).toBeObservable(expected);
    });

    it('should return an error when it fails to schedule a replenishment order', () => {
      spyOn(connector, 'scheduleReplenishmentOrder').and.returnValue(
        throwError(mockError)
      );

      const action = new CheckoutActions.ScheduleReplenishmentOrder({
        cartId: mockCartId,
        scheduleReplenishmentForm: mockReplenishmentOrderFormData,
        termsChecked: mockTermsChecked,
        userId: mockUserId,
      });
      const completion = new CheckoutActions.ScheduleReplenishmentOrderFail(
        normalizeHttpError(mockError)
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: completion,
      });

      expect(effects.scheduleReplenishmentOrder$).toBeObservable(expected);
    });
  });
});
