import { Action } from '@ngrx/store';
import { CURRENCIES_ENTITY } from '../site-context/store/reducers';

export interface LoaderMeta {
  entity: {
    type?: string;
    load?: boolean;
    error?: boolean;
  };
}

export interface LoaderAction extends Action {
  readonly payload?: any,
  readonly meta?: LoaderMeta;
}

export function loadMeta(entityId: string) {
  return {
    entity: {
      type: entityId,
      load: true
    }
  };
}

export function failMeta(entityId: string) {
  return {
    entity: {
      type: entityId,
      error: true
    }
  };
}

export function successMeta(entityId: string) {
  return {
    entity: {
      type: entityId
    }
  };
}
