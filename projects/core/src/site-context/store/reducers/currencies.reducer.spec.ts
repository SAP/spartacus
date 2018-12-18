import * as fromCurrencies from './currencies.reducer';
import * as fromActions from '../actions/currencies.action';
import { Currency } from '../../../occ/occ-models/occ.models';

describe('Currencies Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromCurrencies;
      const action = {} as any;
      const state = fromCurrencies.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_CURRENCIES_SUCCESS action', () => {
    it('should populate the currencies state entities', () => {
      const currencies: Currency[] = [
        { active: false, isocode: 'USD', name: 'US Dollar', symbol: '$' }
      ];

      const entities = {
        USD: currencies[0]
      };

      const { initialState } = fromCurrencies;
      const action = new fromActions.LoadCurrenciesSuccess(currencies);
      const state = fromCurrencies.reducer(initialState, action);
      expect(state.entities).toEqual(entities);
    });
  });

  describe('SET_ACTIVE_CURRENCY action', () => {
    it('should set active currency', () => {
      const { initialState } = fromCurrencies;
      const action = new fromActions.SetActiveCurrency('JPY');
      const state = fromCurrencies.reducer(initialState, action);

      expect(state.activeCurrency).toEqual('JPY');
    });
  });
});
