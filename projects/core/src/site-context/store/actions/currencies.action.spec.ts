import { Currency } from '../../../model/misc.model';
import { SiteContextActions } from './index';

describe('Currencies Actions', () => {
  describe('LoadCurrencies Actions', () => {
    describe('LoadCurrencies', () => {
      it('should create an action', () => {
        const action = new SiteContextActions.LoadCurrencies();
        expect({ ...action }).toEqual({
          type: SiteContextActions.LOAD_CURRENCIES,
        });
      });
    });

    describe('LoadCurrenciesFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new SiteContextActions.LoadCurrenciesFail(payload);

        expect({ ...action }).toEqual({
          type: SiteContextActions.LOAD_CURRENCIES_FAIL,
          payload,
        });
      });
    });

    describe('LoadCurrenciesSuccess', () => {
      it('should create an action', () => {
        const payload: Currency[] = [
          { active: false, isocode: 'USD', name: 'US Dollar', symbol: '$' },
        ];
        const action = new SiteContextActions.LoadCurrenciesSuccess(payload);

        expect({ ...action }).toEqual({
          type: SiteContextActions.LOAD_CURRENCIES_SUCCESS,
          payload,
        });
      });
    });
  });

  describe('SetActiveCurrency Action', () => {
    it('should create an action', () => {
      const action = new SiteContextActions.SetActiveCurrency('USD');
      expect({ ...action }).toEqual({
        type: SiteContextActions.SET_ACTIVE_CURRENCY,
        payload: 'USD',
      });
    });
  });

  describe('CurrencyChange Action', () => {
    it('should create an action', () => {
      const action = new SiteContextActions.CurrencyChange({
        previous: 'previous',
        current: 'current',
      });
      expect({ ...action }).toEqual({
        type: SiteContextActions.CURRENCY_CHANGE,
        payload: {
          previous: 'previous',
          current: 'current',
        },
      });
    });
  });
});
