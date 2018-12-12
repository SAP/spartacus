import { ProductState } from '@spartacus/core';
import { Action } from '@ngrx/store';

export interface EntityMeta {
  entity: {
    id: string;
    load?: boolean;
    error?: boolean;
  };
}

export interface EntityAction extends Action {
  meta: EntityMeta;
}

export function entityReducer(reducer: (state, action: any) => any, loadActionType: string) {
  return (state = {}, action): any => {

    if (action.meta && action.meta.entity && action.meta.entity.id) {
      const loadReducer = loadingReducer(reducer, loadActionType);

      const Id = action.meta.entity.id;
      return {
        ...state,
        [Id]: loadReducer(state ? state[Id] : undefined, action)
      };
    }

    return state;
  };
}




export function loadingReducer(reducer: (state, action: any) => any, loadActionType: string) {
  return (state: any = {}, action): any => {
    if ((action.type === loadActionType) && action.meta && action.meta.entity) {
      const entity = action.meta.entity;

      if (entity.load) {
        return {
          ...state,
          loading: true,
        };
      } else if (entity.error) {
        return {
          ...state,
          loading: false,
          error: true,
          value: undefined
        };
      } else {
        return {
          ...state,
          value: action.payload,
          loading: false,
          error: false
        };
      }
    }

    return reducer(state ? state.value : undefined, action);
  };
}

export function productReducer(state = {}, action): any {
  return { ...state, 'lala': 'ula' };
}
