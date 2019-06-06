import * as fromActions from '../actions/index';

import * as fromReducer from './regions.reducer';
import { Region } from '../../../model/address.model';

describe('Regions Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as fromActions.RegionsAction;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_REGIONS_SUCCESS action', () => {
    const country = 'CA';
    const mockRegions: Region[] = [
      {
        isocode: 'CA-ON',
        name: 'Ontario',
      },
      {
        isocode: 'CA-QC',
        name: 'Quebec',
      },
    ];

    it('should populate the regions entities', () => {
      const { initialState } = fromReducer;
      const action = new fromActions.LoadRegionsSuccess({
        entities: mockRegions,
        country,
      });
      const state = fromReducer.reducer(initialState, action);
      expect(state.entities).toEqual(mockRegions);
    });
  });
});
