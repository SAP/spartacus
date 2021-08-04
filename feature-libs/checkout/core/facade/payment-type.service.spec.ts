import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  ActiveCartService,
  PaymentType,
  PROCESS_FEATURE,
  UserIdService,
} from '@spartacus/core';
import { of } from 'rxjs';
import * as fromProcessReducers from '../../../../projects/core/src/process/store/reducers/index';
import { CheckoutActions } from '../store/actions/index';
import { CheckoutState } from '../store/checkout-state';
import * as fromCheckoutReducers from '../store/reducers/index';
import { PaymentTypeService } from './payment-type.service';

const userId = 'testUserId';
const cart = {
  code: 'testCart',
  paymentType: { code: 'ACCOUNT' },
  purchaseOrderNumber: 'testNumber',
};

class ActiveCartServiceStub implements Partial<ActiveCartService> {
  cart;
  getActiveCartId() {
    return of(cart.code);
  }
  getActive() {
    return of(cart);
  }
}

class UserIdServiceStub implements Partial<UserIdService> {
  takeUserId() {
    return of(userId);
  }
}
describe('PaymentTypeService', () => {
  let service: PaymentTypeService;
  let store: Store<CheckoutState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('checkout', fromCheckoutReducers.getReducers()),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        PaymentTypeService,
        { provide: ActiveCartService, useClass: ActiveCartServiceStub },
        { provide: UserIdService, useClass: UserIdServiceStub },
      ],
    });

    service = TestBed.inject(PaymentTypeService as Type<PaymentTypeService>);
    store = TestBed.inject(Store as Type<Store<CheckoutState>>);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should PaymentTypeService is injected', inject(
    [PaymentTypeService],
    (checkoutService: PaymentTypeService) => {
      expect(checkoutService).toBeTruthy();
    }
  ));

  it('should be able to get the payment types if data exist', () => {
    store.dispatch(
      new CheckoutActions.LoadPaymentTypesSuccess([
        { code: 'account', displayName: 'account' },
        { code: 'card', displayName: 'masterCard' },
      ])
    );

    let paymentTypes: PaymentType[];
    service.getPaymentTypes().subscribe((data) => {
      paymentTypes = data;
    });
    expect(paymentTypes).toEqual([
      { code: 'account', displayName: 'account' },
      { code: 'card', displayName: 'masterCard' },
    ]);
  });

  it('should be able to get the payment types after trigger data loading when they do not exist', () => {
    spyOn(service, 'loadPaymentTypes').and.callThrough();

    let types: PaymentType[];
    service
      .getPaymentTypes()
      .subscribe((data) => {
        types = data;
      })
      .unsubscribe();

    expect(types).toEqual([]);
    expect(service.loadPaymentTypes).toHaveBeenCalled();
  });

  it('should be able to load payment types', () => {
    service.loadPaymentTypes();
    expect(store.dispatch).toHaveBeenCalledWith(
      new CheckoutActions.LoadPaymentTypes()
    );
  });

  it('should be able to set selected payment type to cart', () => {
    service.setPaymentType('typeCode', 'poNumber');
    expect(store.dispatch).toHaveBeenCalledWith(
      new CheckoutActions.SetPaymentType({
        userId: userId,
        cartId: cart.code,
        typeCode: 'typeCode',
        poNumber: 'poNumber',
      })
    );
  });

  it('should be able to get selected payment type if data exist', () => {
    store.dispatch(new CheckoutActions.SetPaymentTypeSuccess(cart));
    let selected: string;
    service.getSelectedPaymentType().subscribe((data) => {
      selected = data;
    });
    expect(selected).toEqual('ACCOUNT');
  });

  it('should be able to set the selected field if cart has payment type', () => {
    service.getSelectedPaymentType().subscribe();
    expect(store.dispatch).toHaveBeenCalledWith(
      new CheckoutActions.SetPaymentTypeSuccess(cart)
    );
  });

  it('should be able to get whether the selected payment type is ACCOUNT', () => {
    store.dispatch(new CheckoutActions.SetPaymentTypeSuccess(cart));
    let isAccount = false;
    service.isAccountPayment().subscribe((data) => (isAccount = data));
    expect(isAccount).toEqual(true);
  });

  it('should be able to get po number if data exist', () => {
    store.dispatch(new CheckoutActions.SetPaymentTypeSuccess(cart));

    let po: string;
    service.getPoNumber().subscribe((data) => {
      po = data;
    });
    expect(po).toEqual('testNumber');
  });

  it('should be able to set po if cart has it', () => {
    service.getPoNumber().subscribe();
    expect(store.dispatch).toHaveBeenCalledWith(
      new CheckoutActions.SetPaymentTypeSuccess(cart)
    );
  });
});
