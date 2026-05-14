import { Region } from '../../../model/address.model';
import { UserActions } from '../actions/index';
import * as fromReducer from './regions.reducer';

describe('Regions Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as UserActions.RegionsAction;
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
      const action = new UserActions.LoadRegionsSuccess({
        entities: mockRegions,
        country,
      });
      const state = fromReducer.reducer(initialState, action);
      expect(state.entities).toEqual(mockRegions);
    });
  });
});
