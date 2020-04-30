import { StateUtils } from '../../../state/utils/index';
import { REGIONS } from '../user-state';
import { UserActions } from './index';

const country = 'CA';

describe('Regions Actions', () => {
  describe('LoadRegions', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadRegions(country);
      expect({ ...action }).toEqual({
        type: UserActions.LOAD_REGIONS,
        payload: country,
        meta: StateUtils.loadMeta(REGIONS),
      });
    });
  });

  describe('LoadRegionsFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new UserActions.LoadRegionsFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_REGIONS_FAIL,
        payload: error,
        meta: StateUtils.failMeta(REGIONS, error),
      });
    });
  });

  describe('LoadRegionsSuccess', () => {
    it('should create the action', () => {
      const regions = [
        {
          isocode: 'CA-ON',
          name: 'Ontario',
        },
        {
          isocode: 'CA-QC',
          name: 'Quebec',
        },
      ];
      const action = new UserActions.LoadRegionsSuccess({
        country,
        entities: regions,
      });
      expect({ ...action }).toEqual({
        type: UserActions.LOAD_REGIONS_SUCCESS,
        payload: {
          entities: regions,
          country,
        },
        meta: StateUtils.successMeta(REGIONS),
      });
    });
  });

  describe('ClearRegions', () => {
    it('should create the action', () => {
      const action = new UserActions.ClearRegions();
      expect({ ...action }).toEqual({
        type: UserActions.CLEAR_REGIONS,
      });
    });
  });
});
