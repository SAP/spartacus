import { Country } from '../../../model/address.model';
import { UserActions } from './index';

describe('Billing Countries Actions', () => {
  describe('LoadBillingCountries', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadBillingCountries();

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_BILLING_COUNTRIES,
      });
    });
  });

  describe('LoadBillingCountriesFail', () => {
    it('should create the action', () => {
      const sampleError = 'sample error';
      const action = new UserActions.LoadBillingCountriesFail(sampleError);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_BILLING_COUNTRIES_FAIL,
        payload: sampleError,
      });
    });
  });

  describe('LoadBillingCountriesSuccess', () => {
    it('should create the action', () => {
      const countries: Country[] = [
        {
          isocode: 'AL',
          name: 'Albania',
        },
        {
          isocode: 'AD',
          name: 'Andorra',
        },
      ];
      const action = new UserActions.LoadBillingCountriesSuccess(countries);
      expect({ ...action }).toEqual({
        type: UserActions.LOAD_BILLING_COUNTRIES_SUCCESS,
        payload: countries,
      });
    });
  });
});
