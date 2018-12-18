import { Action } from '@ngrx/store';

export interface EntityMeta {
  entityId?: string;
}

export interface EntityAction extends Action {
  readonly meta?: EntityMeta;
}
