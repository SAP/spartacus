import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { normalizeHttpError, ReplenishmentOrderList } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { ReplenishmentOrderAdapter } from '../../connectors/replenishment-order.adapter';
import { ReplenishmentOrderConnector } from '../../connectors/replenishment-order.connector';
import { OrderActions } from '../actions/index';
import * as fromEffect from './replenishment-orders.effect';

const mockUserReplenishmentOrders: ReplenishmentOrderList = {
  replenishmentOrders: [],
  pagination: {},
  sorts: [],
};

describe('Replenishment Orders effect', () => {
  let userReplenishmentOrdersEffect: fromEffect.ReplenishmentOrdersEffect;
  let replenishmentOrderConnector: ReplenishmentOrderConnector;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ReplenishmentOrderConnector,
        fromEffect.ReplenishmentOrdersEffect,
        { provide: ReplenishmentOrderAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.inject(Actions);
    userReplenishmentOrdersEffect = TestBed.inject(
      fromEffect.ReplenishmentOrdersEffect
    );
    replenishmentOrderConnector = TestBed.inject(ReplenishmentOrderConnector);
  });

  describe('loadUserReplenishmentOrders$', () => {
    it('should load User Replenishment Orders', () => {
      spyOn(replenishmentOrderConnector, 'loadHistory').and.returnValue(
        of(mockUserReplenishmentOrders)
      );
      const action = new OrderActions.LoadUserReplenishmentOrders({
        userId: 'test@sap.com',
        pageSize: 5,
      });

      const completion = new OrderActions.LoadUserReplenishmentOrdersSuccess(
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

      const action = new OrderActions.LoadUserReplenishmentOrders({
        userId: 'test@sap.com',
        pageSize: 5,
      });

      const completion = new OrderActions.LoadUserReplenishmentOrdersFail(
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
