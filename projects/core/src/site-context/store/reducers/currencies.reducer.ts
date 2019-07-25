import { Currency } from '../../../model/misc.model';
import { SiteContextActions } from '../actions/index';
import { CurrenciesState } from '../state';

export const initialState: CurrenciesState = {
  entities: null,
  activeCurrency: null,
};

export function reducer(
  state = initialState,
  action: SiteContextActions.CurrenciesAction
): CurrenciesState {
  switch (action.type) {
    case SiteContextActions.LOAD_CURRENCIES_SUCCESS: {
      const currencies: Currency[] = action.payload;
      const entities = currencies.reduce(
        (currEntities: { [isocode: string]: Currency }, currency: Currency) => {
          return {
            ...currEntities,
            [currency.isocode]: currency,
          };
        },
        {
          ...state.entities,
        }
      );

      return {
        ...state,
        entities,
      };
    }

    case SiteContextActions.SET_ACTIVE_CURRENCY: {
      const isocode: string = action.payload;

      return {
        ...state,
        activeCurrency: isocode,
      };
    }
  }

  return state;
}
