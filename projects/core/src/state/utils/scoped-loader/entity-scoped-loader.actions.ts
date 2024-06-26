/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { ActionErrorProperty, ErrorAction } from '../../../model/index';
import {
  ENTITY_FAIL_ACTION,
  ENTITY_LOAD_ACTION,
  ENTITY_RESET_ACTION,
  ENTITY_SUCCESS_ACTION,
  EntityLoaderMeta,
  entityFailMeta,
  entityLoadMeta,
  entityResetMeta,
  entitySuccessMeta,
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

  export class EntityScopedFailAction
    implements EntityScopedLoaderAction, ErrorAction
  {
    type = ENTITY_FAIL_ACTION;
    error: ActionErrorProperty;
    readonly meta: EntityScopedLoaderMeta;

    /**
     * @deprecated Please use `error` parameter other than `null` or `undefined`.
     *
     *             Note: Allowing for `null` or `undefined` will be removed in future versions
     *             together with the feature toggle `ssrStrictErrorHandlingForHttpAndNgrx`.
     **/
    constructor(
      entityType: string,
      id: string | string[],
      error: null | undefined,
      scope?: string
    );
    constructor(
      entityType: string,
      id: string | string[],
      // eslint-disable-next-line @typescript-eslint/unified-signatures -- needed to deprecate only the old constructor
      error: ActionErrorProperty,
      scope?: string
    );
    constructor(
      entityType: string,
      id: string | string[],
      error: any,
      scope?: string
    ) {
      this.meta = entityScopedFailMeta(entityType, id, scope, error);
      this.error = error;
    }
  }

  const x = new EntityScopedFailAction('a', 'b', null, 'd');

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
