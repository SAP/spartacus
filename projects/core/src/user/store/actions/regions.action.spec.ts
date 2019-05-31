import * as fromAction from './regions.action';
import {
  loadMeta,
  failMeta,
  successMeta,
} from '../../../state/utils/loader/loader.action';
import { REGIONS } from '../user-state';

describe('Regions Actions', () => {
  describe('LoadRegions', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadRegions('CA');
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_REGIONS,
        payload: 'CA',
        meta: loadMeta(REGIONS),
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
        meta: failMeta(REGIONS, error),
      });
    });
  });

  describe('LoadRegionsSuccess', () => {
    it('should create the action', () => {
      const country = 'CA';
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
        meta: successMeta(REGIONS),
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
