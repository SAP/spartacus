import { BaseSite } from '../../../model/misc.model';
import { SiteContextActions } from './index';

describe('BaseSite Actions', () => {
  describe('LoadBaseSite Actions', () => {
    describe('LoadBaseSite', () => {
      it('should create an action', () => {
        const action = new SiteContextActions.LoadBaseSite();
        expect({ ...action }).toEqual({
          type: SiteContextActions.LOAD_BASE_SITE,
        });
      });
    });

    describe('LoadBaseSiteFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new SiteContextActions.LoadBaseSiteFail(payload);

        expect({ ...action }).toEqual({
          type: SiteContextActions.LOAD_BASE_SITE_FAIL,
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
        const action = new SiteContextActions.LoadBaseSiteSuccess(payload);

        expect({ ...action }).toEqual({
          type: SiteContextActions.LOAD_BASE_SITE_SUCCESS,
          payload,
        });
      });
    });
  });

  describe('LoadBaseSites Actions', () => {
    describe('LoadBaseSites', () => {
      it('should create an action', () => {
        const action = new SiteContextActions.LoadBaseSites();
        expect({ ...action }).toEqual({
          type: SiteContextActions.LOAD_BASE_SITES,
        });
      });
    });

    describe('LoadBaseSitesFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new SiteContextActions.LoadBaseSitesFail(payload);

        expect({ ...action }).toEqual({
          type: SiteContextActions.LOAD_BASE_SITES_FAIL,
          payload,
        });
      });
    });

    describe('LoadBaseSitesSuccess', () => {
      it('should create an action', () => {
        const payload: BaseSite[] = [
          {
            uid: 'test',
            defaultPreviewCategoryCode: 'test category code',
            defaultPreviewProductCode: 'test product code',
          },
        ];
        const action = new SiteContextActions.LoadBaseSitesSuccess(payload);

        expect({ ...action }).toEqual({
          type: SiteContextActions.LOAD_BASE_SITES_SUCCESS,
          payload,
        });
      });
    });
  });

  describe('SetActiveBaseSite Action', () => {
    it('should create an action', () => {
      const action = new SiteContextActions.SetActiveBaseSite('USD');
      expect({ ...action }).toEqual({
        type: SiteContextActions.SET_ACTIVE_BASE_SITE,
        payload: 'USD',
      });
    });
  });

  describe('BaseSiteChange Action', () => {
    it('should create an action', () => {
      const action = new SiteContextActions.BaseSiteChange();
      expect({ ...action }).toEqual({
        type: SiteContextActions.BASE_SITE_CHANGE,
      });
    });
  });
});
