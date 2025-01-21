/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { ErrorAction } from '../../../error-handling';
import { EntityId, entityMeta, EntityMeta } from '../entity/entity.action';
import {
  failMeta,
  LoaderMeta,
  loadMeta,
  resetMeta,
  successMeta,
} from '../loader/loader.action';

export const ENTITY_LOAD_ACTION = '[ENTITY] LOAD';
export const ENTITY_FAIL_ACTION = '[ENTITY] LOAD FAIL';
export const ENTITY_SUCCESS_ACTION = '[ENTITY] LOAD SUCCESS';
export const ENTITY_RESET_ACTION = '[ENTITY] RESET';

export interface EntityLoaderMeta extends EntityMeta, LoaderMeta {}

export interface EntityLoaderAction extends Action {
  readonly payload?: any;
  readonly meta?: EntityLoaderMeta;
}

export function entityLoadMeta(
  entityType: string,
  id: EntityId
): EntityLoaderMeta {
  return {
    ...loadMeta(entityType),
    ...entityMeta(entityType, id),
  };
}

export function entityFailMeta(
  entityType: string,
  id: EntityId,
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  error: any
): EntityLoaderMeta;
/**
 * @deprecated Please pass the argument `error`.
 *             It will become mandatory along with removing
 *             the feature toggle `ssrStrictErrorHandlingForHttpAndNgrx`.
 */
export function entityFailMeta(
  entityType: string,
  id: EntityId
): EntityLoaderMeta;
export function entityFailMeta(
  entityType: string,
  id: EntityId,
  error?: any
): EntityLoaderMeta {
  return {
    ...failMeta(entityType, error),
    ...entityMeta(entityType, id),
  };
}

export function entitySuccessMeta(
  entityType: string,
  id: EntityId
): EntityLoaderMeta {
  return {
    ...successMeta(entityType),
    ...entityMeta(entityType, id),
  };
}

export function entityResetMeta(
  entityType: string,
  id?: EntityId
): EntityLoaderMeta {
  return {
    ...resetMeta(entityType),
    ...entityMeta(entityType, id),
  };
}

export class EntityLoadAction implements EntityLoaderAction {
  type = ENTITY_LOAD_ACTION;
  readonly meta: EntityLoaderMeta;
  constructor(entityType: string, id: EntityId) {
    this.meta = entityLoadMeta(entityType, id);
  }
}

export class EntityFailAction implements EntityLoaderAction, ErrorAction {
  type = ENTITY_FAIL_ACTION;
  readonly meta: EntityLoaderMeta;
  public error: any;

  // eslint-disable-next-line @typescript-eslint/unified-signatures
  constructor(entityType: string, id: EntityId, error: any);
  /**
   * @deprecated Please pass the argument `error`.
   *             It will become mandatory along with removing
   *             the feature toggle `ssrStrictErrorHandlingForHttpAndNgrx`.
   */
  constructor(entityType: string, id: EntityId);
  constructor(entityType: string, id: EntityId, error?: any) {
    this.meta = entityFailMeta(entityType, id, error);
    this.error = error;
  }
}

export class EntitySuccessAction implements EntityLoaderAction {
  type = ENTITY_SUCCESS_ACTION;
  readonly meta: EntityLoaderMeta;
  constructor(
    entityType: string,
    id: EntityId,
    public payload?: any
  ) {
    this.meta = entitySuccessMeta(entityType, id);
  }
}

export class EntityLoaderResetAction implements EntityLoaderAction {
  type = ENTITY_RESET_ACTION;
  readonly meta: EntityLoaderMeta;
  constructor(entityType: string, id: EntityId) {
    this.meta = entityResetMeta(entityType, id);
  }
}
