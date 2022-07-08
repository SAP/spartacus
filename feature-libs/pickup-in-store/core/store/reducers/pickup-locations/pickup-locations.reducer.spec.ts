import { PickupLocationActions } from '../../actions';
import { IntendedPickupLocationsState } from '../../pickup-location-state';
import * as fromReducer from './pickup-locations.reducer';

describe('intendedPickupLocationsReducer', () => {
  it('should add a location to the pickup location state', () => {
    const { intendedPickupLocationsInitialState } = fromReducer;
    expect(intendedPickupLocationsInitialState).toEqual({});
    const action = PickupLocationActions.AddLocation({
      payload: { productCode: 'P0001', location: { name: 'Store Name' } },
    });
    const newState = fromReducer.intendedPickupLocationsReducer(
      intendedPickupLocationsInitialState,
      action
    );
    const expected: IntendedPickupLocationsState = {
      P0001: { name: 'Store Name' },
    };
    expect(newState).toEqual(expected);
  });

  it('should remove a location to the pickup location state', () => {
    const intendedPickupLocationsInitialState = {
      P0001: { name: 'Store Name' },
    };
    const action = PickupLocationActions.RemoveLocation({
      payload: 'P0001',
    });
    const newState = fromReducer.intendedPickupLocationsReducer(
      intendedPickupLocationsInitialState,
      action
    );
    const expected: IntendedPickupLocationsState = {};
    expect(newState).toEqual(expected);
  });

  it('should not alter the state when trying to remove non-existent product code', () => {
    const initialState = {
      P0001: { name: 'Store Name' },
    };
    const action = PickupLocationActions.RemoveLocation({
      payload: 'P0002',
    });
    const newState = fromReducer.intendedPickupLocationsReducer(
      initialState,
      action
    );
    expect(newState).toEqual(initialState);
  });
});
