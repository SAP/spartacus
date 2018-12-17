import * as fromCurrencies from '../actions/currencies.action';
import { CurrenciesState } from '../state';
import { Currency } from '../../../occ/occ-models/occ.models';

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
      const currencies: Currency[] = action.payload;
      const entities = currencies.reduce(
        (currEntities: { [isocode: string]: Currency }, currency: Currency) => {
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
      const isocode: string = action.payload;

      return {
        ...state,
        activeCurrency: isocode
      };
    }
  }

  return state;
}
