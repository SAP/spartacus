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
    let ids: string[];
    let partitionPayload = false;
    if (
      action.meta &&
      action.meta.entityType === entityType &&
      action.meta.entityId
    ) {
      ids = [].concat(action.meta.entityId);
      partitionPayload =
        Array.isArray(action.meta.entityId) && Array.isArray(action.payload);
    } else {
      ids = Object.keys(state.entities);
    }

    const entityUpdates: { [id: string]: T } = {};

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const subAction = partitionPayload
        ? { ...action, payload: action.payload[i] }
        : action;
      const newState = reducer(state.entities[id], subAction);
      if (newState) {
        entityUpdates[id] = newState;
      }
    }

    if (Object.keys(entityUpdates).length > 0) {
      return {
        ...state,
        entities: { ...state.entities, ...entityUpdates }
      };
    }

    return state;
  };
}
