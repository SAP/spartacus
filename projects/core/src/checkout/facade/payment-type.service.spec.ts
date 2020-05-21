import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';
import { PaymentType } from '../../model/cart.model';
import { CheckoutActions } from '../store/actions/index';
import { AuthService } from '../../auth';
import { ActiveCartService } from '../../cart';
import { CheckoutState } from '../store/checkout-state';
import * as fromCheckoutReducers from '../store/reducers/index';
import { PROCESS_FEATURE } from '@spartacus/core';
import { PaymentTypeService } from './payment-type.service';
import * as fromProcessReducers from '../../process/store/reducers/index';

const userId = 'testUserId';
<<<<<<< HEAD
const cart = {
  code: 'testCart',
  paymentType: { code: 'ACCOUNT' },
  purchaseOrderNumber: 'testNumber',
};
=======
const cart = { code: 'testCartId', guid: 'testGuid' };
>>>>>>> epic/b2bcheckout

class ActiveCartServiceStub {
  cart;
  getActiveCartId() {
    return of(cart.code);
  }
  getActive() {
<<<<<<< HEAD
    return of(cart);
=======
    return of({ code: 'testCart', paymentType: { code: 'ACCOUNT' } });
>>>>>>> epic/b2bcheckout
  }
}

class AuthServiceStub {
  userId;
  getOccUserId() {
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
        { provide: AuthService, useClass: AuthServiceStub },
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
<<<<<<< HEAD
    store.dispatch(new CheckoutActions.SetPaymentTypeSuccess(cart));
=======
    store.dispatch(
      new CheckoutActions.LoadPaymentTypesSuccess([
        { code: 'account', displayName: 'account' },
        { code: 'card', displayName: 'masterCard' },
      ])
    );
    store.dispatch(
      new CheckoutActions.SetPaymentType({
        userId: userId,
        cartId: cart.code,
        typeCode: 'CARD',
      })
    );

>>>>>>> epic/b2bcheckout
    let selected: string;
    service.getSelectedPaymentType().subscribe((data) => {
      selected = data;
    });
<<<<<<< HEAD
    expect(selected).toEqual('ACCOUNT');
=======
    expect(selected).toEqual('CARD');
>>>>>>> epic/b2bcheckout
  });

  it('should be able to set the seleced filed if cart has payment type', () => {
    service.getSelectedPaymentType().subscribe();
    expect(store.dispatch).toHaveBeenCalledWith(
<<<<<<< HEAD
      new CheckoutActions.SetPaymentTypeSuccess(cart)
    );
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
=======
      new CheckoutActions.SetSelectedPaymentTypeFlag('ACCOUNT')
>>>>>>> epic/b2bcheckout
    );
  });
});
