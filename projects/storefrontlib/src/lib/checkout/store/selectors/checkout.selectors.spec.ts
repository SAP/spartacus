import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, select } from '@ngrx/store';

import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import { Address } from '../../models/address-model';
import { emptyAddress } from '../reducers/checkout.reducer';

describe('Checkout Selectors', () => {
  let store: Store<fromReducers.CheckoutState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('checkout', fromReducers.getReducers())
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getDeliveryAddress', () => {
    it('should return the cart delivery address', () => {
      const address: Address = {
        id: 'testAddressId',
        firstName: 'John',
        lastName: 'Doe',
        titleCode: 'mr',
        line1: 'Toyosaki 2 create on cart',
        town: 'Montreal',
        postalCode: 'L6M1P9',
        country: { isocode: 'CA' }
      };

      let result;
      store
        .pipe(select(fromSelectors.getDeliveryAddress))
        .subscribe(value => (result = value));

      expect(result).toEqual(emptyAddress);

      store.dispatch(new fromActions.AddDeliveryAddressSuccess(address));

      expect(result).toEqual(address);
    });
  });

  describe('getDeliveryMode', () => {
    it('should return the cart delivery mode', () => {
      const modes: any = {
        deliveryModes: [{ code: 'code1' }, { code: 'code2' }]
      };

      const emptyEntities = {
        supported: {},
        selected: ''
      };

      const entities = {
        supported: {
          code1: modes.deliveryModes[0],
          code2: modes.deliveryModes[1]
        },
        selected: ''
      };

      let result;
      store
        .pipe(select(fromSelectors.getDeliveryMode))
        .subscribe(value => (result = value));

      expect(result).toEqual(emptyEntities);

      store.dispatch(new fromActions.LoadSupportedDeliveryModesSuccess(modes));

      expect(result).toEqual(entities);
    });
  });

  describe('getSupportedDeliveryModes', () => {
    it('should return all supported cart delivery modes', () => {
      const modes: any = {
        deliveryModes: [{ code: 'code1' }, { code: 'code2' }]
      };

      let result;
      store
        .pipe(select(fromSelectors.getSupportedDeliveryModes))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadSupportedDeliveryModesSuccess(modes));

      expect(result).toEqual(modes.deliveryModes);
    });
  });

  describe('getSelectedDeliveryMode', () => {
    it('should return selected cart delivery mode', () => {
      const modes: any = {
        deliveryModes: [{ code: 'code1' }, { code: 'code2' }]
      };

      let result;
      store
        .pipe(select(fromSelectors.getSelectedDeliveryMode))
        .subscribe(value => (result = value));

      expect(result).toEqual(undefined);

      store.dispatch(new fromActions.LoadSupportedDeliveryModesSuccess(modes));
      store.dispatch(new fromActions.SetDeliveryModeSuccess('code1'));

      expect(result).toEqual(modes.deliveryModes[0]);
    });
  });

  describe('getSelectedCode', () => {
    it('should return selected delivery mode code', () => {
      const modes: any = {
        deliveryModes: [{ code: 'code1' }, { code: 'code2' }]
      };

      let result;
      store
        .pipe(select(fromSelectors.getSelectedCode))
        .subscribe(value => (result = value));

      expect(result).toEqual('');

      store.dispatch(new fromActions.LoadSupportedDeliveryModesSuccess(modes));
      store.dispatch(new fromActions.SetDeliveryModeSuccess('code1'));

      expect(result).toEqual('code1');
    });
  });

  describe('getPaymentDetails', () => {
    it('should return payment details', () => {
      let result;
      store
        .pipe(select(fromSelectors.getPaymentDetails))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(
        new fromActions.CreatePaymentDetailsSuccess('paymentDetails')
      );

      expect(result).toEqual('paymentDetails');
    });
  });

  describe('getOrderDetails', () => {
    it('should return order details', () => {
      let result;
      store
        .pipe(select(fromSelectors.getOrderDetails))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.PlaceOrderSuccess('orderDetails'));

      expect(result).toEqual('orderDetails');
    });
  });
});
