import * as fromCurrency from './currencies.action';
import { Currency } from '../../../occ-models/occ.models';

describe('Currencies Actions', () => {
  describe('LoadCurrencies Actions', () => {
    describe('LoadCurrencies', () => {
      it('should create an action', () => {
        const action = new fromCurrency.LoadCurrencies();
        expect({ ...action }).toEqual({
          type: fromCurrency.LOAD_CURRENCIES
        });
      });
    });

    describe('LoadCurrenciesFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new fromCurrency.LoadCurrenciesFail(payload);

        expect({ ...action }).toEqual({
          type: fromCurrency.LOAD_CURRENCIES_FAIL,
          payload
        });
      });
    });

    describe('LoadCurrenciesSuccess', () => {
      it('should create an action', () => {
        const payload: Currency[] = [
          { active: false, isocode: 'USD', name: 'US Dollar', symbol: '$' }
        ];
        const action = new fromCurrency.LoadCurrenciesSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromCurrency.LOAD_CURRENCIES_SUCCESS,
          payload
        });
      });
    });
  });

  describe('SetActiveCurrency Action', () => {
    it('should create an action', () => {
      const action = new fromCurrency.SetActiveCurrency('USD');
      expect({ ...action }).toEqual({
        type: fromCurrency.SET_ACTIVE_CURRENCY,
        payload: 'USD'
      });
    });
  });

  describe('CurrencyChange Action', () => {
    it('should create an action', () => {
      const action = new fromCurrency.CurrencyChange();
      expect({ ...action }).toEqual({
        type: fromCurrency.CURRENCY_CHANGE
      });
    });
  });
});
