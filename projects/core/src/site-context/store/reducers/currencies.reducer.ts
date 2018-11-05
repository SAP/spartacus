import * as fromCurrencies from '../actions/currencies.action';
import { CurrenciesState } from '../state';

export const initialState: CurrenciesState = {
  entities: {},
  activeCurrency: null
};

export function reducer(
  state = initialState,
  action: fromCurrencies.CurrenciesAction
): CurrenciesState {
  switch (action.type) {
    case fromCurrencies.LOAD_CURRENCIES_SUCCESS: {
      const currencies = action.payload;
      const entities = currencies.reduce(
        (currEntities: { [isocode: string]: any }, currency: any) => {
          return {
            ...currEntities,
            [currency.isocode]: currency
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        entities
      };
    }

    case fromCurrencies.SET_ACTIVE_CURRENCY: {
      const isocode = action.payload;

      return {
        ...state,
        activeCurrency: isocode
      };
    }
  }

  return state;
}
