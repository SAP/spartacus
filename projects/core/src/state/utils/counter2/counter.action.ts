import { Action } from '@ngrx/store';
import { LoaderAction } from '../loader/loader.action';

export const COUNTER_QUEUE_ACTION = '[COUNTER] QUEUE';
export const COUNTER_DEQUEUE_ACTION = '[COUNTER] DEQUEUE';
export const COUNTER_RESET_ACTION = '[COUNTER] RESET';

export interface CounterMeta {
  entityType: string;
  counter?: number;
}

export interface CounterAction extends Action {
  readonly payload?: any;
  readonly meta?: CounterMeta;
}

export function queueMeta(entityType: string): CounterMeta {
  return {
    entityType: entityType,
    counter: 1,
  };
}

export function dequeueMeta(entityType: string): CounterMeta {
  return {
    entityType: entityType,
    counter: -1,
  };
}

export function resetMeta(entityType: string): CounterMeta {
  return {
    entityType: entityType,
  };
}

export class CounterResetAction implements CounterAction {
  type = COUNTER_RESET_ACTION;
  readonly meta: CounterMeta;
  constructor(entityType: string) {
    this.meta = resetMeta(entityType);
  }
}

export class CounterQueueAction implements CounterAction {
  type = COUNTER_QUEUE_ACTION;
  readonly meta: CounterMeta;
  constructor(entityType: string) {
    this.meta = queueMeta(entityType);
  }
}

export class CounterDequeueAction implements CounterAction {
  type = COUNTER_DEQUEUE_ACTION;
  readonly meta: CounterMeta;
  constructor(entityType: string) {
    this.meta = dequeueMeta(entityType);
  }
}

export type CounterLoaderAction = LoaderAction & CounterAction;
