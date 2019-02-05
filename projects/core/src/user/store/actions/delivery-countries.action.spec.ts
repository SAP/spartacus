import * as fromAction from '../actions/delivery-countries.action';
import { resetMeta } from '../../../state';
import { Country } from '../../../occ/occ-models/index';

describe('Delivery Countries Actions', () => {
  describe('LoadDeliveryCountries', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadDeliveryCountries();
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_DELIVERY_COUNTRIES
      });
    });
  });

  describe('LoadDeliveryCountriesFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromAction.LoadDeliveryCountriesFail(error);

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_DELIVERY_COUNTRIES_FAIL,
        payload: error
      });
    });
  });

  describe('LoadDeliveryCountriesSuccess', () => {
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
      const action = new fromAction.LoadDeliveryCountriesSuccess(countries);
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_DELIVERY_COUNTRIES_SUCCESS,
        payload: countries
      });
    });
  });

  describe('ResetDeliveryCountries', () => {
    it('should create the action', () => {
      const action = new fromAction.ResetDeliveryCountries();
      expect({ ...action }).toEqual({
        type: fromAction.RESET_DELIVERY_COUNTRIES,
        meta: resetMeta(fromAction.RESET_DELIVERY_COUNTRIES)
      });
    });
  });
});
