import { Action } from '@ngrx/store';
import {
  LoaderMeta,
  resetMeta as loaderResetMeta,
} from '../loader/loader.action';

export const PROCESS_PUSH_ACTION = '[PROCESS] PUSH';
export const PROCESS_POP_ACTION = '[PROCESS] POP';
export const PROCESS_RESET_ACTION = '[PROCESS] RESET';

export interface ProcessMeta extends LoaderMeta {
  entityType: string;
  processesCount?: number;
}

export interface ProcessAction extends Action {
  readonly payload?: any;
  readonly meta?: ProcessMeta;
}

export function pushMeta(entityType: string): ProcessMeta {
  return {
    entityType: entityType,
    loader: undefined,
    processesCount: 1,
  };
}

export function popMeta(entityType: string): ProcessMeta {
  return {
    entityType: entityType,
    loader: undefined,
    processesCount: -1,
  };
}

export function resetMeta(entityType: string): ProcessMeta {
  return {
    ...loaderResetMeta(entityType),
  };
}

export class ProcessResetAction implements ProcessAction {
  type = PROCESS_RESET_ACTION;
  readonly meta: ProcessMeta;
  constructor(entityType: string) {
    this.meta = resetMeta(entityType);
    console.log(this.meta);
  }
}

export class ProcessPushAction implements ProcessAction {
  type = PROCESS_PUSH_ACTION;
  readonly meta: ProcessMeta;
  constructor(entityType: string) {
    this.meta = pushMeta(entityType);
  }
}

export class ProcessPopAction implements ProcessAction {
  type = PROCESS_POP_ACTION;
  readonly meta: ProcessMeta;
  constructor(entityType: string) {
    this.meta = popMeta(entityType);
  }
}
