import { Action } from '@ngrx/store';
import { entityMeta, EntityMeta } from '../entity/entity.action';
import {
  processesDecrementMeta,
  processesIncrementMeta,
  ProcessesLoaderMeta,
  processesResetMeta,
} from '../processes-loader/processes-loader.action';

export const ENTITY_PROCESSES_RESET_ACTION = '[ENTITY] PROCESSES RESET';
export const ENTITY_PROCESSES_INCREMENT_ACTION = '[ENTITY] PROCESSES INCREMENT';
export const ENTITY_PROCESSES_DECREMENT_ACTION = '[ENTITY] PROCESSES DECREMENT';

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

export function entityProcessesIncrementMeta(
  entityType: string,
  id: string | string[]
): EntityProcessesLoaderMeta {
  return {
    ...processesIncrementMeta(entityType),
    ...entityMeta(entityType, id),
  };
}

export function entityProcessesDecrementMeta(
  entityType: string,
  id: string | string[]
): EntityProcessesLoaderMeta {
  return {
    ...processesDecrementMeta(entityType),
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

export class EntityProcessesIncrementAction
  implements EntityProcessesLoaderAction {
  type = ENTITY_PROCESSES_INCREMENT_ACTION;
  readonly meta: EntityProcessesLoaderMeta;
  constructor(entityType: string, id: string | string[]) {
    this.meta = entityProcessesIncrementMeta(entityType, id);
  }
}

export class EntityProcessesDecrementAction
  implements EntityProcessesLoaderAction {
  type = ENTITY_PROCESSES_DECREMENT_ACTION;
  readonly meta: EntityProcessesLoaderMeta;
  constructor(entityType: string, id: string | string[]) {
    this.meta = entityProcessesDecrementMeta(entityType, id);
  }
}
