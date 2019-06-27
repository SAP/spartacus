import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { PaymentDetails } from '../../model/cart.model';
import { Occ } from '../../occ/occ-models/occ.models';
import { USERID_CURRENT } from '../../occ/utils/occ-constants';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { UserActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import { StateWithUser, USER_FEATURE } from '../store/user-state';
import { UserPaymentService } from './user-payment.service';

describe('UserPaymentService', () => {
  let service: UserPaymentService;
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromStoreReducers.getReducers()),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [UserPaymentService],
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.get(UserPaymentService);
  });

  it('should UserPaymentService is injected', inject(
    [UserPaymentService],
    (userPaymentService: UserPaymentService) => {
      expect(userPaymentService).toBeTruthy();
    }
  ));

  it('should be able to load user payment methods', () => {
    service.loadPaymentMethods();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.LoadUserPaymentMethods(USERID_CURRENT)
    );
  });

  it('should be able to get user payment methods', () => {
    const paymentsList: Occ.PaymentDetailsList = {
      payments: [{ id: 'method1' }, { id: 'method2' }],
    };
    store.dispatch(
      new UserActions.LoadUserPaymentMethodsSuccess(paymentsList.payments)
    );

    let paymentMethods: PaymentDetails[];
    service
      .getPaymentMethods()
      .subscribe(data => {
        paymentMethods = data;
      })
      .unsubscribe();
    expect(paymentMethods).toEqual([{ id: 'method1' }, { id: 'method2' }]);
  });

  it('should be able to get user payment methods loading flag', () => {
    store.dispatch(new UserActions.LoadUserPaymentMethods('testUserId'));

    let flag: boolean;
    service
      .getPaymentMethodsLoading()
      .subscribe(data => {
        flag = data;
      })
      .unsubscribe();
    expect(flag).toEqual(true);
  });

  it('should dispatch proper action for setPaymentMethodAsDefault', () => {
    service.setPaymentMethodAsDefault('paymentMethodId');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.SetDefaultUserPaymentMethod({
        userId: USERID_CURRENT,
        paymentMethodId: 'paymentMethodId',
      })
    );
  });

  it('should dispatch proper action for deleteUserPaymentMethod', () => {
    service.deletePaymentMethod('paymentMethodId');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.DeleteUserPaymentMethod({
        userId: USERID_CURRENT,
        paymentMethodId: 'paymentMethodId',
      })
    );
  });
});
