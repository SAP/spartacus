import { Action } from '@ngrx/store';
import {
  entityFailMeta,
  EntityLoaderMeta,
  entityLoadMeta,
  entityResetMeta,
  entitySuccessMeta,
  ENTITY_FAIL_ACTION,
  ENTITY_LOAD_ACTION,
  ENTITY_RESET_ACTION,
  ENTITY_SUCCESS_ACTION,
} from '../entity-loader/entity-loader.action';

export namespace EntityScopedLoaderActions {
  export interface EntityScopedLoaderMeta extends EntityLoaderMeta {
    scope?: string;
  }

  export interface EntityScopedLoaderAction extends Action {
    readonly payload?: any;
    readonly meta?: EntityScopedLoaderMeta;
  }

  export function entityScopedLoadMeta(
    entityType: string,
    id: string | string[],
    scope?: string
  ): EntityScopedLoaderMeta {
    return {
      ...entityLoadMeta(entityType, id),
      scope,
    };
  }

  export function entityScopedFailMeta(
    entityType: string,
    id: string | string[],
    scope?: string,
    error?: any
  ): EntityScopedLoaderMeta {
    return {
      ...entityFailMeta(entityType, id, error),
      scope,
    };
  }

  export function entityScopedSuccessMeta(
    entityType: string,
    id: string | string[],
    scope?: string
  ): EntityScopedLoaderMeta {
    return {
      ...entitySuccessMeta(entityType, id),
      scope,
    };
  }

  export function entityScopedResetMeta(
    entityType: string,
    id?: string | string[],
    scope?: string
  ): EntityScopedLoaderMeta {
    return {
      ...entityResetMeta(entityType, id),
      scope,
    };
  }

  export class EntityScopedLoadAction implements EntityScopedLoaderAction {
    type = ENTITY_LOAD_ACTION;
    readonly meta: EntityScopedLoaderMeta;
    constructor(entityType: string, id: string | string[], scope?: string) {
      this.meta = entityScopedLoadMeta(entityType, id, scope);
    }
  }

  export class EntityScopedFailAction implements EntityScopedLoaderAction {
    type = ENTITY_FAIL_ACTION;
    readonly meta: EntityScopedLoaderMeta;
    constructor(
      entityType: string,
      id: string | string[],
      scope?: string,
      error?: any
    ) {
      this.meta = entityScopedFailMeta(entityType, id, scope, error);
    }
  }

  export class EntityScopedSuccessAction implements EntityScopedLoaderAction {
    type = ENTITY_SUCCESS_ACTION;
    readonly meta: EntityScopedLoaderMeta;
    constructor(
      entityType: string,
      id: string | string[],
      scope?: string,
      public payload?: any
    ) {
      this.meta = entityScopedSuccessMeta(entityType, id, scope);
    }
  }

  export class EntityScopedResetAction implements EntityScopedLoaderAction {
    type = ENTITY_RESET_ACTION;
    readonly meta: EntityScopedLoaderMeta;
    constructor(entityType: string, id?: string | string[], scope?: string) {
      this.meta = entityScopedResetMeta(entityType, id, scope);
    }
  }
}
