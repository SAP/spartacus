import { Action } from '@ngrx/store';

const LOADER_LOAD_ACTION = '[LOADER] LOAD';
const LOADER_FAIL_ACTION = '[LOADER] FAIL';
const LOADER_SUCCESS_ACTION = '[LOADER] SUCCESS';

export interface LoaderMeta {
  entity: {
    type?: string;
    load?: boolean;
    error?: boolean;
  };
}

export interface LoaderAction extends Action {
  readonly payload?: any;
  readonly meta?: LoaderMeta;
}

export function loadMeta(entityType: string) {
  return {
    entity: {
      type: entityType,
      load: true
    }
  };
}

export function failMeta(entityType: string, error?: any) {
  return {
    entity: {
      type: entityType,
      error: error ? error : true
    }
  };
}

export function successMeta(entityType: string) {
  return {
    entity: {
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
