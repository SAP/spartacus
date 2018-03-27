import * as fromReducer from './titles.reducer';
import * as fromActions from '../actions/titles.action';

describe('Titles Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as any;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_TITLES_SUCCESS action', () => {
    it('should populate the titles state entities', () => {
      const mockTitles = [
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
});
