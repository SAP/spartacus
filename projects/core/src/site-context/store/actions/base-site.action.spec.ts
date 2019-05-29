import * as fromBaseSite from './base-site.action';
import { BaseSite } from '../../../model/misc.model';

describe('BaseSite Actions', () => {
  describe('LoadBaseSite Actions', () => {
    describe('LoadBaseSite', () => {
      it('should create an action', () => {
        const action = new fromBaseSite.LoadBaseSite();
        expect({ ...action }).toEqual({
          type: fromBaseSite.LOAD_BASE_SITE,
        });
      });
    });

    describe('LoadBaseSiteFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new fromBaseSite.LoadBaseSiteFail(payload);

        expect({ ...action }).toEqual({
          type: fromBaseSite.LOAD_BASE_SITE_FAIL,
          payload,
        });
      });
    });

    describe('LoadBaseSiteSuccess', () => {
      it('should create an action', () => {
        const payload: BaseSite = {
          uid: 'test',
          defaultPreviewCategoryCode: 'test category code',
          defaultPreviewProductCode: 'test product code',
        };
        const action = new fromBaseSite.LoadBaseSiteSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromBaseSite.LOAD_BASE_SITE_SUCCESS,
          payload,
        });
      });
    });
  });

  describe('SetActiveBaseSite Action', () => {
    it('should create an action', () => {
      const action = new fromBaseSite.SetActiveBaseSite('USD');
      expect({ ...action }).toEqual({
        type: fromBaseSite.SET_ACTIVE_BASE_SITE,
        payload: 'USD',
      });
    });
  });

  describe('BaseSiteChange Action', () => {
    it('should create an action', () => {
      const action = new fromBaseSite.BaseSiteChange();
      expect({ ...action }).toEqual({
        type: fromBaseSite.BASE_SITE_CHANGE,
      });
    });
  });
});
