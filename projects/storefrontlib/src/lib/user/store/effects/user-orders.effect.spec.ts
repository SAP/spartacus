import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as fromUserOrdersEffect from './user-orders.effect';
import * as fromUserOrdersAction from '../actions/user-orders.action';
import { OccOrderService } from '../../../occ/order/order.service';
import { Observable, of } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';

const mockUserOrders = {
  orders: [],
  pagination: {},
  sort: []
};
class MockOcOrderService {
  getOrders() {
    return;
  }
}

describe('User Orders effect', () => {
  let userOrdersEffect: fromUserOrdersEffect.UserOrdersEffect;
  let orderService: OccOrderService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromUserOrdersEffect.UserOrdersEffect,
        { provide: OccOrderService, useClass: MockOcOrderService },
        provideMockActions(() => actions$)
      ]
    });

    userOrdersEffect = TestBed.get(fromUserOrdersEffect.UserOrdersEffect);
    orderService = TestBed.get(OccOrderService);

    spyOn(orderService, 'getOrders').and.returnValue(of(mockUserOrders));
  });

  describe('loadUserOrders$', () => {
    it('should load user Orders', () => {
      const action = new fromUserOrdersAction.LoadUserOrders({
        userId: 'test@sap.com',
        pageSize: 5
      });
      const completion = new fromUserOrdersAction.LoadUserOrdersSuccess(
        mockUserOrders
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userOrdersEffect.loadUserOrders$).toBeObservable(expected);
    });
  });
});
