import * as fromAction from '../actions';

export interface CardTypesState {
  entities: { [code: string]: any };
}

export const initialState: CardTypesState = {
  entities: {}
};

export function reducer(
  state = initialState,
  action: fromAction.CardTypesAction | fromAction.MiscsDataAction
): CardTypesState {
  switch (action.type) {
    case fromAction.LOAD_CARD_TYPES_SUCCESS: {
      const cardTypes = action.payload;
      const entities = cardTypes.reduce(
        (cardTypesEntities: { [code: string]: any }, name: any) => {
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

    case fromAction.CLEAR_MISCS_DATA: {
      return initialState;
    }
  }

  return state;
}

export const getCardTypesEntites = (state: CardTypesState) => state.entities;
