import { UserProfileActions } from './index';

describe('Titles Actions', () => {
  describe('LoadTitles', () => {
    it('should create the action', () => {
      const action = new UserProfileActions.LoadTitles();
      expect({ ...action }).toEqual({
        type: UserProfileActions.LOAD_TITLES,
      });
    });
  });

  describe('LoadTitlesFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new UserProfileActions.LoadTitlesFail(error);

      expect({ ...action }).toEqual({
        type: UserProfileActions.LOAD_TITLES_FAIL,
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
      const action = new UserProfileActions.LoadTitlesSuccess(titles);
      expect({ ...action }).toEqual({
        type: UserProfileActions.LOAD_TITLES_SUCCESS,
        payload: titles,
      });
    });
  });
});
