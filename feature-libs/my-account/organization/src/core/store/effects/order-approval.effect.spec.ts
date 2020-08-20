import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { Observable, of, throwError } from 'rxjs';

import {
  OrderApproval,
  OrderApprovalDecision,
  OrderApprovalDecisionValue,
  OccConfig,
  normalizeHttpError
} from '@spartacus/core';

import { B2BSearchConfig } from '../../model/search-config';
import { OrderApprovalActions } from '../actions/index';
import * as fromEffects from './order-approval.effect';
import createSpy = jasmine.createSpy;
import { defaultOccOrganizationConfig } from '../../occ/adapters/organization/default-occ-organization-config';
import { OrderApprovalConnector } from '../../connectors/order-approval/order-approval.connector';

const error = normalizeHttpError('error');
const orderApprovalCode = 'testCode';
const userId = 'testUser';
const orderApproval: OrderApproval = {
  code: orderApprovalCode,
};

const orderApprovalDecision: OrderApprovalDecision = {
  decision: OrderApprovalDecisionValue.APPROVE,
  comment: 'yeah',
};

const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'code' }];

class MockOrderApprovalConnector {
  get = createSpy().and.returnValue(of(orderApproval));
  getList = createSpy().and.returnValue(
    of({ values: [orderApproval], pagination, sorts })
  );
  makeDecision = createSpy().and.returnValue(of(orderApprovalDecision));
}

describe('OrderApproval Effects', () => {
  let actions$: Observable<OrderApprovalActions.OrderApprovalAction>;
  let orderApprovalConnector: OrderApprovalConnector;
  let effects: fromEffects.OrderApprovalEffects;
  let expected: TestColdObservable;

  const mockOrderApprovalState = {
    details: {
      entities: {
        testLoadedCode: { loading: false, value: orderApproval },
        testLoadingCode: { loading: true, value: null },
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({ orderApproval: () => mockOrderApprovalState }),
      ],
      providers: [
        {
          provide: OrderApprovalConnector,
          useClass: MockOrderApprovalConnector,
        },
        { provide: OccConfig, useValue: defaultOccOrganizationConfig },
        fromEffects.OrderApprovalEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.get(
      fromEffects.OrderApprovalEffects as Type<fromEffects.OrderApprovalEffects>
    );
    orderApprovalConnector = TestBed.get(
      OrderApprovalConnector as Type<OrderApprovalConnector>
    );
    expected = null;
  });

  describe('loadOrderApproval$', () => {
    it('should return LoadOrderApprovalSuccess action', () => {
      const action = new OrderApprovalActions.LoadOrderApproval({
        userId,
        orderApprovalCode,
      });
      const completion = new OrderApprovalActions.LoadOrderApprovalSuccess([
        orderApproval,
      ]);
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadOrderApproval$).toBeObservable(expected);
      expect(orderApprovalConnector.get).toHaveBeenCalledWith(
        userId,
        orderApprovalCode
      );
    });

    it('should return LoadOrderApprovalFail action if orderApproval not updated', () => {
      orderApprovalConnector.get = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new OrderApprovalActions.LoadOrderApproval({
        userId,
        orderApprovalCode,
      });
      const completion = new OrderApprovalActions.LoadOrderApprovalFail({
        orderApprovalCode,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadOrderApproval$).toBeObservable(expected);
      expect(orderApprovalConnector.get).toHaveBeenCalledWith(
        userId,
        orderApprovalCode
      );
    });
  });

  describe('loadOrderApprovals$', () => {
    const params: B2BSearchConfig = { sort: 'code' };

    it('should return LoadOrderApprovalSuccess action', () => {
      const action = new OrderApprovalActions.LoadOrderApprovals({
        userId,
        params,
      });
      const completion = new OrderApprovalActions.LoadOrderApprovalSuccess([
        orderApproval,
      ]);
      const completion2 = new OrderApprovalActions.LoadOrderApprovalsSuccess({
        params,
        page: { ids: [orderApprovalCode], pagination, sorts },
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion, c: completion2 });

      expect(effects.loadOrderApprovals$).toBeObservable(expected);
      expect(orderApprovalConnector.getList).toHaveBeenCalledWith(
        userId,
        params
      );
    });

    it('should return LoadOrderApprovalsFail action if orderApprovals not loaded', () => {
      orderApprovalConnector.getList = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new OrderApprovalActions.LoadOrderApprovals({
        userId,
        params,
      });
      const completion = new OrderApprovalActions.LoadOrderApprovalsFail({
        error,
        params,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadOrderApprovals$).toBeObservable(expected);
      expect(orderApprovalConnector.getList).toHaveBeenCalledWith(
        userId,
        params
      );
    });
  });

  describe('makeDecision$', () => {
    it('should return MakeDecisionSuccess action', () => {
      const action = new OrderApprovalActions.MakeDecision({
        userId,
        orderApprovalCode,
        orderApprovalDecision,
      });
      const completion1 = new OrderApprovalActions.MakeDecisionSuccess({
        orderApprovalCode,
        orderApprovalDecision,
      });
      const completion2 = new OrderApprovalActions.LoadOrderApproval({
        userId,
        orderApprovalCode,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.makeDecision$).toBeObservable(expected);
      expect(orderApprovalConnector.makeDecision).toHaveBeenCalledWith(
        userId,
        orderApprovalCode,
        orderApprovalDecision
      );
    });

    it('should return MakeDecisionFail action if decision not created', () => {
      orderApprovalConnector.makeDecision = createSpy(
        'makeDecision'
      ).and.returnValue(throwError(error));
      const action = new OrderApprovalActions.MakeDecision({
        userId,
        orderApprovalCode,
        orderApprovalDecision,
      });
      const completion = new OrderApprovalActions.MakeDecisionFail({
        orderApprovalCode,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.makeDecision$).toBeObservable(expected);
      expect(orderApprovalConnector.makeDecision).toHaveBeenCalledWith(
        userId,
        orderApprovalCode,
        orderApprovalDecision
      );
    });
  });
});
