import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { OccUserService } from '../../../occ/user/user.service';
import * as fromUserPaymentMethodsAction from '../actions/payment-methods.action';
import * as fromUserPaymentMethodsEffect from './payment-methods.effect';

@Injectable()
export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

class MockOccUserService {
  loadUserPaymentMethods(userId: string): Observable<any> {
    return;
  }
}

const mockUserPaymentMethods = { payments: ['payment1', 'payment2'] };

describe('User Payment Methods effect', () => {
  let userPaymentMethodsEffect: fromUserPaymentMethodsEffect.UserPaymentMethodsEffects;
  let userService: OccUserService;
  let actions$: TestActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromUserPaymentMethodsEffect.UserPaymentMethodsEffects,
        { provide: OccUserService, useClass: MockOccUserService },
        { provide: Actions, useFactory: getActions }
      ]
    });

    userPaymentMethodsEffect = TestBed.get(
      fromUserPaymentMethodsEffect.UserPaymentMethodsEffects
    );
    userService = TestBed.get(OccUserService);
    actions$ = TestBed.get(Actions);

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

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userPaymentMethodsEffect.loadUserPaymentMethods$).toBeObservable(
        expected
      );
    });
  });
});
