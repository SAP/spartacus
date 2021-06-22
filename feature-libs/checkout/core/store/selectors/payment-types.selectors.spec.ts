import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { PaymentType } from '@spartacus/core';
import { CheckoutActions } from '../actions/index';
import { CHECKOUT_FEATURE, StateWithCheckout } from '../checkout-state';
import * as fromReducers from '../reducers/index';
import { CheckoutSelectors } from '../selectors/index';

const paymentTypes: PaymentType[] = [
  {
    code: 'card',
    displayName: 'card',
  },
  {
    code: 'account',
    displayName: 'account',
  },
];
describe('Payment Types Selectors', () => {
  let store: Store<StateWithCheckout>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(CHECKOUT_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store as Type<Store<StateWithCheckout>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAllPaymentTypes', () => {
    it('should return all payment types', () => {
      let result: PaymentType[];
      store
        .pipe(select(CheckoutSelectors.getAllPaymentTypes))
        .subscribe((value) => (result = value));
      expect(result).toEqual([]);

      store.dispatch(new CheckoutActions.LoadPaymentTypesSuccess(paymentTypes));
      expect(result).toEqual(paymentTypes);
    });
  });

  describe('getSelectedType', () => {
    it('should return the selected payment type', () => {
      let result: string;
      store
        .pipe(select(CheckoutSelectors.getSelectedPaymentType))
        .subscribe((value) => (result = value));
      expect(result).toEqual(undefined);

      store.dispatch(
        new CheckoutActions.SetPaymentTypeSuccess({
          code: 'testCart',
          paymentType: { code: 'test' },
        })
      );
      expect(result).toEqual('test');
    });
  });
});
