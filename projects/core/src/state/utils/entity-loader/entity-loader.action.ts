import {
  failMeta,
  LoaderMeta,
  loadMeta,
  successMeta
} from '../loader/loader.action';
import { entityMeta, EntityMeta } from '../entity/entity.action';
import { Action } from '@ngrx/store';

export const ENTITY_LOAD_ACTION = '[ENTITY] LOAD';
export const ENTITY_FAIL_ACTION = '[ENTITY] LOAD FAIL';
export const ENTITY_SUCCESS_ACTION = '[ENTITY] LOAD SUCCESS';

export interface EntityLoaderMeta extends EntityMeta, LoaderMeta {}

export interface EntityLoaderAction extends Action {
  readonly payload?: any;
  readonly meta?: EntityLoaderMeta;
}

export function entityLoadMeta(
  entityType: string,
  id: string | string[]
): EntityLoaderMeta {
  return {
    ...loadMeta(entityType),
    ...entityMeta(entityType, id)
  };
}

export function entityFailMeta(
  entityType: string,
  id: string | string[],
  error?: any
): EntityLoaderMeta {
  return {
    ...failMeta(entityType, error),
    ...entityMeta(entityType, id)
  };
}

export function entitySuccessMeta(
  entityType: string,
  id: string | string[]
): EntityLoaderMeta {
  return {
    ...successMeta(entityType),
    ...entityMeta(entityType, id)
  };
}

export class EntityLoadAction implements EntityLoaderAction {
  type = ENTITY_LOAD_ACTION;
  readonly meta: EntityLoaderMeta;
  constructor(entityType: string, id: string | string[]) {
    this.meta = entityLoadMeta(entityType, id);
  }
}

export class EntityFailAction implements EntityLoaderAction {
  type = ENTITY_FAIL_ACTION;
  readonly meta: EntityLoaderMeta;
  constructor(entityType: string, id: string | string[], error?: any) {
    this.meta = entityFailMeta(entityType, id, error);
  }
}

export class EntitySuccessAction implements EntityLoaderAction {
  type = ENTITY_SUCCESS_ACTION;
  readonly meta: EntityLoaderMeta;
  constructor(entityType: string, id: string | string[]) {
    this.meta = entitySuccessMeta(entityType, id);
  }
}
