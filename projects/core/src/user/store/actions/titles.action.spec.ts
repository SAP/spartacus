import { UserActions } from './index';

describe('Titles Actions', () => {
  describe('LoadTitles', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadTitles();
      expect({ ...action }).toEqual({
        type: UserActions.LOAD_TITLES,
      });
    });
  });

  describe('LoadTitlesFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new UserActions.LoadTitlesFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_TITLES_FAIL,
        payload: error,
      });
    });
  });

  describe('LoadTitlesSuccess', () => {
    it('should create the action', () => {
      const titles = [
        {
          code: 'mr',
          name: 'Mr.',
        },
        {
          isocode: 'mrs',
          name: 'Mrs.',
        },
      ];
      const action = new UserActions.LoadTitlesSuccess(titles);
      expect({ ...action }).toEqual({
        type: UserActions.LOAD_TITLES_SUCCESS,
        payload: titles,
      });
    });
  });
});
