import { CardType } from '@spartacus/core';
import { CheckoutActions } from '../actions/index';
import { CardTypesState } from '../checkout-state';

export const initialState: CardTypesState = {
  entities: {},
};

export function reducer(
  state = initialState,
  action:
    | CheckoutActions.CardTypesAction
    | CheckoutActions.CheckoutClearMiscsData
): CardTypesState {
  switch (action.type) {
    case CheckoutActions.LOAD_CARD_TYPES_SUCCESS: {
      const cardTypes: CardType[] = action.payload;
      const entities = cardTypes.reduce(
        (cardTypesEntities: { [code: string]: CardType }, name: CardType) => {
          return {
            ...cardTypesEntities,
            [name.code as string]: name,
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

    case CheckoutActions.CHECKOUT_CLEAR_MISCS_DATA: {
      return initialState;
    }
  }

  return state;
}

export const getCardTypesEntites = (state: CardTypesState) => state.entities;
