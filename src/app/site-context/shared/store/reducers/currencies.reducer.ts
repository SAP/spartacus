import * as fromCurrencies from '../actions/currencies.action';

export interface CurrenciesState {
  entities: { [isocode: string]: any };
  loaded: boolean;
  activeCurrency: string;
}

export const initialState: CurrenciesState = {
  entities: {},
  loaded: false,
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
        entities,
        loaded: true
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

export const getCurrenciesEntities = (state: CurrenciesState) => state.entities;
export const getCurrenciesLoaded = (state: CurrenciesState) => state.loaded;
export const getActiveCurrency = (state: CurrenciesState) =>
  state.activeCurrency;
