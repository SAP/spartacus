/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { entityReducer } from '../entity/entity.reducer';
import { LoaderAction } from '../loader/loader.action';
import { EntityScopedLoaderActions } from './entity-scoped-loader.actions';
import { scopedLoaderReducer } from './scoped-loader.reducer';
import {
  EntityScopedLoaderState,
  ScopedLoaderState,
} from './scoped-loader.state';

/**
 * Higher order reducer that wraps scopedLoaderReducer and EntityReducer enhancing
 * single state reducer to support multiple entities with generic loading flags and scopes
 */
export function entityScopedLoaderReducer<T>(
  entityType: string,
  reducer?: (state: T | undefined, action: LoaderAction) => T
): (
  state: EntityScopedLoaderState<T> | undefined,
  action: EntityScopedLoaderActions.EntityScopedLoaderAction
) => EntityScopedLoaderState<T> {
  return entityReducer<ScopedLoaderState<T>>(
    entityType,
    scopedLoaderReducer<T>(entityType, reducer)
  );
}
