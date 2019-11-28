import { Action } from '@ngrx/store';
import {
  LoaderMeta,
  resetMeta as loaderResetMeta,
} from '../loader/loader.action';

export const PROCESSES_LOADER_PUSH_ACTION = '[PROCESSES LOADER] PUSH';
export const PROCESSES_LOADER_POP_ACTION = '[PROCESSES LOADER] POP';
export const PROCESSES_LOADER_RESET_ACTION = '[PROCESSES LOADER] RESET';

export interface ProcessesLoaderMeta extends LoaderMeta {
  entityType: string;
  processesCountDiff?: number;
}

export interface ProcessesLoaderAction extends Action {
  readonly payload?: any;
  readonly meta?: ProcessesLoaderMeta;
}

export function pushMeta(entityType: string): ProcessesLoaderMeta {
  return {
    entityType: entityType,
    loader: undefined,
    processesCountDiff: 1,
  };
}

export function popMeta(entityType: string): ProcessesLoaderMeta {
  return {
    entityType: entityType,
    loader: undefined,
    processesCountDiff: -1,
  };
}

export function resetMeta(entityType: string): ProcessesLoaderMeta {
  return {
    ...loaderResetMeta(entityType),
  };
}

export class ProcessesLoaderResetAction implements ProcessesLoaderAction {
  type = PROCESSES_LOADER_RESET_ACTION;
  readonly meta: ProcessesLoaderMeta;
  constructor(entityType: string) {
    this.meta = resetMeta(entityType);
  }
}

export class ProcessesLoaderPushAction implements ProcessesLoaderAction {
  type = PROCESSES_LOADER_PUSH_ACTION;
  readonly meta: ProcessesLoaderMeta;
  constructor(entityType: string) {
    this.meta = pushMeta(entityType);
  }
}

export class ProcessesLoaderPopAction implements ProcessesLoaderAction {
  type = PROCESSES_LOADER_POP_ACTION;
  readonly meta: ProcessesLoaderMeta;
  constructor(entityType: string) {
    this.meta = popMeta(entityType);
  }
}
