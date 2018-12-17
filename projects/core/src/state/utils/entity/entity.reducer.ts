import { EntityState } from './entity-state';
import { EntityAction } from './entity.action';

export const initialEntityState: EntityState<any> = { entities: {} };

export function entityReducer<T>(reducer: (state: T, action: any) => any) {
  return (
    state: EntityState<T> = initialEntityState,
    action: EntityAction
  ): EntityState<T> => {
    if (action.meta && action.meta.entityId) {
      const id = action.meta.entityId;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: reducer(state.entities[id], action)
        }
      };
    }

    return state;
  };
}
