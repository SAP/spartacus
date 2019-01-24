import { Action } from '@ngrx/store';

export interface EntityMeta {
  entity: {
    id: string;
    type: string;
  };
}

export function entityMeta(type: string, id: string): EntityMeta {
  return {
    entity: {
      type,
      id
    }
  };
}

export interface EntityAction extends Action {
  readonly meta?: EntityMeta;
}
