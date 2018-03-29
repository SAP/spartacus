import { TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import * as fromRoot from './../../../routing/store';

describe('Checkout Selectors', () => {
  let store: Store<fromReducers.CheckoutState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          checkout: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getDeliveryAddress', () => {
    it('should return the cart delivery address', () => {
      const address: any = {
        id: 'testAddressId',
        firstName: 'John',
        lastName: 'Doe',
        titleCode: 'mr',
        line1: 'Toyosaki 2 create on cart'
      };

      let result;
      store
        .select(fromSelectors.getDeliveryAddress)
        .subscribe(value => (result = value));

      expect(result).toEqual({});

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
        .select(fromSelectors.getDeliveryMode)
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
        .select(fromSelectors.getSupportedDeliveryModes)
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
        .select(fromSelectors.getSelectedDeliveryMode)
        .subscribe(value => (result = value));

      expect(result).toEqual(undefined);

      store.dispatch(new fromActions.LoadSupportedDeliveryModesSuccess(modes));
      store.dispatch(new fromActions.SetDeliveryModeSuccess('code1'));

      expect(result).toEqual(modes.deliveryModes[0]);
    });
  });
});
