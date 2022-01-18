import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { Country } from '../../model';
import { PaymentDetails } from '../../model/cart.model';
import { Occ } from '../../occ/occ-models/occ.models';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { UserActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import { StateWithUser, USER_FEATURE } from '../store/user-state';
import { UserPaymentService } from './user-payment.service';

class MockUserIdService implements Partial<UserIdService> {
  takeUserId() {
    return of(OCC_USER_ID_CURRENT);
  }
}

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
      providers: [
        UserPaymentService,
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.inject(UserPaymentService);
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
      new UserActions.LoadUserPaymentMethods(OCC_USER_ID_CURRENT)
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
      .subscribe((data) => {
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
      .subscribe((data) => {
        flag = data;
      })
      .unsubscribe();
    expect(flag).toEqual(true);
  });

  it('should indicate successful loading', () => {
    store.dispatch(new UserActions.LoadUserPaymentMethodsSuccess([]));

    let flag: boolean;
    service
      .getPaymentMethodsLoadedSuccess()
      .subscribe((data) => {
        flag = data;
      })
      .unsubscribe();
    expect(flag).toEqual(true);
  });

  it('should dispatch proper action for setPaymentMethodAsDefault', () => {
    service.setPaymentMethodAsDefault('paymentMethodId');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.SetDefaultUserPaymentMethod({
        userId: OCC_USER_ID_CURRENT,
        paymentMethodId: 'paymentMethodId',
      })
    );
  });

  it('should dispatch proper action for deleteUserPaymentMethod', () => {
    service.deletePaymentMethod('paymentMethodId');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.DeleteUserPaymentMethod({
        userId: OCC_USER_ID_CURRENT,
        paymentMethodId: 'paymentMethodId',
      })
    );
  });

  it('should get all billing countries', () => {
    let results: Country[];
    service
      .getAllBillingCountries()
      .subscribe((data) => {
        results = data;
      })
      .unsubscribe();

    expect(results).toEqual([]);
  });

  it('should load billing countries', () => {
    service.loadBillingCountries();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.LoadBillingCountries()
    );
  });
});
