import { EntityState } from './entity-state';
import { EntityAction } from './entity.action';
import { Action } from '@ngrx/store';

export const initialEntityState: EntityState<any> = { entities: {} };

/**
 * Higher order reducer for reusing reducer logic for multiple entities
 *
 * Utilizes entityId meta field to target entity by id in actions
 */
export function entityReducer<T>(reducer: (state: T, action: Action) => T) {
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
