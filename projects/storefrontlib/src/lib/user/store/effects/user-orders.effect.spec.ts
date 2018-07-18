import { ConfigService } from '../../../occ/config.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import * as fromUserOrdersEffect from './user-orders.effect';
import * as fromUserOrdersAction from '../actions/user-orders.action';
import { OccOrderService } from '../../../occ/order/order.service';
import { Observable, of, EMPTY, throwError } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';

const mockUserOrders = {
  orders: [],
  pagination: {},
  sort: []
};

class MockConfigService {
  server = {
    baseUrl: '',
    occPrefix: ''
  };

  site = {
    baseSite: ''
  };

  authentication = {
    client_id: '',
    client_secret: '',
    userToken: {}
  };
}

class TestActions extends Actions {
  constructor() {
    super(EMPTY);
  }
  set stream(source: Observable<any>) {
    this.source = source;
  }
}

fdescribe('User Orders effect', () => {
  let userOrdersEffect: fromUserOrdersEffect.UserOrdersEffect;
  let orderService: OccOrderService;
  let actions$: TestActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccOrderService,
        fromUserOrdersEffect.UserOrdersEffect,
        { provide: Actions, useClass: TestActions },
        { provide: ConfigService, useClass: MockConfigService }
      ]
    });

    actions$ = TestBed.get(Actions);
    userOrdersEffect = TestBed.get(fromUserOrdersEffect.UserOrdersEffect);
    orderService = TestBed.get(OccOrderService);
  });

  describe('loadUserOrders$', () => {
    it('should load user Orders', () => {
      spyOn(orderService, 'getOrders').and.returnValue(of(mockUserOrders));
      const action = new fromUserOrdersAction.LoadUserOrders({
        userId: 'test@sap.com',
        pageSize: 5
      });

      const completion = new fromUserOrdersAction.LoadUserOrdersSuccess(
        mockUserOrders
      );

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userOrdersEffect.loadUserOrders$).toBeObservable(expected);
    });

    it('should handle failures for load user Orders', () => {
      spyOn(orderService, 'getOrders').and.returnValue(throwError('Error'));

      const action = new fromUserOrdersAction.LoadUserOrders({
        userId: 'test@sap.com',
        pageSize: 5
      });

      const completion = new fromUserOrdersAction.LoadUserOrdersFail('Error');

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userOrdersEffect.loadUserOrders$).toBeObservable(expected);
    });
  });
});
