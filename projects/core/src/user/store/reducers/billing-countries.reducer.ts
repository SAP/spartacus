import { UserActions } from '../actions/index';
import { BillingCountriesState } from '../user-state';

export const initialState: BillingCountriesState = {
  entities: {},
};

export function reducer(
  state = initialState,
  action: UserActions.BillingCountriesAction | UserActions.ClearUserMiscsData
): BillingCountriesState {
  switch (action.type) {
    case UserActions.LOAD_BILLING_COUNTRIES_SUCCESS: {
      const billingCountries = action.payload;
      const entities = billingCountries.reduce(
        (countryEntities: { [isocode: string]: any }, name: any) => {
          return {
            ...countryEntities,
            [name.isocode]: name,
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

    case UserActions.CLEAR_USER_MISCS_DATA: {
      return initialState;
    }
  }

  return state;
}
