import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { GlobalMessageService } from '../../../global-message/index';
import { PaymentDetails } from '../../../model/cart.model';
import { Address } from '../../../model/address.model';
import { OCC_USER_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { UserPaymentAdapter } from '../../connectors/payment/user-payment.adapter';
import { UserPaymentConnector } from '../../connectors/payment/user-payment.connector';
import { UserActions } from '../actions/index';
import * as fromPaymentMethodsEffect from './payment-methods.effect';

class MockGlobalMessageService {
  add = jasmine.createSpy();
}

const mockAddress: Address = {
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart',
  line2: 'line2',
  town: 'town',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: { isocode: 'JP' },
};

const mockPaymentMethods: PaymentDetails[] = [{ id: '3710178129845' }];
const mockPaymentMethod: PaymentDetails = {
  accountHolderName: 'John Smith',
  billingAddress: mockAddress,
  cardNumber: '1111222233334444',
  cardType: {
    code: 'visa',
    name: 'Visa',
  },
  cvn: '111',
  defaultPayment: true,
  expiryMonth: '01',
  expiryYear: '2030',
  id: '1298453710178',
};

describe('Payment methods effect', () => {
  let userPaymentMethodsEffect: fromPaymentMethodsEffect.UserPaymentMethodsEffects;
  let userPaymentConnector: UserPaymentConnector;
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
        paymentMethodID: '5216871129345',
      });
      const completion = new UserActions.SetDefaultUserPaymentMethodSuccess({});

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(userPaymentMethodsEffect.setDefaultUserPaymentMethod$).toBeObservable(expected);
    });
  });

  describe('deleteUserPaymentMethod$', () => {
    it('should delete user payment method', () => {
      const action = new UserActions.DeleteUserPaymentMethod({
        userId: OCC_USER_ID_CURRENT,
        paymentMethodID: '3710178129845',
      });
      const completion = new UserActions.DeleteUserPaymentMethodSuccess({});
      actions$ = hot('-a', { a: action });

      const expected = cold('-b', { b: completion });
      expect(userPaymentMethodsEffect.deleteUserPaymentMethod$).toBeObservable(expected);
    });
  });
});
