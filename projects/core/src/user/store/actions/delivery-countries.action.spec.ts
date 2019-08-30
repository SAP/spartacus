import { Country } from '../../../model/address.model';
import { UserActions } from './index';

describe('Delivery Countries Actions', () => {
  describe('LoadDeliveryCountries', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadDeliveryCountries();
      expect({ ...action }).toEqual({
        type: UserActions.LOAD_DELIVERY_COUNTRIES,
      });
    });
  });

  describe('LoadDeliveryCountriesFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new UserActions.LoadDeliveryCountriesFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_DELIVERY_COUNTRIES_FAIL,
        payload: error,
      });
    });
  });

  describe('LoadDeliveryCountriesSuccess', () => {
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
      const action = new UserActions.LoadDeliveryCountriesSuccess(countries);
      expect({ ...action }).toEqual({
        type: UserActions.LOAD_DELIVERY_COUNTRIES_SUCCESS,
        payload: countries,
      });
    });
  });
});
