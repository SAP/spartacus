import { Action } from '@ngrx/store';
import { entityMeta, EntityMeta } from '../entity/entity.action';
import {
  failMeta,
  LoaderMeta,
  loadMeta,
  resetMeta,
  successMeta,
} from '../loader/loader.action';

export const ENTITY_LOAD_ACTION = '[ENTITY] LOAD';
export const ENTITY_FAIL_ACTION = '[ENTITY] LOAD FAIL';
export const ENTITY_SUCCESS_ACTION = '[ENTITY] LOAD SUCCESS';
export const ENTITY_RESET_ACTION = '[ENTITY] RESET';

export interface EntityCounterLoaderMeta extends EntityMeta, LoaderMeta {}

export interface EntityCounterLoaderAction extends Action {
  readonly payload?: any;
  readonly meta?: EntityCounterLoaderMeta;
}

export function entityLoadMeta(
  entityType: string,
  id: string | string[]
): EntityCounterLoaderMeta {
  return {
    ...loadMeta(entityType),
    ...entityMeta(entityType, id),
  };
}

export function entityFailMeta(
  entityType: string,
  id: string | string[],
  error?: any
): EntityCounterLoaderMeta {
  return {
    ...failMeta(entityType, error),
    ...entityMeta(entityType, id),
  };
}

export function entitySuccessMeta(
  entityType: string,
  id: string | string[]
): EntityCounterLoaderMeta {
  return {
    ...successMeta(entityType),
    ...entityMeta(entityType, id),
  };
}

export function entityResetMeta(
  entityType: string,
  id: string | string[]
): EntityCounterLoaderMeta {
  return {
    ...resetMeta(entityType),
    ...entityMeta(entityType, id),
  };
}

export class EntityLoadAction implements EntityCounterLoaderAction {
  type = ENTITY_LOAD_ACTION;
  readonly meta: EntityCounterLoaderMeta;
  constructor(entityType: string, id: string | string[]) {
    this.meta = entityLoadMeta(entityType, id);
  }
}

export class EntityFailAction implements EntityCounterLoaderAction {
  type = ENTITY_FAIL_ACTION;
  readonly meta: EntityCounterLoaderMeta;
  constructor(entityType: string, id: string | string[], error?: any) {
    this.meta = entityFailMeta(entityType, id, error);
  }
}

export class EntitySuccessAction implements EntityCounterLoaderAction {
  type = ENTITY_SUCCESS_ACTION;
  readonly meta: EntityCounterLoaderMeta;
  constructor(entityType: string, id: string | string[], public payload?: any) {
    this.meta = entitySuccessMeta(entityType, id);
  }
}

export class EntityResetAction implements EntityCounterLoaderAction {
  type = ENTITY_RESET_ACTION;
  readonly meta: EntityCounterLoaderMeta;
  constructor(entityType: string, id: string | string[]) {
    this.meta = entityResetMeta(entityType, id);
  }
}
