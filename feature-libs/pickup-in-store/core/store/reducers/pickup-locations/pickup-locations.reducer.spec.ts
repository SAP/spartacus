import { PickupLocationActions } from '../../actions';
import { IntendedPickupLocationsState } from '../../pickup-location-state';
import * as fromReducer from './pickup-locations.reducer';
import { getReducers } from './index';

describe('intendedPickupLocationsReducer', () => {
  it('should add a location to the pickup location state', () => {
    const { intendedPickupLocationsInitialState } = fromReducer;
    expect(intendedPickupLocationsInitialState).toEqual({});
    const action = PickupLocationActions.AddLocation({
      payload: {
        productCode: 'P0001',
        location: { name: 'Store Name', pickupOption: 'pickup' },
      },
    });
    const newState = fromReducer.intendedPickupLocationsReducer(
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
      fromReducer.intendedPickupLocationsReducer(
        intendedPickupLocationsInitialState,
        action
      );
    const expected: IntendedPickupLocationsState = {
      P0001: { pickupOption: 'delivery' },
    };
    expect(newState).toEqual(expected);
  });

  it('should set property to be object with single property of pickupOption with value delivery', () => {
    const initialState: IntendedPickupLocationsState = {
      P0001: { name: 'Store Name', pickupOption: 'pickup' },
    };
    const action = PickupLocationActions.RemoveLocation({
      payload: 'P0002',
    });
    const newState = fromReducer.intendedPickupLocationsReducer(
      initialState,
      action
    );

    expect(newState).toEqual({
      ...initialState,
      P0002: { pickupOption: 'delivery' },
    });
  });

  it('getReducer return reducer with property intendedPickupLocations', () => {
    const reducer = getReducers();
    expect(reducer).toEqual({
      intendedPickupLocations: fromReducer.intendedPickupLocationsReducer,
    });
  });
});
