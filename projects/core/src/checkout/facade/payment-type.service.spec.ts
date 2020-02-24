import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { PaymentType } from '../../model/cart.model';
import { CheckoutActions } from '../store/actions/index';
import { CheckoutState } from '../store/checkout-state';
import * as fromCheckoutReducers from '../store/reducers/index';
import { PROCESS_FEATURE } from '@spartacus/core';
import { PaymentTypeService } from './payment-type.service';
import * as fromProcessReducers from '../../process/store/reducers/index';

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
      providers: [PaymentTypeService],
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
    service.getPaymentTypes().subscribe(data => {
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
      .subscribe(data => {
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
});
