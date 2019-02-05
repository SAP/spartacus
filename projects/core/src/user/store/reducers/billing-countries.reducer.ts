import { BillingCountriesState } from '../user-state';
import * as fromAction from '../actions/billing-countries.action';

export const initialState: BillingCountriesState = {
  entities: {}
};

export function reducer(
  state = initialState,
  action: fromAction.BillingCountriesAction
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
  }

  return state;
}
