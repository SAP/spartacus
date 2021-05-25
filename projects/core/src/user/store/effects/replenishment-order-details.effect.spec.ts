import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { GlobalMessageService } from '../../../global-message/facade/global-message.service';
import { GlobalMessageType } from '../../../global-message/models/global-message.model';
import { Translatable } from '../../../i18n/translatable';
import { ReplenishmentOrder } from '../../../model/replenishment-order.model';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { UserReplenishmentOrderConnector } from '../../connectors/replenishment-order/user-replenishment-order.connector';
import { UserActions } from '../actions/index';
import * as fromEffects from './replenishment-order-details.effect';

const mockUserId = 'test-user';
const mockReplenishmentCode = 'test-repl-code';
const mockError = 'test-error';

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
};

class MockReplenishmentOrderConnector {
  load(
    _userId: string,
    _replenishmentOrderCode: string
  ): Observable<ReplenishmentOrder> {
    return of({});
  }

  cancelReplenishmentOrder(
    _userId: string,
    _replenishmentOrderCode: string
  ): Observable<ReplenishmentOrder> {
    return of({});
  }
}

class MockGlobalMessageService {
  add(
    _text: string | Translatable,
    _type: GlobalMessageType,
    _timeout?: number
  ): void {}
}

describe('ReplenishmentOrderDetailsEffect', () => {
  let connector: UserReplenishmentOrderConnector;
  let effects: fromEffects.ReplenishmentOrderDetailsEffect;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserReplenishmentOrderConnector,
          useClass: MockReplenishmentOrderConnector,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        fromEffects.ReplenishmentOrderDetailsEffect,
        provideMockActions(() => actions$),
      ],
    });

    connector = TestBed.inject(UserReplenishmentOrderConnector);
    effects = TestBed.inject(fromEffects.ReplenishmentOrderDetailsEffect);
  });

  describe('loadReplenishmentOrderDetails$', () => {
    it('should load replenishment order details', () => {
      spyOn(connector, 'load').and.returnValue(of(mockReplenishmentOrder));

      const action = new UserActions.LoadReplenishmentOrderDetails({
        userId: mockUserId,
        replenishmentOrderCode: mockReplenishmentCode,
      });
      const completion = new UserActions.LoadReplenishmentOrderDetailsSuccess(
        mockReplenishmentOrder
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: completion,
      });

      expect(effects.loadReplenishmentOrderDetails$).toBeObservable(expected);
    });

    it('should return an error when it fails to load a replenishment order details', () => {
      spyOn(connector, 'load').and.returnValue(throwError(mockError));

      const action = new UserActions.LoadReplenishmentOrderDetails({
        userId: mockUserId,
        replenishmentOrderCode: mockReplenishmentCode,
      });
      const completion = new UserActions.LoadReplenishmentOrderDetailsFail(
        normalizeHttpError(mockError)
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: completion,
      });

      expect(effects.loadReplenishmentOrderDetails$).toBeObservable(expected);
    });
  });

  describe('cancelReplenishmentOrder$', () => {
    it('should cancel a replenishment order', () => {
      spyOn(connector, 'cancelReplenishmentOrder').and.returnValue(
        of(mockReplenishmentOrder)
      );

      const action = new UserActions.CancelReplenishmentOrder({
        userId: mockUserId,
        replenishmentOrderCode: mockReplenishmentCode,
      });
      const completion = new UserActions.CancelReplenishmentOrderSuccess(
        mockReplenishmentOrder
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: completion,
      });

      expect(effects.cancelReplenishmentOrder$).toBeObservable(expected);
    });

    it('should return an error when it fails to cancel a replenishment order', () => {
      spyOn(connector, 'cancelReplenishmentOrder').and.returnValue(
        throwError(mockError)
      );

      const action = new UserActions.CancelReplenishmentOrder({
        userId: mockUserId,
        replenishmentOrderCode: mockReplenishmentCode,
      });
      const completion = new UserActions.CancelReplenishmentOrderFail(
        normalizeHttpError(mockError)
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: completion,
      });

      expect(effects.cancelReplenishmentOrder$).toBeObservable(expected);
    });
  });
});
