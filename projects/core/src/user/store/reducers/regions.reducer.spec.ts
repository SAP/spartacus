import * as fromActions from '../actions/index';
import { Region } from '../../../occ/occ-models/index';

import * as fromReducer from './regions.reducer';

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
    it('should populate the regions entities', () => {
      const mockRegions: Region[] = [
        {
          isocode: 'CA-ON',
          name: 'Ontario'
        },
        {
          isocode: 'CA-QC',
          name: 'Quebec'
        }
      ];

      const { initialState } = fromReducer;
      const action = new fromActions.LoadRegionsSuccess(mockRegions);
      const state = fromReducer.reducer(initialState, action);
      expect(state.entities).toEqual(mockRegions);
    });
  });
});
