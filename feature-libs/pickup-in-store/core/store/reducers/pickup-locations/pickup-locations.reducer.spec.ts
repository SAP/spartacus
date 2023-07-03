import { PickupLocationActions } from '../../actions';
import { IntendedPickupLocationsState } from '../../pickup-location-state';
import { defaultPointOfServiceReducer } from './default-point-of-service-name.reducer';
import { getReducers } from './index';
import {
  intendedPickupLocationsInitialState,
  intendedPickupLocationsReducer,
} from './pickup-locations.reducer';
import { storeDetailsReducer } from './store-details.reducer';

describe('intendedPickupLocationsReducer', () => {
  it('should add a location to the pickup location state', () => {
    expect(intendedPickupLocationsInitialState).toEqual({});
    const action = PickupLocationActions.AddLocation({
      payload: {
        productCode: 'P0001',
        location: { name: 'Store Name', pickupOption: 'pickup' },
      },
    });
    const newState = intendedPickupLocationsReducer(
      intendedPickupLocationsInitialState,
      action
    );
    const expected: IntendedPickupLocationsState = {
      P0001: { name: 'Store Name', pickupOption: 'pickup' },
    };
    expect(newState).toEqual(expected);
  });

  it('should remove a location to the pickup location state', () => {
    const intendedPickupLocationsInitialState: IntendedPickupLocationsState = {
      P0001: { name: 'Store Name', pickupOption: 'pickup' },
    };
    const action = PickupLocationActions.RemoveLocation({
      payload: 'P0001',
    });
    const newState: IntendedPickupLocationsState =
      intendedPickupLocationsReducer(
        intendedPickupLocationsInitialState,
        action
      );
    const expected: IntendedPickupLocationsState = {
      P0001: { pickupOption: 'delivery' },
    };
    expect(newState).toEqual(expected);
  });

  it('should set the pickup option for a product in store', () => {
    const action = PickupLocationActions.SetPickupOption({
      payload: {
        productCode: 'P0001',
        pickupOption: 'pickup',
      },
    });

    const received = intendedPickupLocationsReducer(
      intendedPickupLocationsInitialState,
      action
    );
    const expected: IntendedPickupLocationsState = {
      P0001: { pickupOption: 'pickup' },
    };
    expect(received).toEqual(expected);
  });

  it('should set property to be object with single property of pickupOption with value delivery', () => {
    const initialState: IntendedPickupLocationsState = {
      P0001: { name: 'Store Name', pickupOption: 'pickup' },
    };
    const action = PickupLocationActions.RemoveLocation({
      payload: 'P0002',
    });
    const newState = intendedPickupLocationsReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      P0002: { pickupOption: 'delivery' },
    });
  });

  it('getReducer return reducer with all reducers', () => {
    const reducer = getReducers();
    expect(reducer).toEqual({
      intendedPickupLocations: intendedPickupLocationsReducer,
      storeDetails: storeDetailsReducer,
      defaultPointOfService: defaultPointOfServiceReducer,
    });
  });
});
