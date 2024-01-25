/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { EntityState } from './entity-state';
import { EntityAction } from './entity.action';

export const initialEntityState: EntityState<any> = { entities: {} };

/**
 * Higher order reducer for reusing reducer logic for multiple entities
 *
 * Utilizes entityId meta field to target entity by id in actions
 */
export function entityReducer<T, V extends Action = Action>(
  entityType: string,
  reducer: (state: T, action: Action | V) => T
) {
  return (
    state: EntityState<T> = initialEntityState,
    action: EntityAction
  ): EntityState<T> => {
    let ids: string[] = [];
    let partitionPayload = false;
    if (
      action.meta &&
      action.meta.entityType === entityType &&
      action.meta.entityId !== undefined
    ) {
      if (action.meta.entityId !== null) {
        ids = ([] as string[]).concat(action.meta.entityId);
      }

      // remove selected entities
      if (action.meta.entityRemove) {
        return removeSelectedEntities(action, state, ids);
      }

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
        entities: { ...state.entities, ...entityUpdates },
      };
    }

    return state;
  };

  function removeSelectedEntities(
    action: EntityAction,
    state: EntityState<T>,
    ids: string | string[]
  ) {
    if (action?.meta?.entityId === null) {
      return initialEntityState;
    } else {
      let removed = false;
      const newEntities = Object.keys(state.entities).reduce(
        (acc: any, cur) => {
          if (ids.includes(cur)) {
            removed = true;
          } else {
            acc[cur] = state.entities[cur];
          }
          return acc;
        },
        {}
      );

      return removed ? { entities: newEntities } : state;
    }
  }
}
