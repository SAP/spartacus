import {
  failMeta,
  LoaderAction,
  LoaderMeta,
  loadMeta,
  successMeta
} from './loader.action';

const ENTITY_LOAD_ACTION = '[ENTITY] LOAD';
const ENTITY_FAIL_ACTION = '[ENTITY] LOAD FAIL';
const ENTITY_SUCCESS_ACTION = '[ENTITY] LOAD SUCCESS';

export interface EntityMeta extends LoaderMeta {
  entity: {
    id: string;
    type?: string;
    load?: boolean;
    error?: boolean;
  };
}

export interface EntityAction extends LoaderAction {
  meta: EntityMeta;
}

export function entityLoadMeta(entityType: string, id: string) {
  return {
    entity: { ...loadMeta(entityType).entity, id }
  };
}

export function entityFailMeta(entityType: string, id: string, error?: any) {
  return {
    entity: { ...failMeta(entityType, error).entity, id }
  };
}

export function entitySuccessMeta(entityType: string, id: string) {
  return {
    entity: { ...successMeta(entityType).entity, id }
  };
}

export class EntityLoadAction implements LoaderAction {
  type = ENTITY_LOAD_ACTION;
  readonly meta: EntityMeta;
  constructor(entityType: string, id: string) {
    this.meta = entityLoadMeta(entityType, id);
  }
}

export class EntityFailAction implements LoaderAction {
  type = ENTITY_FAIL_ACTION;
  readonly meta: EntityMeta;
  constructor(entityType: string, id: string, error?: any) {
    this.meta = entityFailMeta(entityType, id, error);
  }
}

export class EntitySuccessAction implements LoaderAction {
  type = ENTITY_SUCCESS_ACTION;
  readonly meta: LoaderMeta;
  constructor(entityType: string, id: string) {
    this.meta = entitySuccessMeta(entityType, id);
  }
}
