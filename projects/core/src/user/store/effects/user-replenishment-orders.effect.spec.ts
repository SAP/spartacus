import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { ReplenishmentOrderList } from '../../../model/replenishment-order.model';
import {
  UserReplenishmentOrderAdapter,
  UserReplenishmentOrderConnector,
} from '../../connectors/replenishment-order/index';
import { UserActions } from '../actions/index';
import * as fromUserReplenishmentOrdersEffect from './user-replenishment-orders.effect';
import { Action } from '@ngrx/store';

const mockUserReplenishmentOrders: ReplenishmentOrderList = {
  replenishmentOrders: [],
  pagination: {},
  sorts: [],
};

describe('User Replenishment Orders effect', () => {
  let userReplenishmentOrdersEffect: fromUserReplenishmentOrdersEffect.UserReplenishmentOrdersEffect;
  let replenishmentOrderConnector: UserReplenishmentOrderConnector;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        fromUserReplenishmentOrdersEffect.UserReplenishmentOrdersEffect,
        { provide: UserReplenishmentOrderAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.inject(Actions);
    userReplenishmentOrdersEffect = TestBed.inject(
      fromUserReplenishmentOrdersEffect.UserReplenishmentOrdersEffect
    );
    replenishmentOrderConnector = TestBed.inject(
      UserReplenishmentOrderConnector
    );
  });

  describe('loadUserReplenishmentOrders$', () => {
    it('should load user Orders', () => {
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
        'Error'
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(
        userReplenishmentOrdersEffect.loadUserReplenishmentOrders$
      ).toBeObservable(expected);
    });
  });
});
