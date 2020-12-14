import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { ReplenishmentOrderList } from '../../../model/replenishment-order.model';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { UserReplenishmentOrderAdapter } from '../../connectors/replenishment-order/user-replenishment-order.adapter';
import { UserReplenishmentOrderConnector } from '../../connectors/replenishment-order/user-replenishment-order.connector';
import { UserActions } from '../actions/index';
import * as fromEffect from './user-replenishment-orders.effect';

const mockUserReplenishmentOrders: ReplenishmentOrderList = {
  replenishmentOrders: [],
  pagination: {},
  sorts: [],
};

describe('User Replenishment Orders effect', () => {
  let userReplenishmentOrdersEffect: fromEffect.UserReplenishmentOrdersEffect;
  let replenishmentOrderConnector: UserReplenishmentOrderConnector;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        fromEffect.UserReplenishmentOrdersEffect,
        { provide: UserReplenishmentOrderAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.inject(Actions);
    userReplenishmentOrdersEffect = TestBed.inject(
      fromEffect.UserReplenishmentOrdersEffect
    );
    replenishmentOrderConnector = TestBed.inject(
      UserReplenishmentOrderConnector
    );
  });

  describe('loadUserReplenishmentOrders$', () => {
    it('should load User Replenishment Orders', () => {
      spyOn(replenishmentOrderConnector, 'loadHistory').and.returnValue(
        of(mockUserReplenishmentOrders)
      );
      const action = new UserActions.LoadUserReplenishmentOrders({
        userId: 'test@sap.com',
        pageSize: 5,
      });

      const completion = new UserActions.LoadUserReplenishmentOrdersSuccess(
        mockUserReplenishmentOrders
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(
        userReplenishmentOrdersEffect.loadUserReplenishmentOrders$
      ).toBeObservable(expected);
    });

    it('should handle failures for load user Replenishment Orders', () => {
      spyOn(replenishmentOrderConnector, 'loadHistory').and.returnValue(
        throwError('Error')
      );

      const action = new UserActions.LoadUserReplenishmentOrders({
        userId: 'test@sap.com',
        pageSize: 5,
      });

      const completion = new UserActions.LoadUserReplenishmentOrdersFail(
        normalizeHttpError('Error')
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(
        userReplenishmentOrdersEffect.loadUserReplenishmentOrders$
      ).toBeObservable(expected);
    });
  });
});
