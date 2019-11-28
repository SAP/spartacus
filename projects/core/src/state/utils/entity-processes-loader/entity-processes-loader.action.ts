import { Action } from '@ngrx/store';
import { entityMeta, EntityMeta } from '../entity/entity.action';
import {
  popMeta,
  ProcessesLoaderMeta,
  processesResetMeta,
  pushMeta,
} from '../processes-loader/processes-loader.action';

export const ENTITY_PROCESSES_RESET_ACTION = '[ENTITY] PROCESSES RESET';
export const ENTITY_PUSH_ACTION = '[ENTITY] PUSH';
export const ENTITY_POP_ACTION = '[ENTITY] POP';

export interface EntityProcessesLoaderMeta
  extends EntityMeta,
    ProcessesLoaderMeta {}

export interface EntityProcessesLoaderAction extends Action {
  readonly payload?: any;
  readonly meta?: EntityProcessesLoaderMeta;
}

export function entityProcessesResetMeta(
  entityType: string,
  id: string | string[]
): EntityProcessesLoaderMeta {
  return {
    ...processesResetMeta(entityType),
    ...entityMeta(entityType, id),
  };
}

export function entityPushMeta(
  entityType: string,
  id: string | string[]
): EntityProcessesLoaderMeta {
  return {
    ...pushMeta(entityType),
    ...entityMeta(entityType, id),
  };
}

export function entityPopMeta(
  entityType: string,
  id: string | string[]
): EntityProcessesLoaderMeta {
  return {
    ...popMeta(entityType),
    ...entityMeta(entityType, id),
  };
}

export class EntityProcessesResetAction implements EntityProcessesLoaderAction {
  type = ENTITY_PROCESSES_RESET_ACTION;
  readonly meta: EntityProcessesLoaderMeta;
  constructor(entityType: string, id: string | string[]) {
    this.meta = entityProcessesResetMeta(entityType, id);
  }
}

export class EntityPushAction implements EntityProcessesLoaderAction {
  type = ENTITY_PUSH_ACTION;
  readonly meta: EntityProcessesLoaderMeta;
  constructor(entityType: string, id: string | string[]) {
    this.meta = entityPushMeta(entityType, id);
  }
}

export class EntityPopAction implements EntityProcessesLoaderAction {
  type = ENTITY_POP_ACTION;
  readonly meta: EntityProcessesLoaderMeta;
  constructor(entityType: string, id: string | string[]) {
    this.meta = entityPopMeta(entityType, id);
  }
}
