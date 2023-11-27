/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';

export const ENTITY_REMOVE_ACTION = '[ENTITY] REMOVE';
export const ENTITY_REMOVE_ALL_ACTION = '[ENTITY] REMOVE ALL';

export type EntityId = string | string[] | null;

export interface EntityMeta {
  entityType: string;
  entityId?: EntityId;
  entityRemove?: boolean;
}

export function entityMeta(type: string, id?: EntityId): EntityMeta {
  return {
    entityType: type,
    entityId: id,
  };
}

export function entityRemoveMeta(type: string, id: EntityId): EntityMeta {
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
  constructor(entityType: string, id: EntityId) {
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
