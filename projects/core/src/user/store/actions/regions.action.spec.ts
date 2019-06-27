import { StateLoaderActions } from '../../../state/index';
import { REGIONS } from '../user-state';
import * as fromAction from './regions.action';

const country = 'CA';

describe('Regions Actions', () => {
  describe('LoadRegions', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadRegions(country);
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_REGIONS,
        payload: country,
        meta: StateLoaderActions.loadMeta(REGIONS),
      });
    });
  });

  describe('LoadRegionsFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromAction.LoadRegionsFail(error);

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_REGIONS_FAIL,
        payload: error,
        meta: StateLoaderActions.failMeta(REGIONS, error),
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
      const action = new fromAction.LoadRegionsSuccess({
        country,
        entities: regions,
      });
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_REGIONS_SUCCESS,
        payload: {
          entities: regions,
          country,
        },
        meta: StateLoaderActions.successMeta(REGIONS),
      });
    });
  });

  describe('ClearRegions', () => {
    it('should create the action', () => {
      const action = new fromAction.ClearRegions();
      expect({ ...action }).toEqual({
        type: fromAction.CLEAR_REGIONS,
      });
    });
  });
});
