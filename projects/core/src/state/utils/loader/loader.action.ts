import { Action } from '@ngrx/store';

export const LOADER_LOAD_ACTION = '[LOADER] LOAD';
export const LOADER_FAIL_ACTION = '[LOADER] FAIL';
export const LOADER_SUCCESS_ACTION = '[LOADER] SUCCESS';

export interface LoaderMeta {
  loader: {
    type?: string;
    load?: boolean;
    error?: any;
  };
}

export interface LoaderAction extends Action {
  readonly payload?: any;
  readonly meta?: LoaderMeta;
}

export function loadMeta(entityType: string): LoaderMeta {
  return {
    loader: {
      type: entityType,
      load: true
    }
  };
}

export function failMeta(entityType: string, error?: any): LoaderMeta {
  return {
    loader: {
      type: entityType,
      error: error ? error : true
    }
  };
}

export function successMeta(entityType: string): LoaderMeta {
  return {
    loader: {
      type: entityType
    }
  };
}

export class LoaderLoadAction implements LoaderAction {
  type = LOADER_LOAD_ACTION;
  readonly meta: LoaderMeta;
  constructor(entityType: string) {
    this.meta = loadMeta(entityType);
  }
}

export class LoaderFailAction implements LoaderAction {
  type = LOADER_FAIL_ACTION;
  readonly meta: LoaderMeta;
  constructor(entityType: string, error?: any) {
    this.meta = failMeta(entityType, error);
  }
}

export class LoaderSuccessAction implements LoaderAction {
  type = LOADER_SUCCESS_ACTION;
  readonly meta: LoaderMeta;
  constructor(entityType: string) {
    this.meta = successMeta(entityType);
  }
}
