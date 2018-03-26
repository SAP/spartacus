import * as fromAction from '../actions/delivery-countries.action';

export interface DeliveryCountriesState {
  entities: { [isocode: string]: any };
}

export const initialState: DeliveryCountriesState = {
  entities: {}
};

export function reducer(
  state = initialState,
  action: fromAction.DeliveryCountriesAction
): DeliveryCountriesState {
  switch (action.type) {
    case fromAction.LOAD_DELIVERY_COUNTRIES_SUCCESS: {
      const deliveryCountries = action.payload;
      const entities = deliveryCountries.reduce(
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

export const getDeliveryCountriesEntites = (state: DeliveryCountriesState) =>
  state.entities;
