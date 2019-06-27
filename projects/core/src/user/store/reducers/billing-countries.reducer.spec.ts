import { Country } from '../../../model/address.model';
import { UserActions } from '../actions/index';
import * as fromReducer from './billing-countries.reducer';

describe('Billing Countries Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as UserActions.BillingCountriesAction;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_DELIVERTY_COUNTRIES_SUCCESS action', () => {
    it('should populate the billing countries state entities', () => {
      const mockCountries: Country[] = [
        {
          isocode: 'AL',
          name: 'Albania',
        },
        {
          isocode: 'AD',
          name: 'Andorra',
        },
      ];

      const mockCountriesList = {
        AL: mockCountries[0],
        AD: mockCountries[1],
      };

      const { initialState } = fromReducer;
      const action = new UserActions.LoadBillingCountriesSuccess(mockCountries);
      const state = fromReducer.reducer(initialState, action);
      expect(state.entities).toEqual(mockCountriesList);
    });
  });

  describe('CLEAR_MISCS_DATA action', () => {
    it('should clear the mics data', () => {
      const { initialState } = fromReducer;
      const action = new UserActions.ClearUserMiscsData();
      const state = fromReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});
