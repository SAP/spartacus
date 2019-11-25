import { Action } from '@ngrx/store';
import {
  CounterMeta,
  dequeueMeta,
  failMeta,
  loadMeta,
  queueMeta,
  resetMeta,
  successMeta,
} from '../counter/counter.action';
import { entityMeta, EntityMeta } from '../entity/entity.action';

export const ENTITY_LOAD_ACTION = '[ENTITY] LOAD';
export const ENTITY_FAIL_ACTION = '[ENTITY] LOAD FAIL';
export const ENTITY_SUCCESS_ACTION = '[ENTITY] LOAD SUCCESS';
export const ENTITY_RESET_ACTION = '[ENTITY] RESET';
export const ENTITY_QUEUE_ACTION = '[ENTITY] QUEUE';
export const ENTITY_DEQUEUE_ACTION = '[ENTITY] DEQUEUE';

export interface EntityCounterMeta extends EntityMeta, CounterMeta {}

export interface EntityCounterAction extends Action {
  readonly payload?: any;
  readonly meta?: EntityCounterMeta;
}

export function entityLoadMeta(
  entityType: string,
  id: string | string[]
): EntityCounterMeta {
  return {
    ...loadMeta(entityType),
    ...entityMeta(entityType, id),
  };
}

export function entityFailMeta(
  entityType: string,
  id: string | string[],
  error?: any
): EntityCounterMeta {
  return {
    ...failMeta(entityType, error),
    ...entityMeta(entityType, id),
  };
}

export function entitySuccessMeta(
  entityType: string,
  id: string | string[]
): EntityCounterMeta {
  return {
    ...successMeta(entityType),
    ...entityMeta(entityType, id),
  };
}

export function entityResetMeta(
  entityType: string,
  id: string | string[]
): EntityCounterMeta {
  return {
    ...resetMeta(entityType),
    ...entityMeta(entityType, id),
  };
}

export function entityQueueMeta(
  entityType: string,
  id: string | string[]
): EntityCounterMeta {
  return {
    ...queueMeta(entityType),
    ...entityMeta(entityType, id),
  };
}

export function entityDequeueMeta(
  entityType: string,
  id: string | string[]
): EntityCounterMeta {
  return {
    ...dequeueMeta(entityType),
    ...entityMeta(entityType, id),
  };
}

export class EntityLoadAction implements EntityCounterAction {
  type = ENTITY_LOAD_ACTION;
  readonly meta: EntityCounterMeta;
  constructor(entityType: string, id: string | string[]) {
    this.meta = entityLoadMeta(entityType, id);
  }
}

export class EntityFailAction implements EntityCounterAction {
  type = ENTITY_FAIL_ACTION;
  readonly meta: EntityCounterMeta;
  constructor(entityType: string, id: string | string[], error?: any) {
    this.meta = entityFailMeta(entityType, id, error);
  }
}

export class EntitySuccessAction implements EntityCounterAction {
  type = ENTITY_SUCCESS_ACTION;
  readonly meta: EntityCounterMeta;
  constructor(entityType: string, id: string | string[], public payload?: any) {
    this.meta = entitySuccessMeta(entityType, id);
  }
}

export class EntityResetAction implements EntityCounterAction {
  type = ENTITY_RESET_ACTION;
  readonly meta: EntityCounterMeta;
  constructor(entityType: string, id: string | string[]) {
    this.meta = entityResetMeta(entityType, id);
  }
}

export class EntityQueueAction implements EntityQueueAction {
  type = ENTITY_QUEUE_ACTION;
  readonly meta: EntityCounterMeta;
  constructor(entityType: string, id: string | string[]) {
    this.meta = entityQueueMeta(entityType, id);
  }
}

export class EntityDequeueAction implements EntityDequeueAction {
  type = ENTITY_DEQUEUE_ACTION;
  readonly meta: EntityCounterMeta;
  constructor(entityType: string, id: string | string[]) {
    this.meta = entityDequeueMeta(entityType, id);
  }
}
