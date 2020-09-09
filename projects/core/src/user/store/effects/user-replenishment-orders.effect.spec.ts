import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { ReplenishmentOrderList } from '../../../model/replenishment-order.model';
import { UserReplenishmentOrderAdapter } from '../../connectors/replenishment-order/user-replenishment-order.adapter';
import { UserReplenishmentOrderConnector } from '../../connectors/replenishment-order/user-replenishment-order.connector';
import { UserActions } from '../actions/index';
import * as fromUserOrdersEffect from './user-replenishment-orders.effect';

const mockUserReplenishmentOrders: ReplenishmentOrderList = {
  replenishmentOrders: [],
  pagination: {},
  sorts: [],
};

describe('User Replenishment Orders effect', () => {
  let userReplenishmentOrdersEffect: fromUserOrdersEffect.UserReplenishmentOrdersEffect;
  let orderReplenishmentConnector: UserReplenishmentOrderConnector;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        fromUserOrdersEffect.UserReplenishmentOrdersEffect,
        { provide: UserReplenishmentOrderAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.inject(Actions);
    userReplenishmentOrdersEffect = TestBed.inject(
      fromUserOrdersEffect.UserReplenishmentOrdersEffect
    );
    orderReplenishmentConnector = TestBed.inject(
      UserReplenishmentOrderConnector
    );
  });

  describe('loadUserReplenishOrders$', () => {
    it('should load user Orders', () => {
      spyOn(orderReplenishmentConnector, 'loadHistory').and.returnValue(
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
        userReplenishmentOrdersEffect.loadUserReplenishOrders$
      ).toBeObservable(expected);
    });

    it('should handle failures for load user Replenishment Orders', () => {
      spyOn(orderReplenishmentConnector, 'loadHistory').and.returnValue(
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
        userReplenishmentOrdersEffect.loadUserReplenishOrders$
      ).toBeObservable(expected);
    });
  });
});
