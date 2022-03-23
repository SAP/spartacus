import { Action } from '@ngrx/store';

export const ENTITY_REMOVE_ACTION = '[ENTITY] REMOVE';
export const ENTITY_REMOVE_ALL_ACTION = '[ENTITY] REMOVE ALL';

export interface EntityMeta {
  entityType: string;
  entityId?: string | string[];
  entityRemove?: boolean;
}

export function entityMeta(type: string, id?: string | string[]): EntityMeta {
  return {
    entityType: type,
    entityId: id,
  };
}

export function entityRemoveMeta(
  type: string,
  id: string | string[]
): EntityMeta {
  return {
    entityId: id,
    entityType: type,
    entityRemove: true,
  };
}

export function entityRemoveAllMeta(type: string): EntityMeta {
  return {
    entityId: null,
    entityType: type,
    entityRemove: true,
  };
}

export interface EntityAction extends Action {
  readonly payload?: any;
  readonly meta?: EntityMeta;
}

export class EntityRemoveAction implements EntityAction {
  type = ENTITY_REMOVE_ACTION;
  readonly meta: EntityMeta;
  constructor(entityType: string, id: string | string[]) {
    this.meta = entityRemoveMeta(entityType, id);
  }
}

export class EntityRemoveAllAction implements EntityAction {
  type = ENTITY_REMOVE_ALL_ACTION;
  readonly meta: EntityMeta;
  constructor(entityType: string) {
    this.meta = entityRemoveAllMeta(entityType);
  }
}
