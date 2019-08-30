import { Title } from '../../../model/misc.model';
import { UserActions } from '../actions/index';
import * as fromReducer from './titles.reducer';

describe('Titles Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as UserActions.TitlesAction;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_TITLES_SUCCESS action', () => {
    it('should populate the titles state entities', () => {
      const mockTitles: Title[] = [
        {
          code: 'mr',
          name: 'Mr.',
        },
        {
          code: 'mrs',
          name: 'Mrs.',
        },
      ];

      const mockTitlesList = {
        mr: mockTitles[0],
        mrs: mockTitles[1],
      };

      const { initialState } = fromReducer;
      const action = new UserActions.LoadTitlesSuccess(mockTitles);
      const state = fromReducer.reducer(initialState, action);
      expect(state.entities).toEqual(mockTitlesList);
    });
  });

  describe('CLEAR_MISCS_DATA action', () => {
    it('should clear the mics data', () => {
      const { initialState } = fromReducer;
      const action = new UserActions.ClearUserMiscsData();
      const state = fromReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});
