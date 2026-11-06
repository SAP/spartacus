import { Currency } from '../../../model/misc.model';
import { SiteContextActions } from '../actions/index';
import * as fromCurrencies from './currencies.reducer';

describe('Currencies Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromCurrencies;
      const action = {} as SiteContextActions.CurrenciesAction;
      const state = fromCurrencies.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_CURRENCIES_SUCCESS action', () => {
    it('should populate the currencies state entities', () => {
      const currencies: Currency[] = [
        { active: false, isocode: 'USD', name: 'US Dollar', symbol: '$' },
      ];

      const entities: { [key: string]: Currency } = {
        USD: currencies[0],
      };

      const { initialState } = fromCurrencies;
      const action = new SiteContextActions.LoadCurrenciesSuccess(currencies);
      const state = fromCurrencies.reducer(initialState, action);
      expect(state.entities).toEqual(entities);
    });
  });

  describe('SET_ACTIVE_CURRENCY action', () => {
    it('should set active currency', () => {
      const { initialState } = fromCurrencies;
      const action = new SiteContextActions.SetActiveCurrency('JPY');
      const state = fromCurrencies.reducer(initialState, action);

      expect(state.activeCurrency).toEqual('JPY');
    });
  });
});
