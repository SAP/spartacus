import { loaderReducer } from './loader.reducer';
import { EntityState } from './entity-state';

export function entityReducer<T>(reducer: (state: T, action: any) => any, loadActionType: string) {
  return (state: EntityState<T> = { entities: {} }, action): EntityState<T> => {

    if (action.meta && action.meta.entity && action.meta.entity.id) {
      const subReducer = loaderReducer<T>(reducer, loadActionType);

      const id = action.meta.entity.id;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: subReducer( state.entities[id], action)
        }
      };
    }

    return state;
  };
}
