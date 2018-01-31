import * as fromCurrency from './currencies.action';
import {
  PageContext,
  PageType
} from '../../../../routing/models/page-context.model';

fdescribe('Currencies Actions', () => {
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
        const payload = [
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
      const context: PageContext = new PageContext(
        '123',
        PageType.PRODUCT_PAGE
      );
      const action = new fromCurrency.CurrencyChange(context);
      expect({ ...action }).toEqual({
        type: fromCurrency.CURRENCY_CHANGE,
        payload: context
      });
    });
  });
});
