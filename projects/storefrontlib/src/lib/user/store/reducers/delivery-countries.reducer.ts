import * as fromAction from '../actions';
import { Country } from '@spartacus/core';

export interface DeliveryCountriesState {
  entities: { [isocode: string]: any };
}

export const initialState: DeliveryCountriesState = {
  entities: {}
};

export function reducer(
  state = initialState,
  action: fromAction.DeliveryCountriesAction | fromAction.MiscsDataAction
): DeliveryCountriesState {
  switch (action.type) {
    case fromAction.LOAD_DELIVERY_COUNTRIES_SUCCESS: {
      const deliveryCountries = action.payload;
      const entities = deliveryCountries.reduce(
        (countryEntities: { [isocode: string]: any }, name: Country) => {
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

    case fromAction.CLEAR_MISCS_DATA: {
      return initialState;
    }
  }

  return state;
}

export const getDeliveryCountriesEntites = (state: DeliveryCountriesState) =>
  state.entities;
