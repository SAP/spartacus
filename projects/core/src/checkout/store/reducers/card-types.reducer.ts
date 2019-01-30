import { CardTypesState } from '../checkout-state';
import * as fromAction from '../actions/index';
import { CardType } from '../../../occ/occ-models/index';

export const initialState: CardTypesState = {
  entities: {}
};

export function reducer(
  state = initialState,
  action: fromAction.CardTypesAction | fromAction.CheckoutMiscsDataAction
): CardTypesState {
  switch (action.type) {
    case fromAction.LOAD_CARD_TYPES_SUCCESS: {
      const cardTypes: CardType[] = action.payload;
      const entities = cardTypes.reduce(
        (cardTypesEntities: { [code: string]: CardType }, name: CardType) => {
          return {
            ...cardTypesEntities,
            [name.code]: name
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

    case fromAction.CHECKOUT_CLEAR_MISCS_DATA: {
      return initialState;
    }
  }

  return state;
}

export const getCardTypesEntites = (state: CardTypesState) => state.entities;
