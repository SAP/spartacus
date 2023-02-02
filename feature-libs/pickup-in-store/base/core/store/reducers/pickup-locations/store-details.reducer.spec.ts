import { PickupLocationActions } from '../../actions';
import { PickupLocationsState } from '../../pickup-location-state';
import { storeDetailsReducer } from './store-details.reducer';

describe('storeDetailsReducer', () => {
  it('should add store details in the state', () => {
    const action = PickupLocationActions.SetStoreDetailsSuccess({
      payload: {
        name: 'storeName',
        displayName: 'storeDisplayName',
      },
    });

    const mockState: PickupLocationsState['storeDetails'] = {};

    const received = storeDetailsReducer(mockState, action);

    const expected = {
      storeName: {
        name: 'storeName',
        displayName: 'storeDisplayName',
      },
    };

    expect(received).toEqual(expected);
  });

  it('should return the existing state if store name is not defined', () => {
    const action = PickupLocationActions.SetStoreDetailsSuccess({
      payload: {
        displayName: 'storeDisplayName',
      },
    });

    const mockState: PickupLocationsState['storeDetails'] = {};

    const received = storeDetailsReducer(mockState, action);

    const expected = {};

    expect(received).toEqual(expected);
  });
});
