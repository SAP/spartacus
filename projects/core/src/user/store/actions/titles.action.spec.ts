import * as fromAction from '../actions/titles.action';
import { resetMeta } from '../../../state';

describe('Titles Actions', () => {
  describe('LoadTitles', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadTitles();
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_TITLES
      });
    });
  });

  describe('LoadTitlesFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromAction.LoadTitlesFail(error);

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_TITLES_FAIL,
        payload: error
      });
    });
  });

  describe('LoadTitlesSuccess', () => {
    it('should create the action', () => {
      const titles = [
        {
          code: 'mr',
          name: 'Mr.'
        },
        {
          isocode: 'mrs',
          name: 'Mrs.'
        }
      ];
      const action = new fromAction.LoadTitlesSuccess(titles);
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_TITLES_SUCCESS,
        payload: titles
      });
    });
  });

  describe('ResetTitles', () => {
    it('should create the action', () => {
      const action = new fromAction.ResetTitles();
      expect({ ...action }).toEqual({
        type: fromAction.RESET_TITLES,
        meta: resetMeta(fromAction.RESET_TITLES)
      });
    });
  });
});
