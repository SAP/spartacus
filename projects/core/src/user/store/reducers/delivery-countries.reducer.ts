import { Country } from '../../../model/address.model';
import { UserActions } from '../actions/index';
import { DeliveryCountriesState } from '../user-state';

export const initialState: DeliveryCountriesState = {
  entities: {},
};

export function reducer(
  state = initialState,
  action: UserActions.DeliveryCountriesAction | UserActions.ClearUserMiscsData
): DeliveryCountriesState {
  switch (action.type) {
    case UserActions.LOAD_DELIVERY_COUNTRIES_SUCCESS: {
      const deliveryCountries = action.payload;
      const entities = deliveryCountries.reduce(
        (countryEntities: { [isocode: string]: Country }, country: Country) => {
          return {
            ...countryEntities,
            [country.isocode]: country,
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
