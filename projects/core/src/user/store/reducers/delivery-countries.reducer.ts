import { DeliveryCountriesState } from '../user-state';
import * as fromAction from '../actions/index';
import { Country } from '../../../occ/occ-models/index';

export const initialState: DeliveryCountriesState = {
  entities: {}
};

export function reducer(
  state = initialState,
  action: fromAction.DeliveryCountriesAction | fromAction.ClearMiscsData
): DeliveryCountriesState {
  switch (action.type) {
    case fromAction.LOAD_DELIVERY_COUNTRIES_SUCCESS: {
      const deliveryCountries = action.payload;
      const entities = deliveryCountries.reduce(
        (countryEntities: { [isocode: string]: Country }, country: Country) => {
          return {
            ...countryEntities,
            [country.isocode]: country
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

    case fromAction.CLEAR_MISCS_DATA: {
      return initialState;
    }
  }

  return state;
}
