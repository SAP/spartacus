import * as fromAction from '../actions';
import { CardType } from '@spartacus/core';

export interface CardTypesState {
  entities: { [code: string]: CardType };
}

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
        (cardTypesEntities: { [code: string]: any }, name: CardType) => {
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
