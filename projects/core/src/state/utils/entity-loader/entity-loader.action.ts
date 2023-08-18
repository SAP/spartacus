/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { entityMeta, EntityMeta } from '../entity/entity.action';
import {
  failMeta,
  LoaderMeta,
  loadMeta,
  resetMeta,
  successMeta,
} from '../loader/loader.action';
import { ErrorAction, ErrorActionType } from '@spartacus/core';

export const ENTITY_LOAD_ACTION = '[ENTITY] LOAD';
export const ENTITY_FAIL_ACTION = '[ENTITY] LOAD FAIL';
export const ENTITY_SUCCESS_ACTION = '[ENTITY] LOAD SUCCESS';
export const ENTITY_RESET_ACTION = '[ENTITY] RESET';

export interface EntityLoaderMeta extends EntityMeta, LoaderMeta {}

export interface EntityLoaderAction extends Action {
  readonly payload?: any;
  readonly meta?: EntityLoaderMeta;
}

export type EntityLoadId = string | string[] | null;

export function entityLoadMeta(
  entityType: string,
  id: EntityLoadId
): EntityLoaderMeta {
  return {
    ...loadMeta(entityType),
    ...entityMeta(entityType, id),
  };
}

export function entityFailMeta(
  entityType: string,
  id: EntityLoadId,
  error?: any
): EntityLoaderMeta {
  return {
    ...failMeta(entityType, error),
    ...entityMeta(entityType, id),
  };
}

export function entitySuccessMeta(
  entityType: string,
  id: EntityLoadId
): EntityLoaderMeta {
  return {
    ...successMeta(entityType),
    ...entityMeta(entityType, id),
  };
}

export function entityResetMeta(
  entityType: string,
  id?: EntityLoadId
): EntityLoaderMeta {
  return {
    ...resetMeta(entityType),
    ...entityMeta(entityType, id),
  };
}

export class EntityLoadAction implements EntityLoaderAction {
  type = ENTITY_LOAD_ACTION;
  readonly meta: EntityLoaderMeta;

  constructor(entityType: string, id: EntityLoadId) {
    this.meta = entityLoadMeta(entityType, id);
  }
}

export class EntityFailAction implements EntityLoaderAction, ErrorAction {
  type = ENTITY_FAIL_ACTION;
  error: ErrorActionType;
  readonly meta: EntityLoaderMeta;

  constructor(entityType: string, id: EntityLoadId, error: ErrorActionType) {
    this.meta = entityFailMeta(entityType, id, error);
    this.error = error;
  }
}

export class EntitySuccessAction implements EntityLoaderAction {
  type = ENTITY_SUCCESS_ACTION;
  readonly meta: EntityLoaderMeta;

  constructor(entityType: string, id: EntityLoadId, public payload?: any) {
    this.meta = entitySuccessMeta(entityType, id);
  }
}

export class EntityLoaderResetAction implements EntityLoaderAction {
  type = ENTITY_RESET_ACTION;
  readonly meta: EntityLoaderMeta;

  constructor(entityType: string, id: EntityLoadId) {
    this.meta = entityResetMeta(entityType, id);
  }
}
