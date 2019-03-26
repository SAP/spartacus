import * as fromBaseSite from './base-site.action';

describe('Currencies Actions', () => {
  describe('SetActiveBaseSite Action', () => {
    it('should create an action', () => {
      const action = new fromBaseSite.SetActiveBaseSite('USD');
      expect({ ...action }).toEqual({
        type: fromBaseSite.SET_ACTIVE_BASE_SITE,
        payload: 'USD'
      });
    });
  });

  describe('BaseSiteChange Action', () => {
    it('should create an action', () => {
      const action = new fromBaseSite.BaseSiteChange();
      expect({ ...action }).toEqual({
        type: fromBaseSite.BASE_SITE_CHANGE
      });
    });
  });
});
