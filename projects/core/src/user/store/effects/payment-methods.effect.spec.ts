import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { GlobalMessageService } from '../../../global-message/facade/global-message.service';
import { GlobalMessageType } from '../../../global-message/models/global-message.model';
import { PaymentDetails } from '../../../model/cart.model';
import { OCC_USER_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { UserPaymentAdapter } from '../../connectors/payment/user-payment.adapter';
import { UserPaymentConnector } from '../../connectors/payment/user-payment.connector';
import { UserActions } from '../actions/index';
import * as fromPaymentMethodsEffect from './payment-methods.effect';
import createSpy = jasmine.createSpy;

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

const mockPaymentMethods: PaymentDetails[] = [{ id: '3710178129845' }];

describe('Payment methods effect', () => {
  let userPaymentMethodsEffect: fromPaymentMethodsEffect.UserPaymentMethodsEffects;
  let userPaymentConnector: UserPaymentConnector;
  let globalMessageService: GlobalMessageService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromPaymentMethodsEffect.UserPaymentMethodsEffects,
        { provide: UserPaymentAdapter, useValue: {} },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        provideMockActions(() => actions$),
      ],
    });

    userPaymentMethodsEffect = TestBed.inject(
      fromPaymentMethodsEffect.UserPaymentMethodsEffects
    );
    userPaymentConnector = TestBed.inject(UserPaymentConnector);
    globalMessageService = TestBed.inject(GlobalMessageService);

    spyOn(userPaymentConnector, 'getAll').and.returnValue(
      of(mockPaymentMethods)
    );
    spyOn(userPaymentConnector, 'setDefault').and.returnValue(of({}));

    spyOn(userPaymentConnector, 'delete').and.returnValue(of({}));
  });

  describe('loadUserPaymentMethods$', () => {
    it('should load user payment methods', () => {
      const action = new UserActions.LoadUserPaymentMethods('3710178129845');
      const completion = new UserActions.LoadUserPaymentMethodsSuccess(
        mockPaymentMethods
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userPaymentMethodsEffect.loadUserPaymentMethods$).toBeObservable(
        expected
      );
    });
  });

  describe('setDefaultUserPaymentMethod$', () => {
    it('should set default user payment method', () => {
      const action = new UserActions.SetDefaultUserPaymentMethod({
        userId: OCC_USER_ID_CURRENT,
        paymentMethodID: '5216871129145',
      });
      const completion = new UserActions.SetDefaultUserPaymentMethodSuccess({});
      const completion2 = new UserActions.LoadUserPaymentMethods(
        OCC_USER_ID_CURRENT
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion, c: completion2 });
      expect(
        userPaymentMethodsEffect.setDefaultUserPaymentMethod$
      ).toBeObservable(expected);
    });
  });

  describe('deleteUserPaymentMethod$', () => {
    it('should delete user payment method', () => {
      const action = new UserActions.DeleteUserPaymentMethod({
        userId: OCC_USER_ID_CURRENT,
        paymentMethodID: '3710178129845',
      });
      const completion = new UserActions.DeleteUserPaymentMethodSuccess({});
      const completion2 = new UserActions.LoadUserPaymentMethods(
        OCC_USER_ID_CURRENT
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion, c: completion2 });
      expect(userPaymentMethodsEffect.deleteUserPaymentMethod$).toBeObservable(
        expected
      );
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'paymentCard.deletePaymentSuccess' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });
  });
});
