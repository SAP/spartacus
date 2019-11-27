import { Action } from '@ngrx/store';
import {
  LoaderMeta,
  resetMeta as loaderResetMeta,
} from '../loader/loader.action';

export const PROCESSES_PUSH_ACTION = '[PROCESSES] PUSH';
export const PROCESSES_POP_ACTION = '[PROCESSES] POP';
export const PROCESSES_RESET_ACTION = '[PROCESSES] RESET';

export interface ProcessesMeta extends LoaderMeta {
  entityType: string;
  processesCount?: number;
}

export interface ProcessesAction extends Action {
  readonly payload?: any;
  readonly meta?: ProcessesMeta;
}

export function pushMeta(entityType: string): ProcessesMeta {
  return {
    entityType: entityType,
    loader: undefined,
    processesCount: 1,
  };
}

export function popMeta(entityType: string): ProcessesMeta {
  return {
    entityType: entityType,
    loader: undefined,
    processesCount: -1,
  };
}

export function resetMeta(entityType: string): ProcessesMeta {
  return {
    ...loaderResetMeta(entityType),
  };
}

export class ProcessesResetAction implements ProcessesAction {
  type = PROCESSES_RESET_ACTION;
  readonly meta: ProcessesMeta;
  constructor(entityType: string) {
    this.meta = resetMeta(entityType);
  }
}

export class ProcessesPushAction implements ProcessesAction {
  type = PROCESSES_PUSH_ACTION;
  readonly meta: ProcessesMeta;
  constructor(entityType: string) {
    this.meta = pushMeta(entityType);
  }
}

export class ProcessesPopAction implements ProcessesAction {
  type = PROCESSES_POP_ACTION;
  readonly meta: ProcessesMeta;
  constructor(entityType: string) {
    this.meta = popMeta(entityType);
  }
}
