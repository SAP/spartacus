import { Action } from '@ngrx/store';

export interface EntityMeta {
  entityId: string | string[];
  entityType: string;
}

export function entityMeta(type: string, id: string | string[]): EntityMeta {
  return {
    entityId: id,
    entityType: type
  };
}

export interface EntityAction extends Action {
  readonly payload?: any;
  readonly meta?: EntityMeta;
}
