import { EntityState } from './entity-state';
import { EntityAction } from './entity.action';
import { Action } from '@ngrx/store';

export const initialEntityState: EntityState<any> = { entities: {} };

/**
 * Higher order reducer for reusing reducer logic for multiple entities
 *
 * Utilizes entityId meta field to target entity by id in actions
 */
export function entityReducer<T>(
  entityType: string,
  reducer: (state: T, action: Action) => T
) {
  return (
    state: EntityState<T> = initialEntityState,
    action: EntityAction
  ): EntityState<T> => {
    if (
      action.meta &&
      action.meta.entity &&
      action.meta.entity.type === entityType &&
      action.meta.entity.id
    ) {
      const id = action.meta.entity.id;
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
