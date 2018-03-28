import * as fromAction from '../actions';

export interface DeliveryModesState {
  entites: any;
}

export const initialState: DeliveryModesState = {
  entites: <any>{}
};

export function reducer(
  state = initialState,
  action: fromAction.DeliveryModesAction
): DeliveryModesState {
  switch (action.type) {
    case fromAction.LOAD_DELIVERY_MODES_SUCCESS: {
      const entites = action.payload.deliveryModes;

      return {
        ...state,
        entites
      };
    }
  }

  return state;
}

export const getDeliveryModesEntites = (state: DeliveryModesState) =>
  state.entites;
