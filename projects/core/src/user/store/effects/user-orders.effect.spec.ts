import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { OrderHistoryList } from '../../../model/order.model';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { UserOrderAdapter } from '../../connectors/order/user-order.adapter';
import { UserOrderConnector } from '../../connectors/order/user-order.connector';
import { UserActions } from '../actions/index';
import * as fromUserOrdersEffect from './user-orders.effect';

const mockUserOrders: OrderHistoryList = {
  orders: [],
  pagination: {},
  sorts: [],
};

describe('User Orders effect', () => {
  let userOrdersEffect: fromUserOrdersEffect.UserOrdersEffect;
  let orderConnector: UserOrderConnector;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        fromUserOrdersEffect.UserOrdersEffect,
        { provide: UserOrderAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.inject(Actions);
    userOrdersEffect = TestBed.inject(fromUserOrdersEffect.UserOrdersEffect);
    orderConnector = TestBed.inject(UserOrderConnector);
  });

  describe('loadUserOrders$', () => {
    it('should load user Orders', () => {
      spyOn(orderConnector, 'getHistory').and.returnValue(of(mockUserOrders));
      const action = new UserActions.LoadUserOrders({
        userId: 'test@sap.com',
        pageSize: 5,
      });

      const completion = new UserActions.LoadUserOrdersSuccess(mockUserOrders);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userOrdersEffect.loadUserOrders$).toBeObservable(expected);
    });

    it('should handle failures for load user Orders', () => {
      spyOn(orderConnector, 'getHistory').and.returnValue(throwError('Error'));

      const action = new UserActions.LoadUserOrders({
        userId: 'test@sap.com',
        pageSize: 5,
      });

      const completion = new UserActions.LoadUserOrdersFail('Error');

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userOrdersEffect.loadUserOrders$).toBeObservable(expected);
    });
  });

  describe('resetUserOrders$', () => {
    it('should return a reset action', () => {
      const action = new SiteContextActions.LanguageChange({
        previous: 'previous',
        current: 'current',
      });

      const completion = new UserActions.ClearUserOrders();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userOrdersEffect.resetUserOrders$).toBeObservable(expected);
    });
  });
});
