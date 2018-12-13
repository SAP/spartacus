import * as fromAction from './regions.action';

describe('Regions Actions', () => {
  describe('LoadRegions', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadRegions('CA');
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_REGIONS,
        payload: 'CA'
      });
    });
  });

  describe('LoadRegionsFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromAction.LoadRegionsFail(error);

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_REGIONS_FAIL,
        payload: error
      });
    });
  });

  describe('LoadRegionsSuccess', () => {
    it('should create the action', () => {
      const regions = [
        {
          isocode: 'CA-ON',
          name: 'Ontario'
        },
        {
          isocode: 'CA-QC',
          name: 'Quebec'
        }
      ];
      const action = new fromAction.LoadRegionsSuccess(regions);
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_REGIONS_SUCCESS,
        payload: regions
      });
    });
  });
});
