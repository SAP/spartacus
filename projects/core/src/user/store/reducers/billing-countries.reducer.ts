import { BillingCountriesState } from '../user-state';
import * as fromAction from '../actions/billing-countries.action';
import { CLEAR_MISCS_DATA, ClearMiscsData } from '../actions/index';

export const initialState: BillingCountriesState = {
  entities: {}
};

export function reducer(
  state = initialState,
  action: fromAction.BillingCountriesAction | ClearMiscsData
): BillingCountriesState {
  switch (action.type) {
    case fromAction.LOAD_BILLING_COUNTRIES_SUCCESS: {
      const billingCountries = action.payload;
      const entities = billingCountries.reduce(
        (countryEntities: { [isocode: string]: any }, name: any) => {
          return {
            ...countryEntities,
            [name.isocode]: name
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

    case CLEAR_MISCS_DATA: {
      return initialState;
    }
  }

  return state;
}
