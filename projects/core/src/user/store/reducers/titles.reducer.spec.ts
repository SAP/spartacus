import * as fromReducer from './titles.reducer';
import * as fromActions from '../actions/';
import { Title } from '../../../occ/occ-models';

describe('Titles Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as
        | fromActions.TitlesAction
        | fromActions.MiscsDataAction;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_TITLES_SUCCESS action', () => {
    it('should populate the titles state entities', () => {
      const mockTitles: Title[] = [
        {
          code: 'mr',
          name: 'Mr.'
        },
        {
          code: 'mrs',
          name: 'Mrs.'
        }
      ];

      const mockTitlesList = {
        mr: mockTitles[0],
        mrs: mockTitles[1]
      };

      const { initialState } = fromReducer;
      const action = new fromActions.LoadTitlesSuccess(mockTitles);
      const state = fromReducer.reducer(initialState, action);
      expect(state.entities).toEqual(mockTitlesList);
    });
  });

  describe('CLEAR_MISCS_DATA action', () => {
    it('should clear the mics data', () => {
      const { initialState } = fromReducer;
      const action = new fromActions.ClearMiscsData();
      const state = fromReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});
