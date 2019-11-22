import { Action } from '@ngrx/store';

export const LOADER_LOAD_ACTION = '[LOADER] LOAD';
export const LOADER_FAIL_ACTION = '[LOADER] FAIL';
export const LOADER_SUCCESS_ACTION = '[LOADER] SUCCESS';
export const LOADER_RESET_ACTION = '[LOADER] RESET';
export const LOADER_QUEUE_ACTION = '[LOADER] QUEUE';
export const LOADER_DEQUEUE_ACTION = '[LOADER] DEQUEUE';

export interface LoaderMeta {
  entityType: string;
  loader: {
    load?: boolean;
    error?: any;
    success?: boolean;
    counter?: number;
  };
}

export interface LoaderAction extends Action {
  readonly payload?: any;
  readonly meta?: LoaderMeta;
}

export function loadMeta(entityType: string): LoaderMeta {
  return {
    entityType: entityType,
    loader: {
      load: true,
    },
  };
}

export function failMeta(entityType: string, error?: any): LoaderMeta {
  return {
    entityType: entityType,
    loader: {
      error: error ? error : true,
    },
  };
}

export function successMeta(entityType: string): LoaderMeta {
  return {
    entityType: entityType,
    loader: {
      success: true,
    },
  };
}

export function resetMeta(entityType: string): LoaderMeta {
  return {
    entityType: entityType,
    loader: {},
  };
}

export function queueMeta(entityType: string): LoaderMeta {
  return {
    entityType: entityType,
    loader: {
      counter: 1,
    },
  };
}

export function dequeueMeta(entityType: string): LoaderMeta {
  return {
    entityType: entityType,
    loader: {
      counter: -1,
    },
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

export class LoaderResetAction implements LoaderAction {
  type = LOADER_RESET_ACTION;
  readonly meta: LoaderMeta;
  constructor(entityType: string) {
    this.meta = resetMeta(entityType);
  }
}

export class LoaderQueueAction implements LoaderAction {
  type = LOADER_QUEUE_ACTION;
  readonly meta: LoaderMeta;
  constructor(entityType: string) {
    this.meta = queueMeta(entityType);
  }
}

export class LoaderDequeueAction implements LoaderAction {
  type = LOADER_DEQUEUE_ACTION;
  readonly meta: LoaderMeta;
  constructor(entityType: string) {
    this.meta = dequeueMeta(entityType);
  }
}
