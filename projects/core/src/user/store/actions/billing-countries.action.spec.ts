import { resetMeta } from '../../../state';
import { Country } from '../../../occ/occ-models/index';

import * as fromAction from './billing-countries.action';

describe('Billing Countries Actions', () => {
  describe('LoadBillingCountries', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadBillingCountries();

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_BILLING_COUNTRIES
      });
    });
  });

  describe('LoadBillingCountriesFail', () => {
    it('should create the action', () => {
      const sampleError = 'sample error';
      const action = new fromAction.LoadBillingCountriesFail(sampleError);

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_BILLING_COUNTRIES_FAIL,
        payload: sampleError
      });
    });
  });

  describe('LoadBillingCountriesSuccess', () => {
    it('should create the action', () => {
      const countries: Country[] = [
        {
          isocode: 'AL',
          name: 'Albania'
        },
        {
          isocode: 'AD',
          name: 'Andorra'
        }
      ];
      const action = new fromAction.LoadBillingCountriesSuccess(countries);
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_BILLING_COUNTRIES_SUCCESS,
        payload: countries
      });
    });
  });

  describe('ResetBillingCountries', () => {
    it('should create the action', () => {
      const action = new fromAction.ResetBillingCountries();
      expect({ ...action }).toEqual({
        type: fromAction.RESET_BILLING_COUNTRIES,
        meta: resetMeta(fromAction.RESET_BILLING_COUNTRIES)
      });
    });
  });
});
