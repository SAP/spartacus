import * as fromAction from '../actions';
import { TitlesState } from '../user-state';

export const initialState: TitlesState = {
  entities: {}
};

export function reducer(
  state = initialState,
  action: fromAction.TitlesAction | fromAction.MiscsDataAction
): TitlesState {
  switch (action.type) {
    case fromAction.LOAD_TITLES_SUCCESS: {
      const titles = action.payload;
      const entities = titles.reduce(
        (titleEntities: { [code: string]: any }, name: any) => {
          return {
            ...titleEntities,
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

export const getTitlesEntites = (state: TitlesState) => state.entities;
