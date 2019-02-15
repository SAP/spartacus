import { TitlesState } from '../user-state';
import * as fromAction from '../actions/index';
import { Title } from '../../../occ';

export const initialState: TitlesState = {
  entities: {}
};

export function reducer(
  state = initialState,
  action: fromAction.TitlesAction | fromAction.ClearMiscsData
): TitlesState {
  switch (action.type) {
    case fromAction.LOAD_TITLES_SUCCESS: {
      const titles = action.payload;
      const entities = titles.reduce(
        (titleEntities: { [code: string]: Title }, name: Title) => {
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
