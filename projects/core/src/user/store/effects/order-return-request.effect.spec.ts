import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import {
  ReturnRequest,
  ReturnRequestEntryInputList,
  ReturnRequestList,
} from '../../../model/order.model';
import { UserOrderAdapter } from '../../connectors/order/user-order.adapter';
import { UserOrderConnector } from '../../connectors/order/user-order.connector';
import { UserActions } from '../actions/index';
import * as fromOrderReturnRequestEffect from './order-return-request.effect';

const mockReturnRequest: ReturnRequest = { rma: '000000' };

const returnRequestInput: ReturnRequestEntryInputList = {
  orderCode: 'orderCode',
  returnRequestEntryInputs: [{ orderEntryNumber: 0, quantity: 1 }],
};

const mockReturnRequestList: ReturnRequestList = {
  returnRequests: [{ rma: '01' }, { rma: '02' }],
  pagination: {
    totalPages: 13,
  },
  sorts: [{ selected: true }, { selected: false }],
};

const mockCancelReturnRequest = {
  userId: 'user15355363988711@ydev.hybris.com',
  returnRequestCode: '00000386',
  returnRequestModification: {},
};

describe('Order Return Request effect', () => {
  let orderReturnRequestEffect: fromOrderReturnRequestEffect.OrderReturnRequestEffect;
  let orderConnector: UserOrderConnector;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        fromOrderReturnRequestEffect.OrderReturnRequestEffect,
        { provide: UserOrderAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.inject(Actions);
    orderReturnRequestEffect = TestBed.inject(
      fromOrderReturnRequestEffect.OrderReturnRequestEffect
    );
    orderConnector = TestBed.inject(UserOrderConnector);
  });

  describe('createReturnRequest$', () => {
    it('should create order return request', () => {
      spyOn(orderConnector, 'return').and.returnValue(of(mockReturnRequest));
      const action = new UserActions.CreateOrderReturnRequest({
        userId: 'userId',
        returnRequestInput,
      });

      const completion = new UserActions.CreateOrderReturnRequestSuccess(
        mockReturnRequest
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderReturnRequestEffect.createReturnRequest$).toBeObservable(
        expected
      );
    });

    it('should handle failures for create order return request', () => {
      spyOn(orderConnector, 'return').and.returnValue(throwError('Error'));

      const action = new UserActions.CreateOrderReturnRequest({
        userId: 'userId',
        returnRequestInput,
      });

      const completion = new UserActions.CreateOrderReturnRequestFail(
        undefined
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderReturnRequestEffect.createReturnRequest$).toBeObservable(
        expected
      );
    });
  });

  describe('loadReturnRequestList$', () => {
    it('should load return request list', () => {
      spyOn(orderConnector, 'getReturnRequestList').and.returnValue(
        of(mockReturnRequestList)
      );
      const action = new UserActions.LoadOrderReturnRequestList({
        userId: 'test@sap.com',
        pageSize: 5,
      });

      const completion = new UserActions.LoadOrderReturnRequestListSuccess(
        mockReturnRequestList
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderReturnRequestEffect.loadReturnRequestList$).toBeObservable(
        expected
      );
    });

    it('should handle failures for load return request list', () => {
      spyOn(orderConnector, 'getReturnRequestList').and.returnValue(
        throwError('Error')
      );
      const action = new UserActions.LoadOrderReturnRequestList({
        userId: 'test@sap.com',
        pageSize: 5,
      });

      const completion = new UserActions.LoadOrderReturnRequestListFail(
        undefined
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderReturnRequestEffect.loadReturnRequestList$).toBeObservable(
        expected
      );
    });
  });

  describe('loadReturnRequest$', () => {
    it('should load an order return request', () => {
      spyOn(orderConnector, 'getReturnRequestDetail').and.returnValue(
        of(mockReturnRequest)
      );
      const action = new UserActions.LoadOrderReturnRequest({
        userId: 'userId',
        returnRequestCode: 'test',
      });

      const completion = new UserActions.LoadOrderReturnRequestSuccess(
        mockReturnRequest
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderReturnRequestEffect.loadReturnRequest$).toBeObservable(
        expected
      );
    });

    it('should handle failures for load an order return request', () => {
      spyOn(orderConnector, 'getReturnRequestDetail').and.returnValue(
        throwError('Error')
      );

      const action = new UserActions.LoadOrderReturnRequest({
        userId: 'userId',
        returnRequestCode: 'test',
      });

      const completion = new UserActions.LoadOrderReturnRequestFail(undefined);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderReturnRequestEffect.loadReturnRequest$).toBeObservable(
        expected
      );
    });
  });

  describe('cancelReturnRequest$', () => {
    it('should cancel return request', () => {
      spyOn(orderConnector, 'cancelReturnRequest').and.returnValue(of({}));

      const action = new UserActions.CancelOrderReturnRequest(
        mockCancelReturnRequest
      );

      const completion = new UserActions.CancelOrderReturnRequestSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderReturnRequestEffect.cancelReturnRequest$).toBeObservable(
        expected
      );
    });

    it('should handle failures for cancel return request', () => {
      spyOn(orderConnector, 'cancelReturnRequest').and.returnValue(
        throwError('Error')
      );

      const action = new UserActions.CancelOrderReturnRequest(
        mockCancelReturnRequest
      );

      const completion = new UserActions.CancelOrderReturnRequestFail(
        undefined
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderReturnRequestEffect.cancelReturnRequest$).toBeObservable(
        expected
      );
    });
  });
});
