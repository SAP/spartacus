import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import * as fromUserOrdersEffect from './user-orders.effect';
import * as fromUserOrdersAction from '../actions/user-orders.action';
import { Observable, of, throwError } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { OccConfig } from '../../../occ/config/occ-config';
import { OccOrderService } from '../../occ/index';
import { OrderHistoryList } from '../../../occ/occ-models';

const mockUserOrders: OrderHistoryList = {
  orders: [],
  pagination: {},
  sorts: []
};

const MockOccModuleConfig: OccConfig = {
  server: {
    baseUrl: '',
    occPrefix: ''
  },

  site: {
    baseSite: ''
  }
};

describe('User Orders effect', () => {
  let userOrdersEffect: fromUserOrdersEffect.UserOrdersEffect;
  let orderService: OccOrderService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccOrderService,
        fromUserOrdersEffect.UserOrdersEffect,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        provideMockActions(() => actions$)
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

      actions$ = hot('-a', { a: action });
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

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userOrdersEffect.loadUserOrders$).toBeObservable(expected);
    });
  });
});
