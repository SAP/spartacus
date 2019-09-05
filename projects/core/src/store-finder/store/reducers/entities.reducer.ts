import { StoreFinderActions } from '../actions/index';
import { StoreEntitiesState } from '../store-finder-state';

export const initialState: StoreEntitiesState = {
  entities: {},
};

export function reducer(
  state = initialState,
  action: StoreFinderActions.StoreEntitiesAction
): StoreEntitiesState {
  switch (action.type) {
    case StoreFinderActions.STORE_ENTITIES: {
      const entities = action.payload;

      return {
        ...state,
        entities,
      };
    }
  }

  return state;
}
