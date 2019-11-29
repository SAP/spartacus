import { Action } from '@ngrx/store';
import {
  LoaderMeta,
  resetMeta as loaderResetMeta,
} from '../loader/loader.action';

export const PROCESSES_INCREMENT_ACTION = '[PROCESSES LOADER] INCREMENT';
export const PROCESSES_DECREMENT_ACTION = '[PROCESSES LOADER] DECREMENT';
export const PROCESSES_LOADER_RESET_ACTION = '[PROCESSES LOADER] RESET';

export interface ProcessesLoaderMeta extends LoaderMeta {
  entityType: string;
  processesCountDiff?: number;
}

export interface ProcessesLoaderAction extends Action {
  readonly payload?: any;
  readonly meta?: ProcessesLoaderMeta;
}

export function processesIncrementMeta(
  entityType: string
): ProcessesLoaderMeta {
  return {
    entityType: entityType,
    loader: undefined,
    processesCountDiff: 1,
  };
}

export function processesDecrementMeta(
  entityType: string
): ProcessesLoaderMeta {
  return {
    entityType: entityType,
    loader: undefined,
    processesCountDiff: -1,
  };
}

export function processesLoaderResetMeta(
  entityType: string
): ProcessesLoaderMeta {
  // processes reset action is a reset action for loader reducer, but not the other way around
  return {
    ...loaderResetMeta(entityType),
    processesCountDiff: null,
  };
}

export class ProcessesLoaderResetAction implements ProcessesLoaderAction {
  type = PROCESSES_LOADER_RESET_ACTION;
  readonly meta: ProcessesLoaderMeta;
  constructor(entityType: string) {
    this.meta = processesLoaderResetMeta(entityType);
  }
}

export class ProcessesIncrementAction implements ProcessesLoaderAction {
  type = PROCESSES_INCREMENT_ACTION;
  readonly meta: ProcessesLoaderMeta;
  constructor(entityType: string) {
    this.meta = processesIncrementMeta(entityType);
  }
}

export class ProcessesDecrementAction implements ProcessesLoaderAction {
  type = PROCESSES_DECREMENT_ACTION;
  readonly meta: ProcessesLoaderMeta;
  constructor(entityType: string) {
    this.meta = processesDecrementMeta(entityType);
  }
}
