import { Title } from '@spartacus/user/profile/root';
import { UserProfileActions } from '../actions/index';
import { TitlesState } from '../user-profile.state';
import { Action } from '@ngrx/store';

export const initialState: TitlesState = {
  entities: {},
};

export function reducer(state = initialState, action: Action): TitlesState {
  switch (action.type) {
    case UserProfileActions.LOAD_TITLES_SUCCESS: {
      const titles = (action as UserProfileActions.LoadTitlesSuccess).payload;
      const entities = titles.reduce(
        (titleEntities: { [code: string]: Title }, name: Title) => {
          return {
            ...titleEntities,
            // tslint:disable-next-line:no-non-null-assertion
            [name.code!]: name,
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

    case UserProfileActions.CLEAR_USER_MISC_DATA: {
      return initialState;
    }
  }

  return state;
}
